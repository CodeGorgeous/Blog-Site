import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog')
export class Blog {
  // 主键
  @PrimaryGeneratedColumn()
  id: number;

  // 文章名称
  @Column()
  name: string;

  // 文章简介
  @Column()
  introducel: string;

  // 文章创建时间
  @Column()
  createTimer: string;

  // 文章封面图
  @Column()
  occupyImg: string;

  // 文章作者
  @Column()
  author: string;

  // Github存储库地址
  @Column()
  githubUrl: string;

  // 标签, 使用||进行分割, 例如: tag1||tag2||tag3
  @Column()
  tags: string;

  // 七牛云中markdown文件名称
  @Column()
  markdownName: string;
}
