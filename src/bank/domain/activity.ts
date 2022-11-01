import { AccountId } from './account';
import { Money } from './money';

export type ActivityId = number | null;

export class Activity {
  constructor(
    private readonly _ownerAccountId: AccountId,
    private readonly _sourceAccountId: AccountId,
    private readonly _targetAccountId: AccountId,
    private readonly _timestamp: Date,
    private readonly _money: Money,
    private readonly _id?: ActivityId,
  ) {}

  get ownerAccountId(): AccountId {
    return this._ownerAccountId;
  }

  get id(): ActivityId {
    return this._id === undefined ? null : this._id;
  }

  get sourceAccountId(): AccountId {
    return this._sourceAccountId;
  }

  get targetAccountId(): AccountId {
    return this._targetAccountId;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get money(): Money {
    return this._money;
  }
}
