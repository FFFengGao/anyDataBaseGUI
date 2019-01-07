import { ApiModelProperty } from '@nestjs/swagger';

// 创建目标数据部分DTO
export class TargetParamsDTO{
  @ApiModelProperty({ description: '数据库信息id' })
  sourceId: string;

  @ApiModelProperty({ description: '表名' })
  tableName: string;

  @ApiModelProperty({ description: '创建时间', required: false })
  createTime?: string;

  @ApiModelProperty({ description: '当前数据的别名' })
  name: string;
}

class DBInfo {
  @ApiModelProperty({ description: '别名' })
  readonly name?: string;

  @ApiModelProperty({ description: '数据库类型'})
  readonly dbType?: string;

  @ApiModelProperty({ description: '数据库地址'})
  readonly ip?: string;

  @ApiModelProperty({ description: '连接端口'})
  readonly port?: number;

  @ApiModelProperty({ description: '用户名'})
  readonly userName?: string;
}

export class TargetResDTO extends TargetParamsDTO{
  @ApiModelProperty({ description: '数据库信息' })
  dbInfo: DBInfo;
}

// 修改目标数据DTO
export class TargetEditDTO {
  @ApiModelProperty({ description: '唯一id' })
  _id: string;

  @ApiModelProperty({ description: '数据库信息id', required: false })
  sourceId?: string;

  @ApiModelProperty({ description: '表名', required: false })
  tableName?: string;

  @ApiModelProperty({ description: '当前数据的别名', required: false })
  name?: string;
}