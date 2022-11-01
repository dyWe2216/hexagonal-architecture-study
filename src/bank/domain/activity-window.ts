import { AccountId } from './account';
import { Activity } from './activity';
import { Money } from './money';

export class ActivityWindow {
  constructor(private readonly _activities: Activity[] = []) {}

  get activities(): Activity[] {
    return this._activities;
  }

  addActivity(activity: Activity) {
    this.activities.push(activity);
    return this;
  }

  public calculateBalance(accountId: AccountId): Money {
    const depositedBalance = this.activities
      .filter((activity: Activity) => activity.targetAccountId === accountId)
      .map((activitiy: Activity) => activitiy.money)
      .reduce(Money.add, Money.ZERO());

    const withdrawBalance = this.activities
      .filter((activitiy: Activity) => activitiy.sourceAccountId === accountId)
      .map((activitiy: Activity) => activitiy.money)
      .reduce(Money.add, Money.ZERO());

    return Money.add(depositedBalance, withdrawBalance);
  }
}
