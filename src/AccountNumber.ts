
export class AccountNumber {
  constructor(public digits: number[]) { }

  isValid(): boolean {
    const mulDigits = this.digits.map((digit, index) => {
      return digit * (9 - index);
    });
    const total = mulDigits.reduce((a, b) => { return a + b; });
    const checksum = total % 11;
    return checksum === 0;
  }

  toString(): string {
    if (!this.isValid()) {
      return `${this.digits.join("")} ERR`;
    }
    return `${this.digits.join("")}`;
  }
}
