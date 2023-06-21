import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { ConfigSwagger } from './libs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableVersioning({ type: VersioningType.URI });

  const config = app.get(ConfigService);
  const port = config.get('app.port');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  new ConfigSwagger(app).createDocument();
  const server = await app.listen(port, '0.0.0.0');
  server.setTimeout(120000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
