import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Customer')
export class CustomerEntity {
    @PrimaryGeneratedColumn('uuid',{
        name:'id',
        primaryKeyConstraintName:'customer_constraint_key'
    })
    id:string

    @Column({
        name:'name',
        type:'varchar'
    })
    name:string

    @Column({
        name:'email',
        type:'varchar'
    })
    email:string

    @Column({
        name:'no_phone',
        type:'int'
    })
    no_phone:Number

    @Column({
        name:'birth',
        type:'date'
    })
    birth:Date

    @Column({
        name:'id_user',
        type:'varchar'
    })
    id_user:string

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

    @JoinColumn({
        name:'id_user',
        referencedColumnName:'id',
        foreignKeyConstraintName:'fk_user_customer'
    })
    @ManyToOne(()=>UserEntity,(user)=>user.customer)
    user:UserEntity
}
