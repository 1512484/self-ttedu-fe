import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IBlog } from '../../interfaces/blog';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';
import formatDate from '../../helpers/formatDate';
import SidebarCategory from './SidebarCategory';

const BlogSidebar = () => {

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

    return typeof data !== 'undefined' && data !== null ? (
        <>
            {data && (
                <div className="sidebar-widget-wrapper">
                    <div className="sidebar__search p-relative mb-30">
                        <form action="#">
                            <input type="text" placeholder="Tìm kiếm khoá học..." />
                            <button type="submit">
                                <i className="far fa-search"></i>
                            </button>
                        </form>
                    </div>
                    <div className="sidebar__widget mb-30">
                        <div className="sidebar__widget-head mb-35">
                            <h4 className="sidebar__widget-title">Tin tức gần đây</h4>
                        </div>
                        <div className="sidebar__widget-content">
                            <div className="rc__post-wrapper">
                                {data && data.slice(5, 8).map((blog: IBlog) => (
                                    <div className="rc__post d-flex align-items-center" key={uuidv4()}>
                                        <div className="rc__thumb mr-20">
                                            <Link href={`/blog/${blog.slug}`} legacyBehavior>
                                                <a><img src={getImage(blog.image)} alt="" /></a>
                                            </Link>
                                        </div>
                                        <div className="rc__content">
                                            <div className="rc__meta">
                                                {
                                                    blog.created_at && <span>{formatDate(blog.created_at)}</span>
                                                }
                                            </div>
                                            <h6 className="rc__title">
                                                <Link href={`/blog/${blog.slug}`} legacyBehavior>
                                                    <a>{blog.title.substring(0, 35)} {blog.title.length > 35 ? `...` : ''}</a>
                                                </Link>
                                            </h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <SidebarCategory />
                </div>
            )}
        </>
    ) : null
};

export default BlogSidebar;