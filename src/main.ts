import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const port = configService.get('app.port');
  const nodeEnv = configService.get('app.nodeEnv');
  const apiPrefix = configService.get('app.apiPrefix');
  const apiVersion = configService.get('app.apiVersion');

  // Global prefix for all routes
  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);
  console.log("env ==> ", nodeEnv)
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/${apiPrefix}/${apiVersion}`);
}
bootstrap();
