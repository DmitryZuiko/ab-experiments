import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Device extends CommonEntity {
  @Column({ unique: true })
  deviceId: string;
}
