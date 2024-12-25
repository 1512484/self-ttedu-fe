import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IBlog } from '../../interfaces/blog';
import formatDate from '../../helpers/formatDate';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'isomorphic-dompurify';

const BlogSection = () => {
    const [data, setData] = useState([])
    interface iSectionDataType {
        home_03_insta_images_titles_news_title : string;
     };
    const [sectionData, setSectionData] = useState<iSectionDataType>()
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/blogs/list`,
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
                setData(response.data);
            })
            .catch(err => console.error(err))

        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-03/insta-images-more-titles`,
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
                setSectionData(response.data);
            })
            .catch(err => console.error(err))
    }, [])

    return typeof data !== 'undefined'  &&  data !== null && sectionData?.home_03_insta_images_titles_news_title !== 'undefined' ? (
        <div className="blog-area pt-110 pb-90">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 text-center">
                        {sectionData?.home_03_insta_images_titles_news_title && (
                            <div className="section-title mb-50">
                                <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sectionData?.home_03_insta_images_titles_news_title) }} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    {data && data.slice(5, 8).map((blog: IBlog) => (
                        <div className="col-xl-4 col-lg-4 col-md-6" key={uuidv4()}>
                            <div className="blog-wrapper position-relative mb-30">
                                <div className="blog-thumb ">
                                    <Link href={`/blog/${blog.slug}`} legacyBehavior><a><img src={getImage(blog.image)} alt="img" /></a></Link>
                                </div>
                                <Link href={`/category/${blog?.category.slug}`} legacyBehavior><a className="blog-tag"><i className="fal fa-folder-open"></i>{blog?.category.title}</a></Link>
                                <div className="blog-content-wrapper">
                                    <div className="blog-meta">
                                        <div className="blog-date">
                                            <i className="flaticon-calendar"></i>
                                            {
                                                blog.created_at && <span>{formatDate(blog.created_at)}</span>
                                            }
                                        </div>
                                        <div className="blog-user">
                                            <i className="flaticon-avatar"></i>
                                            <span>
                                                <Link href={`/instructor/${blog?.author.slug}`} legacyBehavior><a>{blog?.author.salute_name + ' ' + blog?.author.titel_name + ' ' + blog?.author.first_name + ' ' + blog?.author.last_name}</a></Link>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="blog-content">
                                        <Link href={`/blog/${blog.slug}`} legacyBehavior><a>
                                            <h3>{blog.title}</h3>
                                        </a></Link>
                                        <Link href={`/blog/${blog.slug}`} legacyBehavior><a className="blog-btn">Read more</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null
};

export default BlogSection;