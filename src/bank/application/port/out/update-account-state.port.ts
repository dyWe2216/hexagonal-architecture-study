import { Account } from 'src/bank/domain/account';

export interface UpdateAccountStatePort {
  updateActivities(account: Account);
}
