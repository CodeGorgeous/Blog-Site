import { Controller } from '@nestjs/common';
import { BlogService } from '../service/index';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {
    // TODO: Blog路由控制中心
  }
}
