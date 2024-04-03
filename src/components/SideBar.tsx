import { useState, FC, MouseEventHandler, useEffect } from "react"
import { faArrowDownAZ, faSterlingSign, faStar } from "@fortawesome/free-solid-svg-icons"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SideBarOption: FC<{ textPrefix: string, text: string, icon: IconDefinition, isSelected: boolean, handleClick: MouseEventHandler<HTMLDivElement> }> = ({ textPrefix, text, icon, isSelected, handleClick }) => {
  return <div className={`sidebar-option ${isSelected ? 'sidebar-option-selected' : ''}`} onClick={handleClick}>
    <span>{textPrefix}<b>{text}</b></span>
    <span className="icon-wrapper"><FontAwesomeIcon className="faicon" icon={icon} /></span>
  </div>
}

const sortTypeList = [
  {
    textPrefix: "sort ",
    text: "alphabetically",
    icon: faArrowDownAZ,
    sortFunc: (arr: Hotel[]) => arr.slice().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  },
  {
    textPrefix: "sort by ",
    text: "price",
    icon: faSterlingSign,
    sortFunc: (arr: Hotel[]) => arr.slice().sort((a, b) => b.price - a.price)
  },
  {
    textPrefix: "sort by ",
    text: "star rating",
    icon: faStar,
    sortFunc: (arr: Hotel[]) => arr.slice().sort((a, b) => b.rate - a.rate)
  }
]

const SideBar: FC<{handleSortingMethodChange: (sortFunc: SortingFunction<Hotel>) => void}> = ({ handleSortingMethodChange }) => {
  const [selectedIdx, setSelectedIdx] = useState(0)

  useEffect(() => {
    handleSortingMethodChange(sortTypeList[selectedIdx].sortFunc)
  }, [selectedIdx])

  return <div className="sidebar">
    {
      sortTypeList.map(({ textPrefix, text, icon }, i) => {
        return <SideBarOption 
          key={i} 
          textPrefix={textPrefix} text={text} icon={icon} 
          isSelected={selectedIdx === i} 
          handleClick={() => selectedIdx !== i && setSelectedIdx(i)} />
      })
    }
  </div>
}

export default SideBar;
