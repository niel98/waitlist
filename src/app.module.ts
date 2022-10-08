import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv'
import { UserServicesModule } from './users/user-services.module';
import * as mongoosePaginate from 'mongoose-paginate-v2'

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      connectionFactory: (connection) => {
        connection.plugin(mongoosePaginate)
        return connection
      },
      autoCreate: true
    }),
    UserServicesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
