import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiResponse({ status: 201, description: 'Успешный вход' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  async login(@Body() credentials: CreateUserDto) {
    const { username, password } = credentials;

    const user = await this.authService.validateUser(username, password);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return this.authService.login(user);
  }
}
