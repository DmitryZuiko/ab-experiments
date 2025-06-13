import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { ExperimentStatus } from './enums/experimentStatus.enum';
import { Experiment } from './entities/experiment.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Device } from 'src/devices/entities/device.entity';
import { ActiveExperimentForDevice } from './types/activeExperimentsForDevice.type';
import { Statistic } from './types/statistic.type';
import { StatisticVariant } from './types/statisticVariant.type';

@Injectable()
export class ExperimentsService {
  constructor(
    @InjectRepository(Experiment)
    private experimentRepository: Repository<Experiment>,

    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,

    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  async createExperiment(dto: CreateExperimentDto): Promise<Experiment> {
    try {
      const experiment = this.experimentRepository.create(dto);
      return await this.experimentRepository.save(experiment);
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при создании эксперимента',
      );
    }
  }

  async finishExperiment(id: string): Promise<void> {
    try {
      const experiment = await this.experimentRepository.findOneBy({ id });

      if (!experiment) throw new NotFoundException('Эксперимент не найден');

      experiment.status = ExperimentStatus.FINISHED;

      await this.experimentRepository.save(experiment);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Ошибка при завершении эксперимента',
      );
    }
  }

  async getActiveExperimentsForDevice(
    deviceId: string,
  ): Promise<ActiveExperimentForDevice[]> {
    try {
      // Сохраняем или получаем первое время запроса
      let device = await this.deviceRepository.findOneBy({ deviceId });

      if (!device) {
        device = this.deviceRepository.create({ deviceId });
        await this.deviceRepository.save(device);
      }

      // Получаем все активные эксперименты
      const experiments = await this.experimentRepository.find({
        where: {
          status: ExperimentStatus.ACTIVE,
          createdAt: MoreThanOrEqual(device.createdAt),
        },
        relations: ['variants'],
      });

      const results: ActiveExperimentForDevice[] = [];

      for (const experiment of experiments) {
        // Проверка существующего назначения
        let assignment = await this.assignmentRepository.findOne({
          where: { deviceId, experiment: { id: experiment.id } },
          relations: ['variant'],
        });

        if (!assignment) {
          // Назначаем вариант
          const variant = this.selectVariant(experiment.variants);

          assignment = this.assignmentRepository.create({
            deviceId,
            experiment,
            variant,
          });

          await this.assignmentRepository.save(assignment);
        }

        results.push({ experiment, assignmentVariant: assignment.variant });
      }

      return results;
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при получении активных экспериментов для устройства',
      );
    }
  }

  async getStatistics(): Promise<Statistic> {
    try {
      const experiments = await this.experimentRepository.find({
        relations: ['variants'],
      });

      const stats: Statistic = [];

      for (const experiment of experiments) {
        const total = await this.assignmentRepository.count({
          where: { experiment: { id: experiment.id } },
        });

        const variants: StatisticVariant[] = [];

        for (const variant of experiment.variants) {
          const { id, value } = variant;

          const count = await this.assignmentRepository.count({
            where: { variant: { id } },
          });

          variants.push({
            value,
            count,
            percentage: total ? (count / total) * 100 : 0,
          });
        }

        stats.push({ key: experiment.key, total, variants });
      }

      return stats;
    } catch (error) {
      throw new InternalServerErrorException(
        'Ошибка при получении статистики экспериментов',
      );
    }
  }

  private selectVariant(variants: Variant[]): Variant {
    const rnd = Math.random() * 100;

    let acc = 0;

    for (const variant of variants) {
      acc += variant.percentage;

      if (rnd <= acc) {
        return variant;
      }
    }

    return variants[variants.length - 1];
  }
}
