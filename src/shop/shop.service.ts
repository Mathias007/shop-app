import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetListOfProductsResponse } from "../interfaces/shop";
import { BasketService } from "../basket/basket.service";
@Injectable()
export class ShopService {
    constructor(
        @Inject(forwardRef(() => BasketService))
        private basketService: BasketService
    ) {}

    getProducts(): GetListOfProductsResponse {
        return [
            {
                name: "ziemniaki",
                description: "pszne",
                price: 7,
            },
            {
                name: "pomidory",
                description: "boże",
                price: 8 - this.basketService.countPromo(),
            },
            {
                name: "ogórki",
                description: "sprawiedliwe",
                price: 9,
            },
        ];
    }

    hasProduct(name: string): boolean {
        return this.getProducts().some((item) => item.name === name);
    }

    getPriceOfProduct(name: string): number {
        return this.getProducts().find((item) => item.name === name).price;
    }
}
