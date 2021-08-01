import React, { useEffect, useState } from 'react';
import "./HomePost.css";
import { HashLink } from "react-router-hash-link";
import { Link, useHistory } from "react-router-dom";
import { getBlogPosts, selectBlogPost } from "../../reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBlog } from "../../reducers/blogPageReducer"
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';


function HomePost() {

    const dispatch = useDispatch();
    const posts = useSelector(selectBlogPost)
    const history = useHistory();

    // application state
    const [workout, setWorkout] = useState([])
    const [investing, setInvesting] = useState([])
    const [business, setBusiness] = useState([])
    const [coding, setCoding] = useState([])

    const returnThreeForEachCategory = (setSomething, category) => {
        let filterCategory = posts.blogPost.filter(post => post.category === category)
        let copyFilter = [...filterCategory]
        let selectThreeOnly = copyFilter.splice(0, 3)
        return setSomething(selectThreeOnly)
    }

    useEffect(() => {
        async function dispatchData() {
            dispatch(getBlogPosts());
            returnThreeForEachCategory(setWorkout, "workout")
            returnThreeForEachCategory(setInvesting, "investing")
            returnThreeForEachCategory(setBusiness, "business")
            returnThreeForEachCategory(setCoding, "coding")
            // setWorkout(posts.blogPost.filter(post => post.category === "workout"))
            // setInvesting(posts.blogPost.filter(post => post.category === "investing"))
            // setBusiness(posts.blogPost.filter(post => post.category === "business"))
            // setCoding(posts.blogPost.filter(post => post.category === "coding"))
        }
        dispatchData()
    }, [dispatch]);

    const changeRoutePath = (link) => {
        history.push(link);
    }

    
    return (
        <div className="homePost">
            <div className="homePost__section">
                <h1>Workout</h1>
                <div className="homePost__posts">
                    {
                        workout && (workout.length > 0)
                        ?
                        workout.map(post => (
                    
                            (

                                <div onClick={() => { dispatch(setActiveBlog({
                                    coverImage: post.coverImage,
                                    blogImage: post.blogImage,
                                    title: post.title,
                                    blogContent: post.blogContent,
                                    lastModified: post.lastModified
                                })); 
                                changeRoutePath(`/blog-page/${post._id}`) }} 
                                className="homePost__post" key={post._id}>
                                    <img src={post.blogImage} 
                                    alt={post.title} className="homePost__image" />
                                    <div className="homePost__postText">
                                        <p className="homePost__postTitle">{post.title}</p>
                                        <p className="homePost__postDate">{post.createdAt.toLocaleString()}</p>
                                    </div>
                                </div>
                            )
                            
                        ))
                        :
                        <p>Coming Soon</p>
                    }
                </div>
            </div>
            
            <div className="homePost__section">
                <h1>Coding</h1>
                <div className="homePost__posts">
                {
                        coding && (coding.length > 0)
                        ?
                        coding.map(post => (
                            
                            (

                                <div onClick={() => { dispatch(setActiveBlog({
                                    coverImage: post.coverImage,
                                    blogImage: post.blogImage,
                                    title: post.title,
                                    blogContent: post.blogContent,
                                    lastModified: post.lastModified
                                })); 
                                changeRoutePath(`/blog-page/${post._id}`) }} 
                                className="homePost__post" key={post._id}>
                                    <img src={post.blogImage} 
                                    alt={post.title} className="homePost__image" />
                                    <div className="homePost__postText">
                                        <p className="homePost__postTitle">{post.title}</p>
                                        <p className="homePost__postDate">{post.createdAt.toLocaleString()}</p>
                                    </div>
                                </div>
                            )
                            
                        ))
                        :
                        <p>Coming Soon</p>
                    }
                </div>
            </div>

            <div className="homePost__section">
                <h1>Investing</h1>
                <div className="homePost__posts">
                {
                        investing && (investing.length > 0)
                        ?
                        investing.map(post => (
                    
                            (

                                <div onClick={() => { dispatch(setActiveBlog({
                                    coverImage: post.coverImage,
                                    blogImage: post.blogImage,
                                    title: post.title,
                                    blogContent: post.blogContent,
                                    lastModified: post.lastModified
                                })); 
                                changeRoutePath(`/blog-page/${post._id}`) }} 
                                className="homePost__post" key={post._id}>
                                    <img src={post.blogImage} 
                                    alt={post.title} className="homePost__image" />
                                    <div className="homePost__postText">
                                        <p className="homePost__postTitle">{post.title}</p>
                                        {/* <p className="homePost__postDate">{post.createdAt.toLocaleString()}</p> */}
                                    </div>
                                </div>
                            )
                            
                        ))
                        :
                        <p>Coming Soon</p>
                    }
                </div>
            </div>

            <div className="homePost__section">
                <h1>Business</h1>
                <div className="homePost__posts">
                {
                        business && (business.length > 0)
                        ?
                        business.map(post => (
                            
                            (

                                <div onClick={() => { dispatch(setActiveBlog({
                                    coverImage: post.coverImage,
                                    blogImage: post.blogImage,
                                    title: post.title,
                                    blogContent: post.blogContent,
                                    lastModified: post.lastModified
                                })); 
                                changeRoutePath(`/blog-page/${post._id}`) }} 
                                className="homePost__post" key={post._id}>
                                    <img src={post.blogImage} 
                                    alt={post.title} className="homePost__image" />
                                    <div className="homePost__postText">
                                        <p className="homePost__postTitle">{post.title}</p>
                                        <p className="homePost__postDate">{post.createdAt.toLocaleString()}</p>
                                    </div>
                                </div>
                            )
                            
                        ))
                        :
                        <p>Coming Soon</p>
                    }
                </div>
            </div>
                <HashLink to="#" smooth><ArrowDropUpIcon className="homePost__upButton"/></HashLink>

        </div>
    )
}

export default HomePost
