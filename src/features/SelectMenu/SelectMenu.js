import React, { createRef, useEffect, useState } from 'react';
import {matchSorter} from 'match-sorter'

const MENU_HEIGHT = 150;

const allowedTags = [
    {
      id: "page-title",
      tag: "h1",
      label: "Page Title"
    },
    {
      id: "heading",
      tag: "h2",
      label: "Heading"
    },
    {
      id: "subheading",
      tag: "h3",
      label: "Subheading"
    },
    {
      id: "paragraph",
      tag: "p",
      label: "Paragraph"
    }
  ];
  
  
function SelectMenu({ onSelect, close, position }) {

    const [command, setCommand] = useState("")
    const [items, setItems] = useState(allowedTags)
    const [selectedItems, setSelectedItems] = useState(0)

    const prevCommandRef = createRef();
    // const prevSleRef = useRef();

    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        prevCommandRef.current = command;
        const prevCommand = prevCommandRef.current;
        if (prevCommand !== command) {
          const items = matchSorter(allowedTags, command, { keys: ["tag"] });
          setItems(items)
        }
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
          }
    }, [command])

    const keyDownHandler = (e) => {

        switch (e.key) {
          case "Enter":
            e.preventDefault();
            onSelect(items[selectedItems].tag);
            break;
          case "Backspace":
            if (!command) close();
            setCommand(command.substring(0, command.length - 1))
            break;
          case "ArrowUp":
            e.preventDefault();
            const prevSelected = selectedItems === 0 ? items.length - 1 : selectedItems - 1;
            setSelectedItems(prevSelected)
            break;
          case "ArrowDown":
          case "Tab":
            e.preventDefault();
            const nextSelected = selectedItems === items.length - 1 ? 0 : selectedItems + 1;
            setSelectedItems(nextSelected)
            break;
          default:
            setCommand(command + e.key)
            break;
        }
      }

        const x = position.x;
        const y = position.y - MENU_HEIGHT;
        const positionAttributes = { top: y, left: x };
    
    
    return (
        <div className="SelectMenu" style={positionAttributes}>
            <div className="Items">
            {
            items.map((item, key) => {
                const isSelected = items.indexOf(item) === selectedItems;
                return (
                <div
                    className={isSelected ? "Selected" : null}
                    key={key}
                    role="button"
                    tabIndex="0"
                    onClick={() => onSelect(item.tag)}
                >
                    {item.label}
                </div>
                );
            })
            }
            </div>
        </div>
    )
}

export default SelectMenu
