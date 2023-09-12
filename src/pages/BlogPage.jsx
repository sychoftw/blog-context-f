import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';
import { baseUrl } from '../baseUrl';
import { useContext } from 'react';

const BlogPage = () => {
    const newBaseUrl="https://codehelp-apis.vercel.app/api/"
    const [blog,setblog]=useState(null);
    const [relatedblog,setrelatedblog]=useState([]);
    const location=useLocation();
    const navigation=useNavigate();
    const{loading,setLoading}=useContext(AppContext);
    const blogId=location.pathname.split("/").at(-1);
    async function fetchrelatedblogs(){
        setLoading(true);
        let url=`${newBaseUrl} ?blogId=${blogId}`;
        try{
            const res=await fetch(url)
            const data=await res.json();

            setblog(data.blog);
            setrelatedblog(data.relatedblog);
        }
        catch(error){
            console.log("error aargya in blog id wala call")
            setblog(null)
            setrelatedblog([])
        }
        setLoading(false)
    }
    useEffect(()=>{
        if(blogId){
            fetchrelatedblogs();
        }
    },[location.pathname] )

  return (
    <div>
      <Header></Header>
      <div>
        <button onClick={()=>navigation(-1)}>back</button>
      </div>
      {
        loading?(<p>loading</p>):
        blog?
        (<div>
            <BlogDetails post={blog}></BlogDetails>
            <h2>relatedblog</h2>
            {

                relatedblog.map((post)=>(
                    <div key={post.id}>
                        <BlogDetails post={post}></BlogDetails>
                    </div>
                ))
            }
        </div>):
        (<div>
            <p>no blog found</p>
        </div>)
      }
    </div>
  )
}

export default BlogPage
