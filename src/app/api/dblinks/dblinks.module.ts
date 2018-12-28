import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { DBlinksController } from './dblinks.controller';
import { DBlinksService } from './dblinks.service';
import { DBlinksSchema } from '../../dataBase/dblinks.entity';
import { DBlinks } from './dblinks.dto';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'dbInfo', schema: DBlinksSchema }]), DBlinks],
  controllers: [DBlinksController],
  providers: [DBlinksService],
  exports: [DBlinksModule],
})
export class DBlinksModule { }