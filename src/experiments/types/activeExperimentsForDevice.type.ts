import { Variant } from 'src/variants/entities/variant.entity';
import { Experiment } from '../entities/experiment.entity';

export type ActiveExperimentForDevice = {
  experiment: Experiment;
  assignmentVariant: Variant;
};
