import { Controller, Get, Query, Post, Body, Headers } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SourceService } from './source.service';
import { ResFromatType, PageDTO, HeadersDTO } from '../../common/common';
import { SourceRes, SourceParams, GetTableData, SouceEditDTO } from './source.dto';
import { FindOneDTO } from '../dblinks/dblinks.dto';

@ApiUseTags('源地址设置部分')
@Controller('source')
export class SourceController {
  constructor(
    private readonly sourceService: SourceService,
  ){}

  @Get()
  @ApiOperation({ title: '获取已经保存的源数据地址' })
  @ApiResponse({ status: 200, type: SourceRes })
  findAll(@Query() pageDTO: PageDTO) {
    return this.sourceService.findAll(pageDTO);
  }

  @Get('/findById')
  @ApiOperation({ title: '根据id获取指定源数据详情' })
  @ApiResponse({ status: 200, type: SourceRes })
  findById(@Query() findOneDTO: FindOneDTO){
    return this.sourceService.findById(findOneDTO);
  }

  @Post()
  @ApiOperation({ title: '保存源数据接口'})
  @ApiResponse({ status: 200, type: ResFromatType })
  save(@Body() sourceParams: SourceParams){
    return this.sourceService.save(sourceParams);
  }

  @Post('/del')
  @ApiOperation({ title: '根据_id删除指定源数据' })
  @ApiResponse({ status: 200, type: ResFromatType })
  delete(@Body() findOneDTO: FindOneDTO) {
    return this.sourceService.delete(findOneDTO);
  }

  /**
   * 根据_id修改指定源数据
   * @param editDTO
   */
  @Post('/edit')
  @ApiOperation({ title: '根据_id修改指定源数据' })
  @ApiResponse({ status: 200, type: ResFromatType })
  edit(@Body() editDTO: SouceEditDTO) {
    return this.sourceService.edit(editDTO);
  }

  @Get('/standard/tableData')
  @ApiOperation({ title: '根据_id分页获取标准化后的数据' })
  @ApiResponse({ status: 200, type: ResFromatType })
  getSourceData(@Query() getTableData: GetTableData){
    return this.sourceService.getSourceData(getTableData);
  }
}