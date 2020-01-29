export class IncreaseCounter {
  static readonly type = '[app] IncreaseCounter';
  constructor(public index: number) {}
}
