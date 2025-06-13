import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ExperimentStatus } from '../enums/experimentStatus.enum';
import { Variant } from 'src/variants/entities/variant.entity';

@Entity()
export class Experiment extends CommonEntity {
  @OneToMany(() => Variant, (variant) => variant.experiment, { cascade: true })
  variants: Variant[];

  @Column({ unique: true })
  key: string;

  @Column({
    type: 'enum',
    enum: ExperimentStatus,
    default: ExperimentStatus.ACTIVE,
  })
  status: ExperimentStatus;
}
