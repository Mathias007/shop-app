import { Injectable } from "@nestjs/common";
import { AddProductDto } from "./dto/add-product.dto";
import {
    AddProductToBasketResponse,
    RemoveProductFromBasketResponse,
} from "../interfaces/basket";

@Injectable()
export class BasketService {
    private items: AddProductDto[] = [];

    add(item: AddProductDto): AddProductToBasketResponse {
        const { name, count } = item;
        const { items } = this;

        if (
            typeof name !== "string" ||
            typeof count !== "number" ||
            name === "" ||
            count < 1
        ) {
            return {
                isSuccess: false,
            };
        }

        items.push(item);

        console.log(items);

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

        console.log(items);

        return {
            isSuccess: true,
        };
    }
}
