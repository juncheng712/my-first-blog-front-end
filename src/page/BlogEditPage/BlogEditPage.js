import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { selectActiveBlog } from '../../reducers/blogPageReducer';
import "./BlogEditPage.css";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


function BlogEditPage() {

    const handleParagraphChange = (e, index) => {
        let { value } = e.target;
        let contentCopy = [...content];
        contentCopy[index].value = value;
        setContent(contentCopy);
      };

    const handleAddParagraph = () => {
        let newPara = { type: "text", value: "", id: content.length + 1 }
        setContent([...content, newPara]);
    };

    const handleImageChange = (e, index) => {
        let contentCopy = [...content];
        let formData = new FormData();
        formData.append('image', e.target.files[0])
        window.fetch(`/blog/${id}/images`, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => contentCopy[index]["imageLink"] = data.imageLink)
        .catch(err => console.log(err))
        .finally(() => setContent(contentCopy))
      };

    const handleRemoveClick = (e, index) => {
        let contentCopy = [...content];
        contentCopy.splice(index, 1);
        setContent(contentCopy);
    };

    const handleAddImage = () => {
        let newImage = { type: "file", id: content.length + 1, imageLink: "" }
        setContent([...content, newImage]);
    };


    // application state
    const [coverImageLink, setCoverImageLink] = useState(null);
    const [blogImageLink, setBlogImageLink] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState([]);

    // define hooks
    const { id } = useParams()
    const history = useHistory();
    const activeBlog = useSelector(selectActiveBlog);

    // useEffect
    useEffect(() => {
        var activeBlogCopy = JSON.parse(JSON.stringify(activeBlog));
        setTitle(activeBlogCopy.title);
        setContent(activeBlogCopy.blogContent)
    }, []);

    // application functions
    const changeRoutePath = (link) => {
        history.push(link);
    }

    const onSelectCoverImage = e => {
        var formData = new FormData();
        formData.append("coverImage", e.target.files[0]);
        window.fetch(`/blog/${id}/cover-image`, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => setCoverImageLink(data.imageLink))
    }

    const onSelectedBlogImage = e => {
        var formData = new FormData();
        formData.append("blogImage", e.target.files[0]);
        window.fetch(`/blog/${id}/blog-image`, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => setBlogImageLink(data.imageLink))
    }

    const handleSaveChange = () => {
        let blogPage = {
            title: title,
            coverImage: coverImageLink,
            blogImage: blogImageLink,
            blogContent: content
        }
        window.fetch(`/blog/${id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(blogPage)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .finally(() => {
            setTitle("");
            setContent([]);
            setCoverImageLink("")
            setBlogImageLink("")
            changeRoutePath(`/blog-page/${id}`)
        })
    }
    
    return (
        <div className="blogEditPage__container">
            {/* blog top edit */}
            <div className="blogTop">
                <div className="blogTop__imageCover">
                    <div className="blogTop__bannerCover">
                        <img src={ coverImageLink ? coverImageLink : activeBlog.coverImage } alt={ activeBlog.title } className="blogTop__bannerImage" />
                        <label className="blogTop__EditInstruction" htmlFor="coverImage">
                            Click to edit
                        </label>
                        <input id="coverImage" className="blogTop__coverImageInput" type="file" onChange={onSelectCoverImage} />
                    </div>
                </div>
                <div className="blogTop__bannerCover">
                    <img src={ blogImageLink ? blogImageLink : activeBlog.blogImage } alt={ activeBlog.title } className="blogTop__blogImage" />
                    <label className="blogTop__EditInstruction" htmlFor="blogImage">
                        Click to edit
                    </label>
                    <input id="blogImage" className="blogTop__coverImageInput" type="file" onChange={onSelectedBlogImage} />
                </div>
            </div>

            {/* blog content edit */}
            <div className="blogContent">
                <div className="blogContent__title">
                    <input type="text" onChange={e => setTitle(e.target.value)} value={title}
                    className="blogContent__editTitle" placeholder="Your title here..." />
                </div>
                <div className="blogContent__subInfo">
                    <p className="blogContent__author">by: Juncheng</p>
                    <p className="blogContent__date">{ activeBlog.updatedAt }</p>
                </div>
                <div className="blogContent__content">
                    {
                        content && content.length > 0
                        ?
                        content.map((item, index) => {
                            if (item.type === "text") {
                                return (
                                    <div key={index} className="blogEditPage__addText" autofocus>
                                        <TextareaAutosize
                                            value={item.value}
                                            onChange={(e) => handleParagraphChange(e, index)}
                                            type="text"
                                            className="blogEditPage__blog"
                                            id={index}
                                        />
                                        <button className="blogEditPage__removeButton" onClick={e => handleRemoveClick(e, index)}>Remove</button>
                                    </div>
                                )
                            } else if (item.type === "file") {
                                return (
                                <div className="blogEditPage__addImage" key={index}>
                                    <img 
                                    src={item.imageLink ? item.imageLink : null} 
                                    className="blogEditPage__contentImage"
                                    />
                                    <div className="blogEditPage__imageInputButtons"> 
                                        <label htmlFor={index} 
                                        className="blogEditPage__imageInputLabel">Select Image</label>
                                        <input
                                        onChange={ e => handleImageChange(e, index) }
                                        type="file"
                                        id={index}
                                        className="blogEditPage__imageInput"
                                        />
                                        <button className="blogEditPage__removeButton" onClick={e => handleRemoveClick(e, index)}>Remove</button>
                                    </div>
                                </div>
                                );
                            }
                        })
                        :
                        null
                    }
                </div>
                <div className="blogContent__addElementButtons">
                    <button onClick={handleAddImage} className="blogEditPage__addElementButton">Add Image</button>
                    <button onClick={handleAddParagraph} className="blogEditPage__addElementButton">Add Paragraph</button>
                </div>
                <button className="blogContent__editButton" onClick={handleSaveChange} accessKey="s">
                    Save and Preview
                </button>
            </div>
        </div>
    )
}

export default BlogEditPage
