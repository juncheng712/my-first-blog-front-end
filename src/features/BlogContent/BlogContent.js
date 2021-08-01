import React, { useEffect, useState } from 'react';
import EditableBlock from "../EditableBlock/EditableBlock"

function BlogContent() {

    const uid = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
      };

    const initialBlock = {
        id: uid(),
        html: "",
        tag: "p",
    }

    // application state
    const [blocks, setBlocks] = useState([initialBlock])
    
    // application function
    const updatePageHandler = (updatedBlock) => {
        const index = blocks.map( block => block.id ).indexOf( updatedBlock.id )
        console.log(index)
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: updatedBlock.tag,
            html: updatedBlock.html,
        };
        setBlocks(updatedBlocks)
    }

    const addBlockHandler = (currentBlock) => {
        const newBlock = { id: uid(), html: "", tag: "p" };
        const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
        setNewB(true)
        setCurrentToAdd(currentBlock)
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index + 1, 0, newBlock);
            setBlocks(updatedBlocks)
    }

    const [currentToAdd, setCurrentToAdd] = useState(null)
    const [newB, setNewB] = useState(false)
        
    useEffect(() => {
        if (currentToAdd && newB) {
            currentToAdd.ref.nextElementSibling.focus()
            setNewB(false)
        }
    }, [blocks, newB])

    const deleteBlockHandler = (currentBlock) => {
        const previousBlock = currentBlock.ref.previousElementSibling;
        if (previousBlock) {
            const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
            const updatedBlocks = [...blocks];
            updatedBlocks.splice(index, 1);
            setBlocks(updatedBlocks)
            setCurrentToDelete(currentBlock);
            setPrevBlock(previousBlock)
        }
    }


    const [currentToDelete, setCurrentToDelete] = useState(null)
    const [prevBlock, setPrevBlock] = useState(null)
        
    useEffect(() => {
        if (currentToDelete && prevBlock) {
            prevBlock.focus()
            setCaretToEnd(prevBlock);
            setPrevBlock(null)
        }
    }, [blocks, prevBlock])

    const setCaretToEnd = (element) => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
      };

    
    return (
        <div>
            {
                blocks.map( (block, key) => {
                    return (
                        // console.log(block.html)
                        <EditableBlock
                            key={key}
                            idProps={block.id}
                            tagProps={block.tag}
                            htmlProps={block.html}
                            updatePage={updatePageHandler}
                            addBlock={addBlockHandler}
                            deleteBlock={deleteBlockHandler}
                        />
                    )
                } )
            }
        </div>
    )
}

export default BlogContent
