import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
