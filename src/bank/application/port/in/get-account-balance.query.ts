import { AccountId } from 'src/bank/domain/account';

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId);
}
