import * as mongoose from 'mongoose';

export const SourceData = new mongoose.Schema({
  // 数据库信息id
  sourceId: { type: String, index: true },
  // 当前数据的别名
  name: String,
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
  createTime: Date,
});

// import { Entity, ObjectIdColumn, Column, BaseEntity, ObjectID } from 'typeorm';
// import { ColumnFormat } from '../api/tableInfo/tableInfo.interface';

// @Entity()
// export class SourceData extends BaseEntity {
//   // 唯一id
//   @ObjectIdColumn()
//   id: ObjectID;
//   // 来源数据库id
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
//   @Column()
//   tableName: string;
//   // 标准化过后的表名
//   @Column()
//   column: ColumnFormat[];
//   // 当前数据的别名
//   @Column()
//   name: string;
//   // 创建时间
//   @Column({ length: 500 })
//   createTime: string;
// }