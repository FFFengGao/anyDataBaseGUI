import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetResDTO, TargetParamsDTO, EditDTO } from './target.dto';
import { PageDTO, ResFromatType } from '../../common/common';
import { FindOneDTO } from '../dblinks/dblinks.dto';

@ApiUseTags('目标地址部分')
@Controller('target')
export class TargetController {
  constructor(
    private targetService: TargetService,
  ) { }

  @Get()
  @ApiOperation({ title: '获取所有已经创建的目标地址'})
  @ApiResponse({ status: 200, type: TargetResDTO })
  findAll(@Query() pageDTO: PageDTO){
    return this.targetService.findAll(pageDTO);
  }

  @Get('/findById')
  @ApiOperation({ title: '根据id获取单条信息' })
  @ApiResponse({ status: 200, type: TargetResDTO })
  findById(@Query() findOneDTO: FindOneDTO) {
    return this.targetService.findById(findOneDTO);
  }

  @Post()
  @ApiOperation({ title: '保存目标地址接口' })
  @ApiResponse({ status: 200, type: TargetParamsDTO })
  save(@Body() targetParamsDTO: TargetParamsDTO){
    return this.targetService.save(targetParamsDTO);
  }

  @Post('/del')
  @ApiOperation({ title: '根据id删除指定目标地址接口'})
  @ApiResponse({ status: 200, type: ResFromatType })
  delete(@Query() findOneDTO: FindOneDTO){
    return this.targetService.delete(findOneDTO);
  }

  @Post('/edit')
  @ApiOperation({ title: '根据id修改指定目标地址接口' })
  @ApiResponse({ status: 200, type: ResFromatType })
  edit(@Body() editDTO: EditDTO){
    return this.targetService.edit(editDTO);
  }
}