import { AccountId } from 'src/bank/domain/account';
import { Money } from 'src/bank/domain/money';

export class SendMoneyCommand {
  constructor(
    private readonly _sourceAccountId: AccountId,
    private readonly _targetAccountId: AccountId,
    private readonly _money: Money,
  ) {}

  get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }

  get targetAccountId(): AccountId {
    return this._targetAccountId;
  }

  get money(): Money {
    return this._money;
  }
}
