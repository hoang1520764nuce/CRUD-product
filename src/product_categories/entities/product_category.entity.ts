import { Category } from "src/category/entities/category.entity"
import { Product } from "src/products/entities/product.entity"
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ProductCategory {
    
    @PrimaryGeneratedColumn()
    @ManyToOne(()=>Category, category => category.key)
    @JoinColumn({name:'catagory_key',referencedColumnName:'key'})
    catagory_key : Category

    @PrimaryGeneratedColumn()
    @ManyToOne(()=>Product, product => product.id)
    @JoinColumn({name:'product_id',referencedColumnName:'id'})
    product_id : Product
}
