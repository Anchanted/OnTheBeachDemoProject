import { FC, useEffect, useState } from "react";
import { faAngleRight, faAngleDown, faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatNumberWithCommas, parseISOStringToDate, translate } from "src/utils";

const RateBar: FC<{ value: number }> = ({ value }) => {
  const [fullCount, setFullCount] = useState(0)
  const [hasHalf, setHasHalf] = useState(false)

  useEffect(() => {
    const intVal = Math.floor(value)
    setFullCount(intVal)
    const decimal = value - intVal
    if (decimal > 0 && intVal < 5) setHasHalf(true)
  }, [value])
  
  return <>
    {[...Array(fullCount).keys()].map(key => <FontAwesomeIcon key={key} className="faicon" icon={faStar} />)}
    {hasHalf && <FontAwesomeIcon className="faicon" icon={faStarHalf} />}
  </>
}

const HotelCard: FC<{ item: Hotel }> = ({ item }) => {
  const [isToggled, setIsToggled] = useState(false)

  return <div className="card">
    <div className="card-info-wrapper">
      <div className="image-wrapper">
        <div className="image-container" style={{ backgroundImage: `url(${item.imgUrl})` }}/>
        <div className="toggle-button" onClick={_ => {setIsToggled(!isToggled)}}>
          <span><b>Read {isToggled ? "less" : "more"}</b> about this hotel</span>
          <FontAwesomeIcon className="faicon" icon={isToggled ? faAngleDown : faAngleRight} />
        </div>
      </div>
      <div className="card-info">
        <div className="card-info-name">{item.name}</div>
        <div className="card-info-location">{item.location}</div>
        <div className="card-info-rate"><RateBar value={item.rate}/></div>
        <div className="card-info-person">
          <b>{item.adultNum}</b> {translate("adult", item.adultNum)}
          { (item.childNum || item.infantNum) ? ', ' : '' }
          { !!item.childNum && <><b>{item.childNum}</b> {translate("child", item.childNum)}</> }
          { (item.childNum && item.infantNum) ? ' & ' : '' }
          { !!item.infantNum && <><b>{item.infantNum}</b> {translate("infant", item.infantNum)}</> }
        </div>
        <div className="card-info-time"><b>{parseISOStringToDate(item.startDate)}</b> for <b>{translate("day", item.durationDay, true)}</b></div>
        <div className="card-info-departlocation">departing from <b>{item.departLocation}</b></div>
        <div className="card-info-button">
          <div className="card-info-button-text">Book now</div>
          <div className="card-info-button-price">{item.priceCurrency} {formatNumberWithCommas(item.price)}</div>
        </div>
      </div>
    </div>
    {
      isToggled && 
      <div className="card-description">
        <div className="card-description-header">Overview</div>
        <div className="card-description-content">{item.overview}</div>
      </div>
    }
  </div>
}

const CardList: FC<{ itemList: Hotel[] }> = ({ itemList }) => {
  return <div className="card-list">
    {itemList.map((item, i) => {
      return <HotelCard key={i} item={item} />
    })}
  </div>
}

export default CardList
