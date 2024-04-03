const keys: { [key: string]: string } = {
  "adult_one": "Adult", 
  "adult_other": "Adults", 
  "child_one": "child", 
  "child_other": "children", 
  "infant_one": "infant", 
  "infant_other": "infants", 
  "day_one": "day", 
  "day_other": "days", 
}

const translate = (key: string, count: number, withCount = false): string => (withCount ? `${count} ` : "") + keys[`${key}_${count === 1 ? "one" : "other"}`]

const monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const parseISOStringToDate = (ISOString: string) => {
  const date = new Date(ISOString)
  const dateNum = date.getDate()
  let j = dateNum % 10, k = dateNum % 100;
  let dateSuffix = "th"
  if (j === 1 && k !== 11) dateSuffix = "st"
  if (j === 2 && k !== 12) dateSuffix = "nd"
  if (j === 3 && k !== 13) dateSuffix = "rd"
  return `${dateNum}${dateSuffix} ${monthArr[date.getMonth()]} ${date.getFullYear()}`
}

const formatNumberWithCommas = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export {
  translate,
  parseISOStringToDate,
  formatNumberWithCommas
}
