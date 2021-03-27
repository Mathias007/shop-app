import { Inject, Injectable } from "@nestjs/common";
import { AddProductDto } from "./dto/add-product.dto";
import { ShopService } from "../shop/shop.service";
import {
    AddProductToBasketResponse,
    ListProductsInBasketResponse,
    RemoveProductFromBasketResponse,
} from "../interfaces/basket";

@Injectable()
export class BasketService {
    private items: AddProductDto[] = [];

    constructor(@Inject(ShopService) private shopService: ShopService) {}

    add(item: AddProductDto): AddProductToBasketResponse {
        const { name, count } = item;
        const { items } = this;

        if (
            typeof name !== "string" ||
            typeof count !== "number" ||
            name === "" ||
            count < 1 ||
            !this.shopService.hasProduct(name)
        ) {
            return {
                isSuccess: false,
            };
        }

        items.push(item);

        return {
            isSuccess: true,
            index: items.length - 1,
        };
    }

    remove(index: number): RemoveProductFromBasketResponse {
        const { items } = this;

        if (index < 0 || index >= items.length) {
            return {
                isSuccess: false,
            };
        }

        items.splice(index, 1);

        return {
            isSuccess: true,
        };
    }

    list(): ListProductsInBasketResponse {
        return this.items;
    }
}
