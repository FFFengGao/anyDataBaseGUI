import { Controller, Get, Post, Query, Body} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TableInfoService } from './tableInfo.service';
import { TableInfoParamsDTO, TableStandradParamsDTO, QueryStandradParam, EditDTO} from './tableInfo.dto';
import { FindOneDTO } from '../dblinks/dblinks.dto';
import { ResFromatType } from '../../common/common';

@ApiUseTags('数据表标准化部分')
@Controller('table')
export class TableInfoController {
  constructor(
    private tableInfoService: TableInfoService,
  ){}

  @Get('/tableInfo')
  @ApiOperation({ title: '根据表名和连接信息获取表中所有字段' })
  @ApiResponse({ status: 200, type: ResFromatType })
  tableInfo(@Query() tableInfoParamsDTO: TableInfoParamsDTO){
    return this.tableInfoService.tableInfo(tableInfoParamsDTO);
  }

  @Get('/standard')
  @ApiOperation({ title: '根据数据库信息和表名查询标准化信息' })
  @ApiResponse({ status: 200, type: TableStandradParamsDTO })
  queryStandradInfo(@Query() queryStandradParam: QueryStandradParam){
    return this.tableInfoService.queryStandradInfo(queryStandradParam);
  }

  @Post('/standard')
  @ApiOperation({ title: '保存标准化后的数据' })
  @ApiResponse({ status: 200, type: ResFromatType })
  save(@Body() tableStandradParamsDTO: TableStandradParamsDTO){
    return this.tableInfoService.save(tableStandradParamsDTO);
  }

  @Post('/standard/del')
  @ApiOperation({ title: '根据主键_id删除已经保存的标准化的数据' })
  @ApiResponse({ status: 200, type: ResFromatType })
  delete(@Body() findOneDTO: FindOneDTO) {
    return this.tableInfoService.delete(findOneDTO);
  }

  /**
   * 根据数据库id查询
   * @param findOneDTO {
   *  //数据库id
   *  _id: string
   * }
   */
  @Get('/tableName')
  @ApiOperation({ title: '根据连接信息的唯一_id查询数据库所有表' })
  @ApiResponse({ status: 200, type: ResFromatType })
  table(@Query() findOneDTO: FindOneDTO) {
    return this.tableInfoService.table(findOneDTO);
  }

  /**
   * 根据_id修改本信息
   * @param editDTO
   */
  @Post('/edit')
  @ApiOperation({ title: '根据_id修改本条信息' })
  @ApiResponse({ status: 200, type: ResFromatType })
  edit(@Body() editDTO: EditDTO) {
    return this.tableInfoService.edit(editDTO);
  }
}