'use strict';
import { Document } from 'mongoose';

export interface DBInfoInterface extends Document {
  // 别名
  readonly name: string;
  // 数据库类型
  readonly dbType: string;
  // 数据库地址
  readonly ip: string;
  // 连接端口
  readonly port: number;
  // 用户名
  readonly userName: string;
  // 密码
  readonly passWord: string;
  // 工作空间
  readonly workSpace: string;
  // 创建时间
  readonly createTime?: string;
}