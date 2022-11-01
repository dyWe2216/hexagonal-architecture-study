import { Account } from 'src/bank/domain/account';
import { Activity } from 'src/bank/domain/activity';
import { ActivityWindow } from 'src/bank/domain/activity-window';
import { Money } from 'src/bank/domain/money';
import { AccountEntity } from './account.entity';
import { ActivityEntity } from './activity.entity';

export class AccountMapper {
  static mapToDomain(account: AccountEntity, activities: ActivityEntity[]) {
    const activityWindow: ActivityWindow = this.mapToActivityWindow(activities);
    const balance = activityWindow.calculateBalance(account.userId);

    return new Account(account.userId, balance, activityWindow);
  }

  static mapToActivityWindow(activities: ActivityEntity[]) {
    const activityWindow: ActivityWindow = new ActivityWindow();

    activities.forEach((activity: ActivityEntity) => {
      const activityEntity: Activity = new Activity(
        activity.ownerAccountId,
        activity.sourceAccountId,
        activity.targetAccountId,
        new Date(activity.timestamp),
        Money.of(activity.amount),
        activity.id,
      );

      activityWindow.addActivity(activityEntity);
    });

    return activityWindow;
  }

  static mapToActivityEntity(activity: Activity): ActivityEntity {
    const activityEntity: ActivityEntity = new ActivityEntity();

    activityEntity.ownerAccountId = activity.ownerAccountId;
    activityEntity.sourceAccountId = activity.sourceAccountId;
    activityEntity.targetAccountId = activity.targetAccountId;
    activityEntity.timestamp = activity.timestamp.getTime() / 1000;
    activityEntity.amount = activity.money.amount.toNumber();

    if (activity.id !== null) {
      activityEntity.id = activity.id;
    }

    return activityEntity;
  }
}
