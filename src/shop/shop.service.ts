import { Injectable } from "@nestjs/common";
import { GetListOfProductsResponse } from "../interfaces/shop";

@Injectable()
export class ShopService {
    getProducts(): GetListOfProductsResponse {
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
