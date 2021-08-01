import React, { createRef, useEffect, useRef, useState } from 'react';
import ContentEditable from "react-contenteditable";
import SelectMenu from '../SelectMenu/SelectMenu';


function EditableBlock({ tagProps, htmlProps, updatePage, deleteBlock, addBlock, idProps }) {

    // const contentEditable = createRef();

    // props
    const contentEditable = createRef();
    const [html, setHtml] = useState(htmlProps);
    const [tag, setTag] = useState(tagProps);
    const [htmlBackup, setHtmlBackup] = useState(null);
    const [previousKey, setPreviousKey] = useState("");
    const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false)
    const [selectMenuPosition, setSelectMenuPosition] = useState(null)

    useEffect(() => {
      updatePage({
        id: idProps,
        html: html,
        tag: tag
      });
      // console.log(html)
    }, [html, tag])

    useEffect(() => {
      console.log(htmlBackup)
    }, [htmlBackup])

    const onChangeHandler = (e) => {
        setHtml(e.target.value)
    }

    const onKeyDownHandler = (e) => {
        if (e.key === "/") {
          if (previousKey !== "Shift")
            setHtmlBackup(html);
        }
        if (e.key === "Enter") {
          if (previousKey !== "Shift") {
            e.preventDefault();
            addBlock({
              id: idProps,
              ref: contentEditable.current
            });
          }
        }
        // console.log(html)
        // console.log(e.key === "Backspace")
        if (e.key === "Backspace" && !html) {
          e.preventDefault();
          deleteBlock({
            id: idProps,
            ref: contentEditable.current
          });
        }
        setPreviousKey(e.key);
      }

    
    const onKeyUpHandler = (e) => {
        if (e.key === "/") {
            openSelectMenuHandler();
        }
    }

    const openSelectMenuHandler = () => {
        const { x, y } = getCaretCoordinates();
        setSelectMenuIsOpen(true);
        setSelectMenuPosition({ x, y })
        document.addEventListener("click", closeSelectMenuHandler);
    }


    const closeSelectMenuHandler = () => {
        setHtmlBackup(null)
        setSelectMenuIsOpen(false)
        setSelectMenuPosition({ x: null, y: null })
        document.removeEventListener("click", closeSelectMenuHandler);
    }

    const tagSelectionHandler = (tag) => {
      // console.log(htmlBackup)
        setTag(tag);
        setHtml(htmlBackup);
    }

    useEffect(() => {
        setCaretToEnd(contentEditable.current);
        closeSelectMenuHandler();
    }, [tag])

    const setCaretToEnd = (element) => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
      };

    const getCaretCoordinates = () => {
        let x, y;
        const selection = window.getSelection();
        if (selection.rangeCount !== 0) {
          const range = selection.getRangeAt(0).cloneRange();
          range.collapse(false);
          const rect = range.getClientRects()[0];
          if (rect) {
            x = rect.left;
            y = rect.top;
          }
        }
        return { x, y };
      };
    
    return (
        <>
        {selectMenuIsOpen && (
            <SelectMenu
              position={selectMenuPosition}
              onSelect={tagSelectionHandler}
              close={closeSelectMenuHandler}
            />
          )}
        <ContentEditable
        // className="Block"
        innerRef={contentEditable}
        html={html}
        tagName={tag}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHandler}
      />
      </>
    )
}

export default EditableBlock
