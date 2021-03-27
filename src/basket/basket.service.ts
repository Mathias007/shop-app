import { Injectable } from "@nestjs/common";
import { AddProductDto } from "./dto/add-product.dto";
import { AddProductToBasketResponse } from '../interfaces/basket';

@Injectable()
export class BasketService {
    private items: AddProductDto[] = [];

    add(item: AddProductDto): AddProductToBasketResponse {
        this.items.push(item);

        console.log(this.items);

        return {
            isSuccess: true,
            index: this.items.length - 1,
        };
    }
}
