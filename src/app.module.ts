import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountEntity } from './bank/adapter/out/persistence/account.entity';
import { ActivityEntity } from './bank/adapter/out/persistence/activity.entity';
import { BankModule } from './bank/bank.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 13306,
      username: 'root',
      password: '453600',
      database: 'bank',
      entities: [AccountEntity, ActivityEntity],
      synchronize: true,
    }),
    BankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
