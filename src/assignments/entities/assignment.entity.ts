import { Entity, Column, ManyToOne } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Experiment } from 'src/experiments/entities/experiment.entity';
import { Variant } from 'src/variants/entities/variant.entity';

@Entity()
export class Assignment extends CommonEntity {
  @ManyToOne(() => Experiment, { onDelete: 'CASCADE' })
  experiment: Experiment;

  @ManyToOne(() => Variant, { onDelete: 'CASCADE' })
  variant: Variant;

  @Column()
  deviceId: string;
}
