"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const cheerio_1 = tslib_1.__importDefault(require("cheerio"));
var PizzaLocation;
(function (PizzaLocation) {
    PizzaLocation["SHATTUCK"] = "SHATTUCK";
    PizzaLocation["TELEGRAPH"] = "TELEGRAPH";
    PizzaLocation["BROADWAY"] = "BROADWAY";
})(PizzaLocation || (PizzaLocation = {}));
const PizzaLocations = [
    {
        locationKey: PizzaLocation.SHATTUCK,
        url: "https://www.sliverpizzeria.com/pizza-shattuck"
    },
    {
        locationKey: PizzaLocation.TELEGRAPH,
        url: "https://www.sliverpizzeria.com/pizza-telegraph"
    },
    {
        locationKey: PizzaLocation.BROADWAY,
        url: "https://www.sliverpizzeria.com/pizza-broadway"
    }
];
function getAll() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let results = yield Promise.all(PizzaLocations.map((pizzaLocation) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pizzaResult = yield axios_1.default.get(pizzaLocation.url);
            const pizzaCheerio$ = cheerio_1.default.load(pizzaResult.data);
            const dailyPizzaList = pizzaCheerio$('.summary-content').find('div.summary-excerpt');
            const locationListings = [];
            dailyPizzaList.each((index, elem) => {
                const contents = pizzaCheerio$(elem).find('p');
                const dayString = contents.first().text();
                if (!locationListings.some(pizzaListing => pizzaListing.dayOfWeek == dayString)) {
                    locationListings.push({
                        dayOfWeek: dayString,
                        ingredients: contents.next('p').text()
                    });
                }
            });
            return {
                location: pizzaLocation.locationKey,
                listings: locationListings
            };
        })));
        return results;
    });
}
exports.default = {
    getAll
};
