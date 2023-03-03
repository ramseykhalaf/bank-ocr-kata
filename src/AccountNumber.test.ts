import { AccountNumber } from "./AccountNumber"

describe("AccountNumber", () => {
  describe("isValid", () => {
    it("calculates a checksum for validity", () => {
      const validAccNum = new AccountNumber([0, 0, 0, 0, 0, 0, 0, 0, 0])
      expect(validAccNum.isValid()).toBe(true)
    })
    it("calculates a checksum when invalid", () => {
      const accNum1 = new AccountNumber([0, 0, 0, 0, 0, 0, 0, 0, 1])
      expect(accNum1.isValid()).toBe(false)

      const accNum2 = new AccountNumber([6, 6, 4, 3, 7, 1, 4, 9, 5])
      expect(accNum2.isValid()).toBe(false)
    })
  })

  describe("toString", () => {
    it("prints just digits when valid", () => {
      const validAccNum = new AccountNumber([0, 0, 0, 0, 0, 0, 0, 0, 0])
      expect(validAccNum.toString()).toBe("000000000")
    })
    it("prints digits and ERR when invalid", () => {
      const invalidAccNum = new AccountNumber([0, 0, 0, 0, 0, 0, 0, 0, 1])
      expect(invalidAccNum.toString()).toBe("000000001 ERR")
    })
  })
})