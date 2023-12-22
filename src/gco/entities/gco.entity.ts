import { ProductEntity } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Gco')
export class GcoEntity {
    @PrimaryGeneratedColumn('uuid',{
        name:'id',
        primaryKeyConstraintName:'gco_constraint_key'
    })
    id:string

    @Column({
        name:'name',
        type:'varchar'
    })
    name:string

    @Column({
        name:'type',
        type:'varchar'
    })
    type:string

    @CreateDateColumn({
        name:'created_at',
        type:'timestamptz',
        default:()=>'now()'
    })
    created_at:Date

    @UpdateDateColumn({
        name:'updated_at',
        type:'timestamptz',
        default:()=>'now()'
    })
    update_at:Date

    @DeleteDateColumn({
        name:'deleted_at',
        type:'timestamptz',
        default:()=>'now()',
        nullable:true
    })
    deleted_at:Date

    @OneToMany(()=>ProductEntity,(product)=>product.gco_type_ammo)
    product_gun:ProductEntity[]

    @OneToMany(()=>ProductEntity,(product)=>product.gco_type_gun)
    product_ammo:ProductEntity[]
}
