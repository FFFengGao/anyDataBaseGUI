import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';
import { targetData } from '../../dataBase/target.entity';
import { DBlinksModule } from '../dblinks/dblinks.module';
import { TableInfoModule } from '../tableInfo/tableInfo.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'target', schema: targetData }]), DBlinksModule, TableInfoModule ],
  controllers: [TargetController],
  providers: [TargetService],
  exports: [TargetModule],
})
export class TargetModule { }