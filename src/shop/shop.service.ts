import { forwardRef, Inject, Injectable } from "@nestjs/common";
import {
    GetListOfProductsResponse,
    GetPaginatedListOfProductsResponse,
} from "../interfaces/shop";
import { BasketService } from "../basket/basket.service";
import { InjectRepository } from "@nestjs/typeorm";
import { ShopItem } from "./shop-item.entity";
import { Repository } from "typeorm";
@Injectable()
export class ShopService {
    constructor(
        @Inject(forwardRef(() => BasketService))
        private basketService: BasketService,
        @InjectRepository(ShopItem)
        private shopItemRepository: Repository<ShopItem>
    ) {}

    async getProducts(
        currentPage: number = 1
    ): Promise<GetPaginatedListOfProductsResponse> {
        const maxPerPage = 3;

        const [items, count] = await this.shopItemRepository.findAndCount({
            skip: maxPerPage * (currentPage - 1),
            take: maxPerPage,
        });

        const pagesCount = Math.ceil(count / maxPerPage);

        return { items, pagesCount };
    }

    async hasProduct(name: string): Promise<boolean> {
        return (await this.getProducts()).items.some(
            (item) => item.name === name
        );
    }

    async getPriceOfProduct(name: string): Promise<number> {
        return (await this.getProducts()).items.find(
            (item) => item.name === name
        ).price;
    }

    async getOneProduct(id: string): Promise<ShopItem> {
        return this.shopItemRepository.findOneOrFail(id);
    }

    async removeProduct(id: string) {
        await this.shopItemRepository.delete(id);
    }

    async createDummyProduct(): Promise<ShopItem> {
        const newItem = new ShopItem();
        newItem.price = 100;
        newItem.name = "Korniszon";
        newItem.description = "debesta";

        await this.shopItemRepository.save(newItem);
        return newItem;
    }

    async addBoughtCounter(id: string) {
        this.shopItemRepository.update(id, {
            wasEverBought: true,
        });

        const item = await this.shopItemRepository.findOneOrFail(id);

        item.boughtCounter++;

        await this.shopItemRepository.save(item);
    }

    async findProducts(searchTerm: string): Promise<GetListOfProductsResponse> {
        return await this.shopItemRepository.find({
            description: searchTerm,
        });
    }
}
