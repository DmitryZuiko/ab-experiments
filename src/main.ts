import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(passport.initialize());

  setupSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  await app.listen(port);

  console.log(`App is running on http://localhost:${port}/api`);
  console.log(`Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();
