import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global API prefix
  app.setGlobalPrefix('api');

  // Security middleware should come first
  app.use(helmet());

  //  Enable CORS for cross-origin requests
  app.enableCors();

  // Apply request compression
  app.use(compression());

  // ✅ Apply validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //  Removes unknown properties from requests
      forbidNonWhitelisted: true, // Rejects requests with unknown properties
      transform: true, //  Transforms request data into DTO instances
    }),
  );
  // to Prevents abuse and DDoS attacks Limits excessive requests from a single IP.
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes time window
      max: 100, //  Limit each IP to 100 requests per window
      message: 'Too many requests from this IP, please try again later',
    }),
  );
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle(' Authentication API')
    .setDescription('API documentation for authentication and user management')
    .setVersion('1.0')
    .addBearerAuth() // adds JWT Bearer token support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
