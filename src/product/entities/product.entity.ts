import { GcoEntity } from "src/gco/entities/gco.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid',{
        name:'id',
        primaryKeyConstraintName:'product_constraint_key'
    })
    id:string

    @Column({
        name:'name',
        type:'varchar'
    })
    name:string

    @Column({
        name:'description',
        type:'text'
    })
    description:string

    @Column({
        name:'price',
        type:'decimal'
    })
    price:Number

    @Column({
        name:'image_link',
        type:'varchar',
        nullable:true
    })
    image_link:string

    @Column({
        name:'type_ammo',
        type:'uuid',
        nullable:true
    })
    type_ammo:string

    @Column({
        name:'type_gun',
        type:'uuid',
        nullable:true
    })
    type_gun:string

    @Column({
        name:'max_ammo',
        type:'int',
        default:0
    })
    max_ammo:Number

    @CreateDateColumn({
        name:'created_at',
        type:'timestamptz',
        default:()=>'now()'
    })
    created_at:Date

    @UpdateDateColumn({
        name:'update_at',
        type:'timestamptz',
        default:()=>'now()'
    })
    update_at:Date

    @JoinColumn({
        name:'type_ammo',
        referencedColumnName:'id',
        foreignKeyConstraintName:'fk_type_ammo_product'
    })

    @ManyToOne(()=>GcoEntity,(gco)=>gco.product_ammo)
    gco_type_ammo:GcoEntity

    @JoinColumn({
        name:'type_gun',
        referencedColumnName:'id',
        foreignKeyConstraintName:'fk_type_gun_product'
    })

    @ManyToOne(()=>GcoEntity,(gco)=>gco.product_gun)
    gco_type_gun:GcoEntity

    
}

