import { fileToAccNumbers, ocrToAccountNumber } from "./bank-ocr"

describe("bank-ocr", () => {
  it("reads a file and returns account numbers", () => {
    const accNums = fileToAccNumbers("test/test_acc_nums.txt")
    expect(accNums).toEqual([
      "000000000",
      "000000001 ERR",
    ])
  })

  describe("ocrToAccNum", () => {
    it("should parse allNumbers", () => {
      const allDigitsOCR = {
        line1: " _     _  _     _  _  _  _  _ ",
        line2: "| |  | _| _||_||_ |_   ||_||_|",
        line3: "|_|  ||_  _|  | _||_|  ||_| _|",
      }
      const accNum = ocrToAccountNumber(allDigitsOCR)
       expect(accNum.digits.join("")).toBe("0123456789")
    })
  })
})