import * as fs from "fs"
import { AccountNumber } from "./AccountNumber"

const ZERO_OCR =
  " _ " +
  "| |" +
  "|_|"

const ONE_OCR =
  "   " +
  "  |" +
  "  |"

const TWO_OCR =
  " _ " +
  " _|" +
  "|_ "

const THREE_OCR =
  " _ " +
  " _|" +
  " _|"

const FOUR_OCR =
  "   " +
  "|_|" +
  "  |"

const FIVE_OCR =
  " _ " +
  "|_ " +
  " _|"

const SIX_OCR =
  " _ " +
  "|_ " +
  "|_|"

const SEVEN_OCR =
  " _ " +
  "  |" +
  "  |"

const EIGHT_OCR =
  " _ " +
  "|_|" +
  "|_|"

const NINE_OCR =
  " _ " +
  "|_|" +
  " _|"

const OCR_TO_DIGIT_MAP = new Map<string, number> ([
  [ZERO_OCR, 0],
  [ONE_OCR, 1],
  [TWO_OCR, 2],
  [THREE_OCR, 3],
  [FOUR_OCR, 4],
  [FIVE_OCR, 5],
  [SIX_OCR, 6],
  [SEVEN_OCR, 7],
  [EIGHT_OCR, 8],
  [NINE_OCR, 9],
])

type Ocr = {
  line1: string
  line2: string
  line3: string
}

type DigitOcr = {
  line1: string
  line2: string
  line3: string
}

export function fileToAccNumbers(filename: string): string[] {
  const accNumOcrs = fileToOcrs(filename)
  const accNums = accNumOcrs.map(ocrToAccountNumber)
  return accNums.map((accNum) => accNum.toString())
}

function fileToOcrs(filename: string): Ocr[] {
  const fileText = fs.readFileSync(filename, 'utf8');
  const lines = fileText.split("\n")
  const ocrs: Ocr[] = []
  for (let i = 0; i < lines.length; i = i + 4) {
    ocrs.push({
      line1: lines[i],
      line2: lines[i+1],
      line3: lines[i+2],
    })
  }
  return ocrs
}

export function ocrToAccountNumber(ocr: Ocr): AccountNumber {
  const digitOcrs = ocrToDigitOcr(ocr)
  const digits: number[] = digitOcrs.map(digitOcrToDigit)
  return new AccountNumber(digits)
}

function ocrToDigitOcr(ocr: Ocr): DigitOcr[] {
  const digitOcrs: DigitOcr[] = []
  for (let i = 0; i < ocr.line1.length; i = i + 3) {
    digitOcrs.push({
      line1: ocr.line1.slice(i, i + 3),
      line2: ocr.line2.slice(i, i + 3),
      line3: ocr.line3.slice(i, i + 3),
    })
  }
  return digitOcrs
}

function digitOcrToDigit(digitOcr: DigitOcr): number {
  const oneLineString = digitOcr.line1 + digitOcr.line2 + digitOcr.line3
  return OCR_TO_DIGIT_MAP.get(oneLineString) as number
}

