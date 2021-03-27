import { Controller, Get } from "@nestjs/common";

@Controller("shop")
export class ShopController {
    @Get("/")
    getListOfProducts() {
        return [
            {
                name: "ziemniaki",
                description: "pszne",
                price: 2,
            },
            {
                name: "pomidory",
                description: "boże",
                price: 3,
            },
            {
                name: "ogórki",
                description: "sprawiedliwe",
                price: 4,
            },
        ];
    }
}
