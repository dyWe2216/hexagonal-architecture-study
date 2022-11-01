import { Injectable } from '@nestjs/common';
import { Account } from 'src/bank/domain/account';
import { GetAccountBalanceQuery } from '../port/in/get-account-balance.query';
import { LoadAccountPort } from '../port/out/load-account.port';

@Injectable()
export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(private readonly loadAccountPort: LoadAccountPort) {}

  async getAccountBalance(accountId: string) {
    const account: Account = await this.loadAccountPort.loadAccount(accountId);
    return account.calculateBalance();
  }
}
