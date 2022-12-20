import { Product } from "src/Products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductDetail {
    @PrimaryGeneratedColumn()
    @ManyToOne(() => Product)
    @JoinColumn({name:'product_id', referencedColumnName: 'id'} )
    product_id : Product

    @Column()
    lang:string

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    short_description:string

    @Column()
    slug:string
}
