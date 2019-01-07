import * as mongoose from 'mongoose';

export const FormatTables = new mongoose.Schema({
  // 数据库信息id
  sourceId: { type: String, index: true },
  // 标准化过后的列对象
  column: [{
    // 数据库表头
    header: String,
    // 标准化后的类型
    format: String,
    // 标准化类型对应的hash
    hash: String,
    // 是否被勾选
    checked: Boolean,
  }],
  // 表名
  tableName: { type: String, index: true },
  // 创建时间
  createTime: { type: Date, index: true },
});