import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import 'reflect-metadata';
import { getConnectionManager } from 'typeorm';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const connection = await getConnectionManager().create({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'all',
      entities: [],
      synchronize: true,
    });
    await connection.connect();
    app.enableCors({
      // 跨域白名单
      origin: [],
    });
    await app.listen(2550);
  } catch (error) {
    console.log('程序发生错误:', error);
  }
}
bootstrap();
