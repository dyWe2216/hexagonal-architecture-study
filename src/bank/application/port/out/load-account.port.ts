import { Account, AccountId } from 'src/bank/domain/account';

export interface LoadAccountPort {
  loadAccount(accountId: AccountId): Promise<Account>;
}
