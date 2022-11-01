import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { LoadAccountPort } from 'src/bank/application/port/out/load-account.port';
import { UpdateAccountStatePort } from 'src/bank/application/port/out/update-account-state.port';
import { Account } from 'src/bank/domain/account';
import { Activity } from 'src/bank/domain/activity';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountMapper } from './account.mapper';
import { ActivityEntity } from './activity.entity';

export class AccountPersistenceAdapter implements LoadAccountPort, UpdateAccountStatePort {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) {}

  async loadAccount(accountId: string): Promise<Account> {
    const account: AccountEntity = await this.accountRepository.findOneBy({
      userId: accountId,
    });

    if (!account) {
      throw new Error('Account not found');
    }

    const activities = await this.activityRepository.find({
      where: { ownerAccountId: accountId },
    });

    return AccountMapper.mapToDomain(account, activities);
  }

  updateActivities(account: Account) {
    account.activityWindow.activities.forEach((activity: Activity) => {
      if (activity.id === null) {
        this.activityRepository.save(AccountMapper.mapToActivityEntity(activity));
      }
    });
  }
}
