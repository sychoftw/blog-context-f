import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import TagPage from "./pages/TagPage";
import CategoryPage from "./pages/CategoryPage";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";


export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const[searchParams,setSearchParams]=useSearchParams();
  const location=useLocation();
  useEffect(() => {
    const page= searchParams.get("page")?? 1;
    if(location.pathname.includes("tags")){
      //iska mtlb tag wala show krna hai
      const tag=location.pathname.split("/").at(-1).replace("-"," ");
      fetchBlogPosts(Number(page),tag);  

    }else if(location.pathname.includes("categories")){
      const category=location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page),null,category)
    }else{
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname,location.search]);

  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/blog/:blogId" element={<BlogPage></BlogPage>} />
      <Route path="/tags/:tag" element={<TagPage></TagPage>} />
      <Route
        path="/categories/:category"
        element={<CategoryPage></CategoryPage>}
      />
    </Routes>
  );
}
