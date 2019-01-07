import { ApiModelProperty } from '@nestjs/swagger';
import { TableInfoDTO } from '../tableInfo/tableInfo.dto';

export class SourceParams {
  @ApiModelProperty({ description: '主键_id如果传入则修改对象', required: false })
  _id: string;

  @ApiModelProperty({ description: '来源id' })
  sourceId: string;

  @ApiModelProperty({ description: '查询方式' })
  queryFunc: string;

  @ApiModelProperty({ description: '该条数据别名' })
  name: string;

  @ApiModelProperty({ description: '经过标准化后的来源数据列', isArray: true})
  column: TableInfoDTO;
}

export class DBInfo {
  @ApiModelProperty({ description: '数据库类型' })
  readonly dbType: string;

  @ApiModelProperty({ description: '数据库地址' })
  readonly ip: string;

  @ApiModelProperty({ description: '连接端口' })
  readonly port: number;

  @ApiModelProperty({ description: '用户名' })
  readonly userName?: string;

  @ApiModelProperty({ description: '工作空间' })
  readonly workSpace: string;
}

export class SourceRes {
  @ApiModelProperty({ description: '数据库连接详情' })
  dbInfo: DBInfo;

  @ApiModelProperty({ description: '来源id' })
  sourceId: string;

  @ApiModelProperty({ description: '该条数据别名' })
  name: string;

  @ApiModelProperty({ description: '经过标准化后的来源数据列', isArray: true })
  column: TableInfoDTO;
}

export class SouceEditDTO {
  @ApiModelProperty({ description: '主键_id' })
  _id: string;

  @ApiModelProperty({ description: '来源id', required: false })
  sourceId?: string;

  @ApiModelProperty({ description: '该条数据别名', required: false})
  name?: string;

  @ApiModelProperty({ description: '经过标准化后的来源数据列', isArray: true, required: false})
  column?: TableInfoDTO;

  @ApiModelProperty({ description: '查询方式', required: false})
  queryFunc: string;
}

export class GetTableData{
  @ApiModelProperty({ description: '主键_id' })
  _id: string;

  @ApiModelProperty({ description: '页码' })
  page: string;

  @ApiModelProperty({ description: '页数' })
  pageSize: string;
}