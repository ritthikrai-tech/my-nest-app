import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, type SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './modules/app/app.module';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My NestJS API example')
    .setDescription('The My NestJS API description')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config, {});
  const theme = new SwaggerTheme();
  const options: SwaggerCustomOptions = {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
  };
  SwaggerModule.setup('docs', app, cleanupOpenApiDoc(documentFactory), options);

  const port = process.env.PORT ?? 3000;

  await app.listen(port, () => {
    Logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();
