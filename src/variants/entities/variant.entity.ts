import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Experiment } from 'src/experiments/entities/experiment.entity';

@Entity()
export class Variant extends CommonEntity {
  @ManyToOne(() => Experiment, (experiment) => experiment.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'experimentId' })
  experiment: Experiment;

  @Column({ type: 'uuid' })
  experimentId: string;

  @Column('text')
  value: string;

  @Column('float')
  percentage: number;
}
