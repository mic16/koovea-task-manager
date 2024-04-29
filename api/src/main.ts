import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

// import 'src/commons/logger'; // This import is necessary to setup the logger.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe allow controllers to throw errors when the body does not match the attached DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: false,
    }),
  );

  // app.useGlobalFilters(new DebugExceptionFilter());

  // Swagger configuration.
  const config = new DocumentBuilder()
    .addTag('Task Manager')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
