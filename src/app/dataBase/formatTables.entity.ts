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

// import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from 'typeorm';
// import { ColumnFormat } from '../api/tableInfo/tableInfo.interface';

// @Entity()
// export class FormatTables extends BaseEntity {
//   // 唯一id
//   @ObjectIdColumn()
//   id: ObjectID;
//   // 数据库信息id
//   @Column({ unique: true })
//   sourceId: string;
//   // 标准化过后的列对象
//   @Column()
//   column: ColumnFormat[];
//   // 表名
//   @Column()
//   tableName: string;
//   // 创建时间
//   @Column({ length: 500 })
//   createTime: string;
// }
