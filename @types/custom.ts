type Hotel = { 
  name: string, 
  location: string, 
  rate: number, 
  adultNum: number,
  childNum: number,
  infantNum: number,
  startDate: string,
  durationDay: number,
  departLocation: string,
  price: number,
  priceCurrency: string,
  overview: string,
  imgUrl: any
}

type SortingFunction<T> = (arr: T[]) => T[]
