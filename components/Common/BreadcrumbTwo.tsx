import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import getImage from '../../helpers/getImage';

const BreadcrumbTwo = (settingData) => {
   return typeof settingData?.pageData.title !== 'undefined' ? (
      <>
         <Head>
            <title>{settingData.pageData.title}</title>
            <meta name="description" content={settingData.pageData.description} />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <div className="banner-area faq position-relative">
            <div className="banner-img">
               <img src={getImage(settingData?.pageData.image)} alt="image not found" />
            </div>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="course-title-breadcrumb breadcrumb-top">
                     <nav>
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item white-color"><Link href="/" legacyBehavior><a>Trang chủ</a></Link></li>
                           <li className="breadcrumb-item">{settingData.pageData.sub_title}</li>
                        </ol>
                     </nav>
                  </div>
                  <div className="col-xl-8">
                     <div className="banner-tiitle-wrapper text-center">
                        <div className="banner-tittle">
                           <h2>{settingData.pageData.title}</h2>
                        </div>
                        <div className="banner-search-box">
                           <form action="#">
                              <div className="slider-faq-search">
                                 <input type="text" placeholder="Search courses..." />
                                 <button type="submit"><i className="fal fa-search"></i></button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   ) : null;
};

export default BreadcrumbTwo;