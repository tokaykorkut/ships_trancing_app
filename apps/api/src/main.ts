import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});

  // app.enableCors();
  await app.listen(process.env.SERVER_PORT || 4000);
}

bootstrap();
