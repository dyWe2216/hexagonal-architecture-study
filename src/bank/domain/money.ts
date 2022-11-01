import { BigNumber } from 'bignumber.js';

export class Money {
  constructor(private readonly _amount: BigNumber) {}

  static ZERO() {
    return new Money(new BigNumber(0));
  }

  static of(value: number) {
    return new Money(new BigNumber(value));
  }

  get amount(): BigNumber {
    return this._amount;
  }

  static add(a: Money, b: Money): Money {
    return new Money(a.amount.plus(b.amount));
  }

  negate() {
    return new Money(this.amount.negated());
  }

  isPositiveOrZero() {
    return this.amount.comparedTo(0) >= 0;
  }
}
