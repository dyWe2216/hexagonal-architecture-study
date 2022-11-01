import { mock, when, anything, instance } from 'ts-mockito';
import { Account, AccountId } from '../../domain/account';
import { Money } from '../../domain/money';
import { SendMoneyCommand } from '../port/in/send-money.command';
import { LoadAccountPort } from '../port/out/load-account.port';
import { UpdateAccountStatePort } from '../port/out/update-account-state.port';
import { SendMoneyService } from './send-money.service';

describe('SendMoneyService', () => {
  it('should transacrtion success', async () => {
    const loadAccountPort = mock<LoadAccountPort>();
    const updateAccountStatePort = mock<UpdateAccountStatePort>();

    async function givenAnAccountWithId(id: AccountId): Promise<Account> {
      const mockedAccount: Account = mock(Account);

      when(mockedAccount.id).thenReturn(id);
      when(mockedAccount.withdraw(anything(), anything())).thenReturn(true);
      when(mockedAccount.deposite(anything(), anything())).thenReturn(true);

      const account = instance(mockedAccount);

      when(await loadAccountPort.loadAccount(id)).thenReturn(account);

      return account;
    }

    const sourceAccount = await givenAnAccountWithId('1');
    const targetAccount = await givenAnAccountWithId('2');

    const command: SendMoneyCommand = new SendMoneyCommand(
      sourceAccount.id,
      targetAccount.id,
      Money.of(350),
    );

    const sendMoneyService: SendMoneyService = new SendMoneyService(
      instance(loadAccountPort),
      instance(updateAccountStatePort),
    );

    const result = await sendMoneyService.sendMoney(command);

    expect(result).toBe(true);
  });
});
