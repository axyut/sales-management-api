import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

  // allow connection to frontend
  //app.enableCors();

  // Server
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`),
  );
}
start();
