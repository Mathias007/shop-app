import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { ShopItemDetails } from "./shop-item-details.entity";
import { ShopSet } from "./shop-set.entity";

@Entity()
export class ShopItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 60,
    })
    name: string;

    @Column({
        type: "text",
        default: null,
        nullable: true,
    })
    description: string | null;

    @Column({ type: "float", precision: 6, scale: 2 })
    price: number;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ default: 0 })
    boughtCounter: number;

    @Column({ default: false })
    wasEverBought: boolean;

    @OneToOne((type) => ShopItemDetails)
    @JoinColumn()
    details: ShopItemDetails;

    // // Sub Product
    // @ManyToOne((type) => ShopItem, (entity) => entity.subShopItems)
    // mainShopItem: ShopItem;

    // // Main Product
    // @OneToMany((type) => ShopItem, (entity) => entity.mainShopItem)
    // subShopItems: ShopItem[];

    @ManyToMany((type) => ShopSet, (entity) => entity.items)
    @JoinTable()
    sets: ShopSet[];
}
