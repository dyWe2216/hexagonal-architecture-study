import { Injectable } from '@nestjs/common';
import { Account } from 'src/bank/domain/account';
import { SendMoneyCommand } from '../port/in/send-money.command';
import { SendMoneyUseCase } from '../port/in/send-money.usecase';
import { LoadAccountPort } from '../port/out/load-account.port';
import { UpdateAccountStatePort } from '../port/out/update-account-state.port';

@Injectable()
export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    private readonly _loadAccountPort: LoadAccountPort,
    private readonly _updateAccountStatePort: UpdateAccountStatePort,
  ) {}

  async sendMoney(command: SendMoneyCommand): Promise<boolean> {
    const sourceAccount: Account = await this._loadAccountPort.loadAccount(command.sourceAccountId);
    const targetAccount: Account = await this._loadAccountPort.loadAccount(command.targetAccountId);

    if (!sourceAccount.withdraw(command.money, targetAccount.id)) {
      return false;
    }

    if (!targetAccount.deposite(command.money, sourceAccount.id)) {
      return false;
    }

    this._updateAccountStatePort.updateActivities(sourceAccount);
    this._updateAccountStatePort.updateActivities(targetAccount);

    return true;
  }
}
