import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
