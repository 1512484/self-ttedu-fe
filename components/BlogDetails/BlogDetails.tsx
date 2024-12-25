import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BlogSidebar from '../Blog/BlogSidebar';
import { IBlog } from '../../interfaces/blog';
import { IPageData } from '../../interfaces/pageData';
import getImage from '../../helpers/getImage';
import formatDate from '../../helpers/formatDate';
import DOMPurify from 'isomorphic-dompurify';

const BlogDetails = () => {
    const router = useRouter();
    const [data, setData] = useState<IBlog>()
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState<IPageData>()
    const slug = router.query.slug;

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/blogs/details?slug=${slug}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .then((response) => {
                if (response?.data?.title) {
                    setData(response.data);
                }
                else {
                    router.push('/404');
                }
            })
            .catch(err => console.error(err))

        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/blog-details?slug=${slug}`,
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
    }, [slug])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': res.data?.site_blog_details_title,
            'sub_title': res.data?.site_blog_details_sub_title,
            'image': res.data?.site_blog_details_banner_image,
            'description': res.data?.site_blog_details_description,
            'keywords': res.data?.site_blog_details_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }

    return typeof data?.title !== 'undefined' ? (
        <main>
            {data && (
                <>
                    <div className="hero-arera course-item-height" style={{ background: `url(${getImage(pageData?.image)})` }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className='hero-breadcrumb-wrapper'>
                                        <div className="hero-course-1-text">
                                            <h2>{data.title}</h2>
                                        </div>
                                        <div className="course-title-breadcrumb">
                                            <nav>
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item"><Link href="/" legacyBehavior><a>Blog</a></Link></li>
                                                    <li className="breadcrumb-item"><span>{data.title}</span></li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="blog-area pt-120 pb-90">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-lg-12">
                                    <div className="blog-main-wrapper mb-0">
                                        <div className="row">
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="blog-wrapper position-relative blog-details-wrapper mb-30">
                                                    <div className="blog-thumb ">
                                                        <img src={getImage(data.image)} alt="blog-img" />
                                                    </div>
                                                    <div className="blog-tag">
                                                        <Link href={`/category/${data?.category?.slug}`} legacyBehavior><a><i className="fal fa-folder-open"></i> {data?.category?.title}</a></Link>
                                                    </div>
                                                    <div className="blog-content-wrapper">
                                                        <div className="blog-meta">
                                                            <div className="blog-date">
                                                                <i className="flaticon-calendar"></i>
                                                                {
                                                                    data.created_at && <span>{formatDate(data.created_at)}</span>
                                                                }
                                                            </div>
                                                            <div className="blog-user">
                                                                <i className="flaticon-avatar"></i>
                                                                <span>
                                                                    <Link href={`/blog/${data?.author?.slug}`} legacyBehavior><a>{data?.author?.salute_name + ' ' + data?.author?.titel_name + ' ' + data?.author?.first_name + ' ' + data?.author?.last_name}</a></Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="blog-content">
                                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-8 col-md-8">
                                    <BlogSidebar />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    ) : null
};

export default BlogDetails;