import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio';

enum PizzaLocation {
    SHATTUCK = 'SHATTUCK',
    TELEGRAPH = 'TELEGRAPH',
    BROADWAY = 'BROADWAY'
}
interface VendorDetails {
    locationKey: PizzaLocation,
    url: string,
    address?: string
}

const PizzaLocations: VendorDetails[] = [
    {
        locationKey: PizzaLocation.SHATTUCK,
        url: 'https://www.sliverpizzeria.com/pizza-shattuck'
    },
    {
        locationKey: PizzaLocation.TELEGRAPH,
        url: 'https://www.sliverpizzeria.com/pizza-telegraph'
    },
    {
        locationKey: PizzaLocation.BROADWAY,
        url: 'https://www.sliverpizzeria.com/pizza-broadway'
    }
]

type PizzaListing = {
    ingredients: string;
    dayOfWeek?: string;
}

async function getAll(): Promise<{ location: string, listings: PizzaListing[] }[]> {
    const results: { location: string, listings: PizzaListing[] }[] = await Promise.all(PizzaLocations.map(async (pizzaLocation: VendorDetails): Promise<{ location: string, listings: PizzaListing[] }> => {
        const pizzaResult: AxiosResponse = await axios.get(pizzaLocation.url);
        const pizzaCheerio$ = cheerio.load(pizzaResult.data);
        const dailyPizzaList = pizzaCheerio$('.summary-content').find('div.summary-excerpt');
        const locationListings: PizzaListing[] = []
        dailyPizzaList.each((index: number, elem: CheerioElement) => {
            const contents = pizzaCheerio$(elem).find('p');
            const dayString = contents.first().text();
            if (!locationListings.some(pizzaListing =>
                pizzaListing.dayOfWeek == dayString
            )) {
                locationListings.push({
                    dayOfWeek: dayString,
                    ingredients: contents.next('p').text()
                });
            }
        })
        return {
            location: pizzaLocation.locationKey,
            listings: locationListings
        }
    }));
    return results;
}

export default {
    getAll
}