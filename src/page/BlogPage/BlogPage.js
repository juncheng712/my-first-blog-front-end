import React, { useEffect } from 'react';
import "./BlogPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { getUpdatedPost, selectActiveBlog, clearActiveBlog } from '../../reducers/blogPageReducer';
import { useHistory, useParams, Link } from 'react-router-dom';


function BlogPage() {

    const dispatch = useDispatch();
    const activeBlog = useSelector(selectActiveBlog);
    const history = useHistory();

    const changeRoutePath = (link) => {
        history.push(link);
    }

    const { id } = useParams()

    useEffect(() => {
        dispatch(getUpdatedPost(id))
        setTimeout(function() { 
            dispatch(getUpdatedPost(id))
        }, 1000)
        console.log(localStorage.getItem("authToken"))
        // dispatch(getUpdatedPost(id))
    }, [])

    const deletePost = () => {
        window.fetch(`/blog/${id}`, {
            method: "DELETE",
        })
        .then(() => {
            clearActiveBlog()
            changeRoutePath("/blogs")
        })
    }

    
    return (
        <div className="blogPage">
            <div className="blogPage__box">


            {/* blog top */}
            <div className="blogTop">
                <div className="blogTop__imageCover">
                    <img src={ activeBlog.coverImage } alt={ activeBlog.title } className="blogTop__bannerImage" />
                </div>
                <img src={ activeBlog.blogImage } alt={ activeBlog.title } className="blogTop__blogImage" />
            </div>

            {/* blog content */}
            <div className="blogContent">
                
                <div className="blogContent__title">
                    <h1>{ activeBlog.title }</h1>
                </div>
                <div className="blogContent__subInfo">
                    <p className="blogContent__author">by: Juncheng</p>
                    <p className="blogContent__date">{ activeBlog.updatedAt }</p>
                </div>
                {
                    activeBlog.blogContent.map( (block, index) => {
                        if (block.type === "file") {
                            return (
                                <div key={index} className="blockContent__imageContainer">
                                    <img className="blockContent__image" src={block.imageLink} />   
                                </div>
                            )
                        } else {
                            return (
                                <div className="blogContent__content" key={index}>
                                    <pre className="blogContent__paragraph">{ block.value }</pre>
                                </div>
                            )
                        }
                    } )
                }
                {/* <Link to="/blogs" className="blogContent__seeMoreButtonContainer"> */}
                    <Link to="/blogs" className="blogContent__seeMoreButton">More Posts</Link>
                {/* </Link> */}
                {
                    !localStorage.getItem("authToken")
                    ?
                    null
                    :
                    <div className="blogContent__bottomButtonGroup">
                        <button className="blogContent__bottomButton" onClick={() => changeRoutePath(`/blog-page-edit/${id}`)}>Edit</button>
                        <button className="blogContent__bottomButton" onClick={deletePost}>Delete</button>
                    </div>
                }
            </div>
            </div>

        </div>
        
    )
}

export default BlogPage
