import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { setupSwagger } from './setup-swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SerializerInterceptor } from './interceptors/serializer-interceptor';
import { middleware as expressCtx } from 'express-ctx';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  app.setGlobalPrefix('/api/v1');
  const configService = app.select(SharedModule).get(ApiConfigService);

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new SerializerInterceptor(),
  );

  app.use(expressCtx);
  // Serve uploaded files statically
  app.use('/uploads', express.static('uploads'));
  app.useGlobalPipes(new ValidationPipe());
  if (configService.documentationEnabled) {
    setupSwagger(app);
  }
  await app.listen(3000);
}
bootstrap();
