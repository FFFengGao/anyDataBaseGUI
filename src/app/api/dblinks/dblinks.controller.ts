import { Get, Controller, Post, Body, Query } from '@nestjs/common';
import { DBlinksService } from './dblinks.service';
import { QueryDTO, FindOneDTO, SQLQueryDTO, BDlinkEditDTO, DBlinks} from './dblinks.dto';
import { ApiResponse, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { ResFromatType } from '../../common/common';
import { dblist } from '../../common/db.common';

@ApiUseTags('数据库相关部分')
@Controller('db')
export class DBlinksController {
  constructor(
    private readonly dBlinksService: DBlinksService,
  ) { }

  /**
   * 测试是连接接口
   * @param dbInfo 数据库详情对象
   */
  @Get('/test')
  @ApiOperation({title: '根据连接信息测试连接接口'})
  @ApiResponse({ status: 200, type: ResFromatType })
  testConnection(@Query() dbInfo: DBlinks) {
    return this.dBlinksService.testConnection(dbInfo);
  }

  /**
   * 保存数据库连接对象
   * @param saveParams 数据库详情对象
   */
  @Post()
  @ApiOperation({ title: '保存数据库连接对象接口' })
  @ApiResponse({ status: 200, type: DBlinks })
  create(@Body() saveParams: DBlinks) {
    return this.dBlinksService.create(saveParams);
  }

  /**
   * 查询所有数据库对象的接口
   * @param queryDTO
   */
  @Get()
  @ApiOperation({ title: '根据条件数据查询数据库连接信息接口' })
  @ApiResponse({ status: 200, type: [DBlinks] })
  findAll(@Query() queryDTO: QueryDTO){
    return this.dBlinksService.findAll(queryDTO);
  }

  /**
   * 根据数据库id查询
   * @param findOneDTO {
   *  //数据库id
   *  _id: string
   * }
   */
  @Get('/findById')
  @ApiOperation({ title: '根据_id查询单条连接信息接口' })
  @ApiResponse({ status: 200, type: DBlinks })
  findById(@Query() findOneDTO: FindOneDTO){
    return this.dBlinksService.find(findOneDTO);
  }

  @Get('/typeAll')
  @ApiOperation({ title: '获取所有支持的数据库类型接口' })
  @ApiResponse({ status: 200, type: dblist })
  findDBType(){
    return dblist;
  }

  @Post('/del')
  @ApiOperation({ title: '根据_id删除链接信息' })
  @ApiResponse({ status: 200, type: ResFromatType })
  delete(@Body() findOneDTO: FindOneDTO) {
    return this.dBlinksService.delete(findOneDTO);
  }

  @Post('/edit')
  @ApiOperation({ title: '根据_id更改连接信息' })
  @ApiResponse({ status: 200, type: ResFromatType })
  edit(@Body() editDTO: BDlinkEditDTO) {
    return this.dBlinksService.edit(editDTO);
  }

  @Post('/sqlQuery')
  @ApiOperation({ title: '根据传入sql进行自定义查询接口' })
  @ApiResponse({ status: 200, type: ResFromatType })
  SQLQuery(@Body() sqlQueryDTO: SQLQueryDTO){
    return this.dBlinksService.SQLQuery(sqlQueryDTO);
  }
}
