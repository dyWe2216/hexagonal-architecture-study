import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendMoneyController } from './adapter/in/web/send-money.controller';
import { AccountPersistenceAdapter } from './adapter/out/persistence/account-persistence.adapter';
import { AccountEntity } from './adapter/out/persistence/account.entity';
import { ActivityEntity } from './adapter/out/persistence/activity.entity';
import { SendMoneyUseCaseSymbol } from './application/port/in/send-money.usecase';
import { SendMoneyService } from './application/service/send-money.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, ActivityEntity])],
  controllers: [SendMoneyController],
  providers: [
    AccountPersistenceAdapter,
    {
      provide: SendMoneyUseCaseSymbol,
      useFactory: (AccountPersistenceAdapter) => {
        return new SendMoneyService(AccountPersistenceAdapter, AccountPersistenceAdapter);
      },
      inject: [AccountPersistenceAdapter],
    },
  ],
  exports: [SendMoneyUseCaseSymbol],
})
export class BankModule {}
