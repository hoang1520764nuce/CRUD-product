import { Category } from "src/category/entities/category.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class CategoryDetail {
    @PrimaryGeneratedColumn()
    @ManyToOne(() => Category)
    @JoinColumn({name:'category_key', referencedColumnName: 'key'} )
    category_key : Category

    @Column()
    lang:string

    @Column()
    desc:string
    
    @Column()
    name:string

    @Column()
    slug:string
}
