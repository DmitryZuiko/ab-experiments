import { ApiProperty } from '@nestjs/swagger';
import { CreateVariantDto } from './create-variant.dto';

export class CreateExperimentDto {
  @ApiProperty({ description: 'Уникальный ключ эксперимента', example: 'icon' })
  key: string;

  @ApiProperty({ type: [CreateVariantDto] })
  variants: CreateVariantDto[];
}
