import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { SourceController } from './source.controller';
import { SourceService } from './source.service';
import { SourceData } from '../../dataBase/source.entity';
import { TableInfoModule } from '../tableInfo/tableInfo.module';
import { DBlinksModule } from '../dblinks/dblinks.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'source', schema: SourceData }]), TableInfoModule, DBlinksModule],
  controllers: [SourceController],
  providers: [SourceService],
  exports: [SourceModule],
})
export class SourceModule { }