import * as mongoose from 'mongoose';

export const targetData = new mongoose.Schema({
  // 数据库信息id
  sourceId: { type: String, index: true },
  // 表名
  tableName: { type: String, index: true },
  // 创建时间
  createTime: { type: Date, index: true },
  // 当前数据的别名
  name: String,
});