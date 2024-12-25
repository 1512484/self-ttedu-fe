import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IBlog } from '../../interfaces/blog';
import formatDate from "../../helpers/formatDate"
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import Preloader from '../Common/Preloader';
import DOMPurify from 'isomorphic-dompurify';

const SingleBlog = () => {
    const [data, setData] = useState([])
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
    }, [])

    if (!data) return <Preloader />

    return typeof data[0] !== 'undefined' ? (
        <>
            {data && data.map((blog: IBlog) => (
                <div className="blog-wrapper position-relative mb-30" key={uuidv4()}>
                    <div className="blog-thumb ">
                        <Link href={`/blog/${blog.slug}`} legacyBehavior><a><img src={getImage(blog.image)} alt="blog-img" /></a></Link>
                    </div>
                    <Link href={`/category/${blog?.category?.slug}`} legacyBehavior><a className="blog-tag"><i className="fal fa-folder-open"></i>{blog?.category?.title}</a></Link>
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
                                <Link href={`/instructor/${blog?.author?.slug}`} legacyBehavior><a>{blog?.author?.salute_name + ' ' + blog?.author?.titel_name + ' ' + blog?.author?.first_name + ' ' + blog?.author?.last_name}</a></Link>
                                </span>
                            </div>
                        </div>
                        <div className="blog-content">
                            <Link href={`/blog/${blog.slug}`} legacyBehavior><a><h3>{blog.title}</h3></a></Link>
                            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.teaser) }} />
                            <Link href={`/blog/${blog.slug}`} legacyBehavior><a className="blog-btn">Read more</a></Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    ) : null
};

export default SingleBlog;