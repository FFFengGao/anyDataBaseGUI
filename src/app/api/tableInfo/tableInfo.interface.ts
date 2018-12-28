import { Document } from 'mongoose';

export interface ColumnFormat {
  // 数据库表头
  header: string;
  // 标准化后的类型
  format: string;
  // 标准化类型对应的hash
  hash: string;
  // 是否被勾选
  checked: boolean;
}

export interface TableInfo extends Document {
  // 数据库信息id
  readonly sourceId: string;
  // 标准化过后的列对象
  readonly column: ColumnFormat[];
  // 表名
  readonly tableName: string;
  // 创建时间
  readonly createTime: Date;
}