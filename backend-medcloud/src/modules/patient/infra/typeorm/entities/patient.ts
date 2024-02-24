import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";



@Entity('patients')
class Patient {
  @PrimaryColumn()
  id?: string

  @Column({name: 'name', nullable: false})
  name?: string

  @Column({name: 'birth_date', nullable: false})
  birthDate?: Date

  @Column({name: 'email', nullable: false})
  email?: string

  @Column({name: 'address', nullable: false})
  address?: string

  @Column({name: 'created_at', nullable: false})
  createdAt?: Date

  @Column({name: 'updated_at', nullable: false})
  updatedAt?: Date

  constructor(){
    if(!this.id){
      this.id = uuidV4()
    }
  }
}

export { Patient }