import { ReactElement, useEffect, useState } from 'react';
import SideBar from 'src/components/SideBar';
import CardList from 'src/components/CardList';
import image1 from "src/assets/images/hotel-image-1.png"
import image2 from "src/assets/images/hotel-image-2.png"
import image3 from "src/assets/images/hotel-image-3.png"

const SearchResultPage = (): ReactElement => {
  const [dataList, setDataList] = useState([
    {
      name: "Iberostar Grand Salome", 
      location: "Costa Adeje, Tenerife", 
      rate: 5, 
      adultNum: 2,
      childNum: 2,
      infantNum: 1,
      startDate: "2019-07-03T00:00:00.000Z",
      durationDay: 7,
      departLocation: "East Midlands",
      price: 1136.50,
      priceCurrency: "£",
      overview: "The Iberostar Grand Salome has an exceptional location in the south of Tenerife, overlooking the Atlantic Ocean. It is situated between the Golf del Sur and the Amarillo Golf courses, and is an ideal hotel for families, couples and groups who are looking for a holiday full of sport, sun and sea.",
      imgUrl: image1
    },
    {
      name: "Aguamarina Golf Hotel", 
      location: "Costa Adeje, Tenerife", 
      rate: 4, 
      adultNum: 2,
      childNum: 1,
      infantNum: 0,
      startDate: "2019-05-27T00:00:00.000Z",
      durationDay: 7,
      departLocation: "Liverpool",
      price: 696.80,
      priceCurrency: "£",
      overview: "Overview of Aguamarina Golf Hotel",
      imgUrl: image2
    },
    {
      name: "Las Piramides Resort", 
      location: "Costa Adeje, Tenerife", 
      rate: 3, 
      adultNum: 2,
      childNum: 2,
      infantNum: 0,
      startDate: "2019-07-03T00:00:00.000Z",
      durationDay: 7,
      departLocation: "Manchester",
      price: 499.99,
      priceCurrency: "£",
      overview: "Overview of Las Piramides Resort",
      imgUrl: image3
    },
  ])
  const [sortingFunc, setSortingFunc] = useState<SortingFunction<Hotel> | null>(null)

  const onSortingMethodUpdate = (sortFunc: SortingFunction<Hotel>) => {
    setSortingFunc(() => sortFunc)
  }

  useEffect(() => {
    if (sortingFunc == null) return
    setDataList(sortingFunc(dataList))
  }, [sortingFunc])

  return (
    <div className='page list-page'>
      <div className='page-layout'>
        <SideBar handleSortingMethodChange={onSortingMethodUpdate}/>
        <CardList itemList={dataList}/>
      </div>
    </div>
  )
}

export default SearchResultPage
