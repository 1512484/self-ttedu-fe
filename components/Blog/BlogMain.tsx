import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import BlogSidebar from './BlogSidebar';
import SingleBlog from './SingleBlog';

const BlogMain = () => {
   const [sectionData, setSectionData] = useState({})
   const [pageData, setPageData] = useState({})

   useEffect(() => {
      fetch(
         `${process.env.APP_BACK_END_URL}/setting/inner-page/blogs`,
         {
            method: "GET",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            }
         }
      )
         .then(response => response.json())
         .then((response) => handleResponseData(response))
         .catch(err => console.error(err))
   }, [])

   const handleResponseData = (res) => {
      setSectionData(res.data);
      let data = {
         'title': "Tin tức",
         'sub_title': res.data?.site_blogs_sub_title,
         'image': res.data?.site_blogs_banner_image,
         'description': res.data?.site_blogs_description,
         'keywords': res.data?.site_blogs_keywords,
         'url': process.env.APP_BASE_URL
      }
      setPageData(data);
   }

   return typeof pageData !== 'undefined' && pageData !== null ? (
      <main>
         <Breadcrumb pageData={pageData} />

         <div className="blog-area pt-120 pb-90">
            <div className="container">
               <div className="row">
                  <div className="col-xl-8 col-lg-7">
                     <div className="blog-main-wrapper mb-30">
                        <div className="row">
                           <div className="col-xl-12 col-lg-12 col-md-12">
                              <SingleBlog />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-4 col-lg-5 col-md-8">
                     <BlogSidebar />
                  </div>
               </div>
            </div>
         </div>
      </main>
   ) : null
};

export default BlogMain;