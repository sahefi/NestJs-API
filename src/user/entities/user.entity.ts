
import { RoleEntity } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid',{
        name:'id',
        primaryKeyConstraintName:'user_constraint_key'
    })
    id:string

    @Column({
        name:'username',
        type:'varchar'
    })
    username:string

    @Column({
        name:'password',
        type:"varchar"
    })
    password:string

    @Column({
        name:'id_role',
        type:'varchar'
    })
    id_role:string
    
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
      @JoinColumn({
        name:'id_role',
        referencedColumnName:'id',
        foreignKeyConstraintName:'fk_role_user'
      })
      @ManyToOne(()=>RoleEntity, (role)=>role.user)
      role: RoleEntity
    }   
