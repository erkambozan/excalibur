import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: '*',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      maxAge: 86400,
    }),
  );
  await app.listen(3000);
}

bootstrap()
  .then(() => console.log('Server started'))
  .catch((err) => console.error(err));
