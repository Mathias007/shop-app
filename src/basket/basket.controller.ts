import { Body, Controller, Delete, Inject, Param, Post } from "@nestjs/common";
import { AddProductDto } from "./dto/add-product.dto";
import { BasketService } from "./basket.service";
import { AddProductToBasketResponse, RemoveProductFromBasketResponse } from "../interfaces/basket";

@Controller("basket")
export class BasketController {
    constructor(@Inject(BasketService) private basketService: BasketService) {}

    @Post("/")
    addProductToBasket(
        @Body() item: AddProductDto
    ): AddProductToBasketResponse {
        return this.basketService.add(item);
    }

    @Delete("/:index")
    removeProductFromBasket(@Param("index") index: string) : RemoveProductFromBasketResponse {
        return this.basketService.remove(Number(index));
    }
}
