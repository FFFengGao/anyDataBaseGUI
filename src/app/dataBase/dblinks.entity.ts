import * as mongoose from 'mongoose';

export const DBlinksSchema = new mongoose.Schema({
  // 链接地址
  ip: { type: String, index: true },
  // 端口号
  port: Number,
  // 別名
  name: { type: String, index: true },
  // 用户名
  userName: String,
  // 密码
  passWord: String,
  // 工作空间
  workSpace: String,
  // 数据库类型
  dbType: { type: String, index: true },
  // 创建时间
  createTime: { type: Date, index: true },
});