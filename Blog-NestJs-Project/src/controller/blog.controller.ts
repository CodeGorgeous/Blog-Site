import { Controller } from '@nestjs/common';
import { BlogService } from '../service/index';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {
    // TODO: Blog路由控制中心
    // TODO: 新增文章路由 /api/blog/increase
    // TODO: 修改文章路由 /api/blog/revise
    // TODO: 删除文章路由 /api/blog/decrease
  }
}
