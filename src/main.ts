import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ExceptionFilter } from './common/exception/rcp-exception.filter';

async function bootstrap() {

  const logger = new Logger('Main-gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalFilters( new ExceptionFilter())
  await app.listen(envs.port);

  logger.log(`Microservicio Gateway ejecutándose en el puerto ${envs.port}`);
}
bootstrap();
