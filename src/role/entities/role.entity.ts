import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "src/user/entities/user.entity";

@Entity('Role')
export class RoleEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid',{
    name:'id',
    primaryKeyConstraintName:'role_constraint_key'
  })
  id:string

  @Column({
    name:'name',
    type:'varchar'
  })
  name:string

  @CreateDateColumn({
    name:'created_at',
    type:'timestamptz',
    default:()=>'now()'
  })
  created_at: Date

  @UpdateDateColumn({
    name:'updated_at',
    type:'timestamptz',
    default:()=>'now()'
  })
  updated_at:Date

  @DeleteDateColumn({
    name:'deleted_at',
    type:'timestamptz',
    default:null,
    nullable:true
  })
  deleted_at:Date

   //Relation

   @OneToMany(()=>UserEntity, (user)=>user.role)
   user: UserEntity[]
 }   



