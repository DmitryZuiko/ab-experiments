import { ApiProperty } from '@nestjs/swagger';

export class CreateVariantDto {
  @ApiProperty({ description: 'Значение варианта (URL или цена)' })
  value: string;

  @ApiProperty({ description: 'Процент (0–100)' })
  percentage: number;
}
