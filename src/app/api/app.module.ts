import { Module } from '@nestjs/common';
import { DBlinksModule } from './dblinks/dblinks.module';
import { TableInfoModule } from './tableInfo/tableInfo.module';
import { SourceModule } from './source/source.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from '../config/app.config';
import { TargetModule } from './target/target.module';

@Module({
  imports: [MongooseModule.forRoot(AppConfig.dbConfig), DBlinksModule, TableInfoModule, SourceModule, TargetModule],
  exports: [AppModule],
})
export class AppModule {}
