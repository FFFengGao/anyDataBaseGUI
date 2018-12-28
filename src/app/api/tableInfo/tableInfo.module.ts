import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { TableInfoController } from './tableInfo.controller';
import { TableInfoService } from './tableInfo.service';
import { FormatTables } from '../../dataBase/formatTables.entity';
import { TableInfoDTO } from './tableInfo.dto';
import { DBlinksModule } from '../dblinks/dblinks.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'tableInfo', schema: FormatTables }]), DBlinksModule, TableInfoDTO],
  controllers: [TableInfoController],
  providers: [TableInfoService],
  exports: [TableInfoModule],
})
export class TableInfoModule { }