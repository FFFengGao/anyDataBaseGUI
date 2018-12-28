import { ApiModelProperty } from '@nestjs/swagger';

export class TableInfoDTO {
  @ApiModelProperty({ description: '数据库表头' })
  header: string;

  @ApiModelProperty({ description: '标准化后的类型' })
  format: string;

  @ApiModelProperty({ description: '标准化类型对应的hash' })
  hash: string;

  @ApiModelProperty({ description: '是否被勾选' })
  checked: boolean;
}

export class TableInfoParamsDTO {
  @ApiModelProperty({ description: 'dbInfo的唯一id'})
  readonly _id: string;

  @ApiModelProperty({ description: '数据库表名' })
  readonly tableName: string;
}

export class TableStandradParamsDTO{
  @ApiModelProperty({ description: '数据库信息_id' })
  readonly sourceId: string;

  @ApiModelProperty({ description: '标准化过后的列对象', isArray: true })
  readonly column: TableInfoDTO;

  @ApiModelProperty({ description: '表名' })
  readonly tableName: string;

  @ApiModelProperty({ description: '创建时间', required: false })
  readonly createTime?: Date;
}

export class QueryStandradParam{
  @ApiModelProperty({ description: '数据库信息_id' })
  readonly sourceId: string;

  @ApiModelProperty({ description: '数据库表名' })
  readonly tableName: string;
}

export class EditDTO {
  @ApiModelProperty({ description: '数据库信息_id'})
  readonly sourceId?: string;

  @ApiModelProperty({ description: '标准化过后的列对象', isArray: true, required: false})
  readonly column?: TableInfoDTO;

  @ApiModelProperty({ description: '表名', required: false })
  readonly tableName?: string;

  @ApiModelProperty({ description: '创建时间', required: false })
  readonly createTime?: Date;
}