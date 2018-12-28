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

// import { Entity, ObjectIdColumn, Column, BaseEntity, ObjectID} from 'typeorm';

// @Entity()
// export class DBlinksEntity extends BaseEntity {
//   // 唯一id
//   @ObjectIdColumn()
//   id: ObjectID;
//   // 链接地址
//   @Column({ unique: true })
//   ip: string;
//   // 端口号
//   @Column()
//   port: number;
//   // 别名
//   @Column({ unique: true })
//   name: string;
//   // 用户名
//   @Column()
//   userName: string;
//   // 密码
//   @Column()
//   passWord: string;
//   // 工作空间
//   @Column()
//   workSpace: string;
//   // 数据库类型
//   @Column()
//   dbType: string;
//   // 创建时间
//   @Column({})
//   createTime: any;
// }
