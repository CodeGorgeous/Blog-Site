import { Module } from '@nestjs/common';
import { BlogModule } from './blog.module';

@Module({
  imports: [BlogModule],
})
export class AppModule {}
