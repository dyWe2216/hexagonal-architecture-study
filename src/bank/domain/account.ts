import { Activity } from './activity';
import { ActivityWindow } from './activity-window';
import { Money } from './money';

export type AccountId = string;

export class Account {
  constructor(
    private readonly _id: AccountId,
    private readonly _baselineBalance: Money,
    private readonly _activityWindow: ActivityWindow,
  ) {}

  get id(): AccountId {
    return this._id;
  }

  get baselineBalance(): Money {
    return this._baselineBalance;
  }

  get activityWindow(): ActivityWindow {
    return this._activityWindow;
  }

  public calculateBalance(): Money {
    return Money.add(this._baselineBalance, this._activityWindow.calculateBalance(this.id));
  }

  public withdraw(money: Money, targetAccountId: AccountId): boolean {
    if (!this._canWithdraw(money)) {
      return false;
    }

    const withdrawal: Activity = new Activity(
      this._id,
      this._id,
      targetAccountId,
      new Date(),
      money,
    );

    this._activityWindow.addActivity(withdrawal);
    return true;
  }

  public deposite(money: Money, sourceAccountId: AccountId): boolean {
    const deposite = new Activity(this._id, sourceAccountId, this._id, new Date(), money);
    this._activityWindow.addActivity(deposite);

    return true;
  }

  private _canWithdraw(money: Money) {
    return Money.add(this.calculateBalance(), money.negate()).isPositiveOrZero();
  }
}
