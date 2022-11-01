import { Controller, Get, Inject, Query } from '@nestjs/common';
import { GetAccountBalanceQuery } from 'src/bank/application/port/in/get-account-balance.query';
import { SendMoneyCommand } from 'src/bank/application/port/in/send-money.command';
import {
  SendMoneyUseCase,
  SendMoneyUseCaseSymbol,
} from 'src/bank/application/port/in/send-money.usecase';
import { Money } from 'src/bank/domain/money';

@Controller('account')
export class SendMoneyController {
  constructor(
    @Inject(SendMoneyUseCaseSymbol) private readonly _sendMoneyUseCase: SendMoneyUseCase,
  ) {}

  @Get('send')
  async sendMoney(
    @Query('sourceAccountId') sourceAccountId: string,
    @Query('targetAccountId') targetAccountId: string,
    @Query('amount') amount: number,
  ): Promise<boolean> {
    const command: SendMoneyCommand = new SendMoneyCommand(
      sourceAccountId,
      targetAccountId,
      Money.of(amount),
    );

    return this._sendMoneyUseCase.sendMoney(command);
  }
}
