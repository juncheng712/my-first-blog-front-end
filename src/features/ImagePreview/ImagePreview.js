import React, { useEffect, useState } from 'react'

function ImagePreview({ imageValue }) {

    const [imagePreview, setImagePreview] = useState();
    
    useEffect(() => {
        
        const url = URL.createObjectURL(imageValue);
        setImagePreview(url)
    }, [imageValue])
    
    return (
        <div>
            <img src={ imagePreview ? imagePreview : null } alt="" 
                className="addImage__previewedImage" />
        </div>
    )
}

export default ImagePreview
