import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function ClassChecklist() {
  const [showList, setShowList] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "MATH 114", checked: false},
    { id: 2, name: "CSCI 241", checked: false},
    { id: 3, name: "CSCI 231", checked: false},
    { id: 4, name: "CSCI 245", checked: false },
  ]);

  function handleItemClick(item) {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, checked: !i.checked } : i
      )
    );
  }

  function handleHamburgerClick() {
    setShowList(!showList);
  }

  return (
    <div>
      <GiHamburgerMenu
        className="fixed float-left z-1 pt-[75px] text-[#1d6834]"
        size="2rem"
        onClick={handleHamburgerClick}
      />
      {showList && (
        <div className="fixed w-[200px] h-[100%] bg-[#333] text-[#fff] pt-[10px]">
          <h2 className='pr-[5px] text-center'>Major Classes</h2>
          <ul className='list-none'>
            {items.map((item) => (
              <li key={item.id} onClick={() => handleItemClick(item)} className="block cursor-pointer">
                <input type="checkbox" checked={item.checked} readOnly />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ClassChecklist;