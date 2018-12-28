'use strict';
import { ColumnFormat } from '../tableInfo/tableInfo.interface';
import { Document } from 'mongoose';

export interface SourceInterface extends Document {
  // 来源id
  sourceId: string;
  // 该条数据别名
  name: string;
  // 经过标准化后的来源数据列
  column: ColumnFormat[];
  // 创建时间
  createTime?: Date;
}

export interface DBInfoInterface {
  // @ApiModelProperty({ description: '数据库类型' })
  readonly dbType: string;

  // @ApiModelProperty({ description: '数据库地址' })
  readonly ip: string;

  // @ApiModelProperty({ description: '连接端口' })
  readonly port: number;

  // @ApiModelProperty({ description: '用户名' })
  readonly userName?: string;

  // @ApiModelProperty({ description: '工作空间' })
  readonly workSpace: string;
}