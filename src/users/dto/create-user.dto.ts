import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin',
    description: 'Уникальное имя пользователя',
  })
  username: string;

  @ApiProperty({
    example: 'qwe123',
    description: 'Пароль пользователя',
  })
  password: string;
}
