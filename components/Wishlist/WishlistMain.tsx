import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '../Common/Breadcrumb';
import { v4 as uuidv4 } from 'uuid';
import { ICourse } from '../../interfaces/course';
import storage from 'local-storage-fallback';
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import getImage from '../../helpers/getImage';
import { useRouter } from "next/router";
import DOMPurify from 'isomorphic-dompurify';

const WishlistMain = () => {
    const router = useRouter();
    interface iSectionDataType {
        site_wishlist_title: string
        site_wishlis_sub_title: string
        site_wishlis_description: string
        site_wishlis_keywords: string
        site_wishlis_banner_image: string
    };
    const [pageData, setPageData] = useState({})
    const [sectionData, setSectionData] = useState<iSectionDataType>()
    const [data, setData] = useState([])
    const cid = router.query.cid;
    const saveStatusMessage = router.query.success;
    const unfollowMessage = router.query.unfollow;
    
    useEffect(() => {
        const userObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
        if(userObj ==  null)
        {
            router.push('/login');
        }
        else 
        {
            const bearerToken = storage.getItem(LOCAL_STORAGE_KEYS.APP_TOKEN);
            const userId = userObj?.id ?? "";
            // save user wishlist data
            if(cid)
            {
                fetch(
                    `${process.env.APP_BACK_END_URL}/users/wishlist-save?user_id=${userId}&cid=${cid}`,
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
                        if(response.unfollow) {
                            router.push('/my-wishlist?unfollow=true');
                        }
                        else {
                            router.push('/my-wishlist?success=true');
                        }
                    })
                    .catch(err => console.error(err))
            }

            // Get page setting data
            fetch(
                `${process.env.APP_BACK_END_URL}/setting/inner-page/wishlist`,
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
                    setPageData({
                        'title': response.data?.site_wishlist_title,
                        'sub_title': response.data?.site_wishlis_sub_title,
                        'image': response.data?.site_wishlis_banner_image,
                        'description': response.data?.site_wishlis_description,
                        'keywords': response.data?.site_wishlis_keywords,
                        'url': process.env.APP_BASE_URL
                    });
                })
                .catch(err => console.error(err))

            // Fetching user wishlist data
            fetch(
                `${process.env.APP_BACK_END_URL}/users/wishlist?user_id=${userId}`,
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
                    console.log(response.data);
                })
                .catch(err => console.error(err))
        }
    }, [cid])

    return typeof data !== 'undefined'  &&  data.length !== null ? (
        <main>
            <Breadcrumb pageData={pageData} />
            <div className="course-details-area pt-120 pb-100">
                <div className="container">
                {saveStatusMessage && (
                    <div
                        className={`font-medium text-sm text-green-600 mb-30`}>
                        Successfully save wishlist.
                    </div>
                )}
                {unfollowMessage && (
                    <div
                        className={`font-medium text-sm text-green-600 mb-30`}>
                        Removed from wishlist.
                    </div>
                )}
                {data && (
                    <div className="row">
                        {data && data.map((course: ICourse) => (
                            <div key={uuidv4()} className="col-xxl-3 col-lg-4 col-md-6">
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
                                                    <Link href={`/my-wishlist?cid=${course.id}`} legacyBehavior><a>
                                                        <button className="wishlist-btn w-added"><i className="flaticon-like"></i></button>
                                                    </a></Link>
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
                </div>
            </div>
        </main>
    ) : null
};

export default WishlistMain;