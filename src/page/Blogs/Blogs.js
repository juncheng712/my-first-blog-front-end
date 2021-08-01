import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Filter from "../../features/Filter/Filter";
import { setActiveBlog } from '../../reducers/blogPageReducer';
import { selectBlogPost, getBlogPosts } from '../../reducers/blogReducer';
import "./Blogs.css";


function Blogs() {

    const dispatch = useDispatch();
    const history = useHistory();
    const blog = useSelector(selectBlogPost);

    const [category, setCategory] = useState("");
    const [openCategoryWindow, setOpenCategoryWindow] = useState(false);

    const changeRoutePath = (link) => {
        history.push(link);
    }

    useEffect(() => {
        dispatch(getBlogPosts())
    }, [])

    const getCategory = category => {
        setCategory(category)
    }

    const addPost = () => {
        setOpenCategoryWindow(true);
    }

    const createPost = (e) => {
        window.fetch('/blog', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: e.target.value
            })
        })
        .then(res => res.json())
        .then((data) => {
            setActiveBlog(data.blog)
            changeRoutePath(`/blog-page/${data.blog._id}`);
        })
    }


    
    return (
        <div className="blogs">
            <div className="blogs__topSection">
                <h1 className="blogs__title">Blogs</h1>
                <Filter className="blogs__filter" getCategory={getCategory} />
            </div>
            {
                blog
                ?
                (category
                ?
                <h1 className="blogs__category">{ blog.category.charAt(0).toUpperCase() + blog.category.slice(1) }</h1>
                :
                <h1 className="blogs__category">All Post</h1>)
                :
                <h1>Coming Soon</h1>
            }
            <div className="blogs__postsSection">

                {
                    blog
                    ?
                    blog.sortedPost.map(post => (
                    
                        (
                            <div onClick={() => { dispatch(setActiveBlog({
                                coverImage: post.coverImage,
                                blogImage: post.blogImage,
                                title: post.title,
                                blogContent: post.blogContent,
                                lastModified: post.lastModified
                            })); 
                            changeRoutePath(`/blog-page/${post._id}`) }} 
                            className="blogs__post" key={post._id}>
                                <img src={post.blogImage} 
                                alt={post.title} className="blogs__postImage" />
                                <div className="blogs__postText">
                                    <p className="blogs__postTitle">{post.title}</p>
                                    {/* <p className="blogs__postDate">{post.createdTime}</p> */}
                                </div>
                            </div>
                        )
                        
                    ))
                    :
                    null
                }

                {
                    openCategoryWindow
                    ?
                    <div className="blogs__addPostContainer">
                        <p className="blogs__cancelAddPost" onClick={() => setOpenCategoryWindow(false)}>x</p>
                        <h1>Create Posts</h1>
                        <p>Select the <span>category</span> for your post</p>
                        <div className="blogs__selectCategoryContainer">
                            <option onClick={e => createPost(e)} 
                            className="blogs__categoryOptions" value="investing">Investing</option>
                            <option onClick={e => createPost(e)} 
                            className="blogs__categoryOptions" value="business">Business</option>
                            <option onClick={e => createPost(e)}
                            className="blogs__categoryOptions" value="coding">Coding</option>
                            <option onClick={e => createPost(e)}
                            className="blogs__categoryOptions" value="workout">Workout</option>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
            {
                localStorage.getItem("authToken")
                ?
                <button className="blogs__addPostButton" onClick={addPost}>Add Post</button>
                :
                null
            }
        </div>
    )
}

export default Blogs
