import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly experimentsService: ExperimentsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Создание эксперимента с вариантами' })
  @ApiResponse({ status: 201, description: 'Эксперимент успешно создан.' })
  @Post()
  create(@Body() dto: CreateExperimentDto) {
    return this.experimentsService.createExperiment(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Завершение эксперимента' })
  @ApiParam({ name: 'id', description: 'UUID эксперимента' })
  @ApiResponse({ status: 200, description: 'Эксперимент закрыт.' })
  @Patch(':id/finish')
  finish(@Param('id') id: string) {
    return this.experimentsService.finishExperiment(id);
  }

  @ApiOperation({ summary: 'Получение активных экспериментов для устройства' })
  @ApiQuery({ name: 'deviceId', description: 'ID устройства', required: true })
  @ApiResponse({ status: 200, description: 'Список активных экспериментов.' })
  @Get('active')
  getActive(@Query('deviceId') deviceId: string) {
    return this.experimentsService.getActiveExperimentsForDevice(deviceId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Статистика по экспериментам' })
  @ApiResponse({ status: 200, description: 'Статистика успешно получена.' })
  @Get('stats')
  getStatistics() {
    return this.experimentsService.getStatistics();
  }
}
