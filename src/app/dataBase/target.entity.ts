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

// import { Entity, ObjectIdColumn, Column, BaseEntity, ObjectID } from 'typeorm';

// @Entity()
// export class TargetData extends BaseEntity {
//   // 唯一id
//   @ObjectIdColumn()
//   id: ObjectID;
//   // 来源数据库的id
//   @Column({ unique: true })
//   sourceId: string;
//   // 链接地址
//   @Column({ unique: true })
//   ip: string;
//   // 端口号
//   @Column()
//   port: number;
//   // 数据库类型
//   @Column({ unique: true })
//   dbType: string;
//   // 表名
//   @Column({ unique: true })
//   tableName: string;
//   // 别名
//   @Column({ unique: true })
//   name: string;
//   // 创建时间
//   @Column({ unique: true })
//   createTime: string;
// }