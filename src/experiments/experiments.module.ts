import { Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsController } from './experiments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiment } from './entities/experiment.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Device } from 'src/devices/entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experiment, Variant, Assignment, Device]),
  ],
  controllers: [ExperimentsController],
  providers: [ExperimentsService],
})
export class ExperimentsModule {}
