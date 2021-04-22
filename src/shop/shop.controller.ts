import { Controller, Get, Delete, Post, Inject, Param } from "@nestjs/common";
import {
    CreateProductResponse,
    GetListOfProductsResponse,
    GetOneProductResponse,
    GetPaginatedListOfProductsResponse
} from "../interfaces/shop";
import { ShopService } from "./shop.service";

@Controller("shop")
export class ShopController {
    constructor(@Inject(ShopService) private shopService: ShopService) {}

    @Get("/:pageNumber")
    getListOfProducts(
        @Param('pageNumber') pageNumber: string,
    ): Promise<GetPaginatedListOfProductsResponse> {
        return this.shopService.getProducts(Number(pageNumber));
    }

    @Get("/find/:searchTerm")
    testFindItem(
        @Param("searchTerm") searchTerm: string
    ): Promise<GetListOfProductsResponse> {
        return this.shopService.findProducts(searchTerm);
    }

    @Get("/:id")
    getOneProduct(@Param("id") id: string): Promise<GetOneProductResponse> {
        return this.shopService.getOneProduct(id);
    }

    @Delete("/:id")
    removeProduct(@Param("id") id: string) {
        return this.shopService.removeProduct(id);
    }

    @Post("/")
    createNewProduct(): Promise<CreateProductResponse> {
        return this.shopService.createDummyProduct();
    }
}
