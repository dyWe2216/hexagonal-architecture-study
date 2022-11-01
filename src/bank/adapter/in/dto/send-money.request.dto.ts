import { Money } from 'src/bank/domain/money';

export class SendMoneyRequestDto {
  sourceAccountId: string;

  targetAccountId: string;

  amount: number;
}
