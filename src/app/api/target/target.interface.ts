'use strict';
import { Document } from 'mongoose';

export interface TargetInterface extends Document{
  // 数据库信息id
  sourceId: string;
  // 表名
  tableName: string;
  // 创建时间
  createTime: Date;
  // 当前数据的别名
  name: string;
}