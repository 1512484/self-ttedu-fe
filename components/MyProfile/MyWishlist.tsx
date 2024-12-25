import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ICourse } from '../../interfaces/course';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import getImage from '../../helpers/getImage';
import storage from 'local-storage-fallback';
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import DOMPurify from 'isomorphic-dompurify';

const MyWishlist = () => {
    const [data, setData] = useState([])
    const router = useRouter();
    const slug = router.query.slug;

    useEffect(() => {
        const bearerToken = storage.getItem(LOCAL_STORAGE_KEYS.APP_TOKEN);
        fetch(
            `${process.env.APP_BACK_END_URL}/users/wishlist`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                },
            }
        )
            .then(response => response.json())
            .then((response) => {
                setData(response.data);
            })
            .catch(err => console.error(err))
    }, [slug])

    return typeof data !== 'undefined' && data !== null ? (
        <>
            {data && (
                <div className="row">
                    {data && data.map((course: ICourse) => (
                        <div key={uuidv4()} className="col-xxl-4 col-lg-6 col-md-6">
                            <div className="protfolio-course-2-wrapper mb-30">
                                <div className="student-course-img">
                                    <Link href={`/course/${course.slug}`} legacyBehavior><a><img src={getImage(course.image_url)} alt="course-img" /></a></Link>
                                </div>
                                <div className="course-cart">
                                    <div className="course-info-wrapper">
                                        <div className="cart-info-body">
                                            {course.categories && course.categories.map((cat: ICourse) => (
                                                <span key={cat.title} className="category-color category-color-1">
                                                    <Link href={`/category/${cat.slug}`} legacyBehavior><a>{cat.title}</a></Link>
                                                </span>
                                            ))}
                                            <Link href={`/course/${course.slug}`} legacyBehavior><a><h3>{course.title}</h3></a></Link>
                                            <div className="cart-lavel">
                                                <h5>Level : <span>{course.level}</span></h5>
                                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.more_info) }} />
                                                <div className='mb-30' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.teaser) }} />
                                            </div>
                                            <div className="course-action">
                                                <Link href={`/course/${course.slug}`} legacyBehavior><a className="view-details-btn">Xem chi tiết</a></Link>
                                                <button className="wishlist-btn w-added"><i className="flaticon-like"></i></button>
                                                <Link href={`/course/${course.slug}`} legacyBehavior><a className="c-share-btn"><i className="flaticon-previous"></i></a></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="portfolio-course-2-content">
                                    <div className="portfolio-course-wrapper">
                                        <div className="portfolio-price">
                                            {course.price !== "Free" && <span>${course.price}</span>}
                                            {course.price == "Free" && <span>{course.price}</span>}
                                            {course.discount && <del>${course?.discount}</del>}
                                        </div>
                                        <div className="portfolio-course-2">
                                            <h3><Link href={`/course/${course.slug}`} legacyBehavior><a>{course.title}</a></Link></h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="course-2-footer">
                                    <div className="coursee-clock">
                                        <i className="flaticon-clock"></i><span>{course.duration}</span>
                                    </div>
                                    <div className="course-creadit d-none">
                                        <i className="flaticon-menu-1"></i><span>{course.credit}</span>
                                    </div>
                                    <div className="course-network">
                                        <i className="fal fa-signal mr-10"></i><span>{course.level}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    ) : null
};

export default MyWishlist;