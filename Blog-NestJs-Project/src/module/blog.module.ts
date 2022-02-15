import { Module } from '@nestjs/common';
import { BlogController } from '../controller';
import { BlogService } from '../service';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
