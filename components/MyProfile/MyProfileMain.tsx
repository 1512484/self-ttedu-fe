import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumb from '../Common/Breadcrumb';
import { ICourse } from '../../interfaces/course';
import { IStudent } from '../../interfaces/student';
import getImage from '../../helpers/getImage';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import formatDate from '../../helpers/formatDate';
import { v4 as uuidv4 } from 'uuid';
import MyWishlist from './MyWishlist';
import { ICourseReview } from '../../interfaces/courseReview';
import { IInvoice } from '../../interfaces/invoice';
import DOMPurify from 'isomorphic-dompurify';

const MyProfileMain = () => {
    const router = useRouter();
    interface iSectionDataType {
        site_student_profile_tab_dashboard_text: string;
        site_student_profile_tab_profile_text: string
        site_student_profile_tab_enroll_course_text: string
        site_student_profile_tab_wishlist_text: string
        site_student_profile_tab_review_text: string
        site_student_profile_tab_quiz_text: string
        site_student_profile_tab_order_history_text: string
        site_student_profile_tab_setting_text: string
        site_student_profile_tab_logout_text: string
        site_student_profile_banner_image: string
    };

    const [sectionData, setSectionData] = useState<iSectionDataType>()
    const [pageData, setPageData] = useState({})
    const [data, setData] = useState<IStudent>()
    const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
    const logout = () => {
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_TOKEN)
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_USER)
        storage.clear()
        router.push('/login');
    }
    if (UserObj?.id == null) {
        router.push('/login');
    }
    const slug = router.query.slug;

    useEffect(() => {
        const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/student-profile`,
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

        fetch(
            `${process.env.APP_BACK_END_URL}/student/details/from-user?userId=${UserObj.id}`,
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
                if (response.data.first_name) {
                    setData(response.data);
                }
                else {
                    router.push('/404');
                }
            })
            .catch(err => console.error(err))
    }, [slug])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': res.data.site_student_profile_title,
            'sub_title': res.data.site_student_profile_sub_title,
            'image': res.data.site_student_profile_banner_image,
            'description': res.data.site_student_profile_description,
            'keywords': res.data.site_student_profile_keywords,
        }
        setPageData(data);
    }

    return typeof data !== 'undefined' && data !== null && sectionData?.site_student_profile_tab_dashboard_text !== null ? (
        <main>
            <Breadcrumb pageData={pageData} />

            {data && (
                <div className="course-details-area pt-120 pb-100">
                    <div className="container">
                        <div className="student-profile-author pb-30">
                            <div className="student-profile-author-img">
                                <img src={getImage(data.image_url)} alt="" />
                            </div>
                            <div className="student-profile-author-text">
                                <span>Chào,</span>
                                <h3 className='student-profile-author-name'>{data.titel_name + ' ' + data.first_name + ' ' + data.last_name}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-lg-4">
                                <div className="student-profile-sidebar mb-30">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><i className="fas fa-tachometer-alt-fast"></i> {sectionData.site_student_profile_tab_dashboard_text}</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><i className="fas fa-user"></i> {sectionData.site_student_profile_tab_profile_text}</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false"><i className="fas fa-graduation-cap"></i> {sectionData.site_student_profile_tab_enroll_course_text}</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="wishlist-tab" data-bs-toggle="tab" data-bs-target="#wishlist" type="button" role="tab" aria-controls="wishlist" aria-selected="false"><i className="fas fa-bookmark"></i> {sectionData.site_student_profile_tab_wishlist_text}</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab" aria-controls="reviews" aria-selected="false"><i className="fas fa-star"></i> {sectionData.site_student_profile_tab_review_text}</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="quiz-tab" data-bs-toggle="tab" data-bs-target="#quiz" type="button" role="tab" aria-controls="quiz" aria-selected="false"><i className="fas fa-cubes"></i> {sectionData.site_student_profile_tab_quiz_text}</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false"><i className="fas fa-cart-plus"></i> {sectionData.site_student_profile_tab_order_history_text}</button>
                                        </li>

                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="setting-tab" data-bs-toggle="tab" data-bs-target="#setting" type="button" role="tab" aria-controls="setting" aria-selected="false"><i className="fas fa-cog"></i> {sectionData.site_student_profile_tab_setting_text}</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="logout-tab" data-bs-toggle="tab" data-bs-target="#logout" type="button" role="tab" aria-controls="logout" aria-selected="false" onClick={() => logout()}><i className="fas fa-sign-out-alt"></i> {sectionData.site_student_profile_tab_logout_text}</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8">
                                <div className="student-profile-content">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <h4 className='mb-25'>{sectionData.site_student_profile_tab_dashboard_text}</h4>
                                            <div className="student-profile-content-fact">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <span className='mb-25 d-block'>{data?.courses.length} Khoá học</span>
                                                        {data.courses && data.courses.map((course: ICourse) => (
                                                            <div className="inprogress-course mb-30" key={uuidv4()}>
                                                                <div className="inprogress-course-img">
                                                                    <Link href={`/course/${course.slug}`} legacyBehavior><a><img src={getImage(course.image_url)} alt="" /></a></Link>
                                                                </div>
                                                                <div className="inprogress-course-text">
                                                                    <h4 className='inprogress-course-title'><Link href={`/course/${course.slug}`} legacyBehavior><a>{course.title}</a></Link></h4>
                                                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.more_info) }} />
                                                                    <div className="academic-footers">
                                                                        <div className="coursee-clock">
                                                                            <i className="flaticon-wall-clock"></i><span>{course.duration}</span>
                                                                        </div>
                                                                        <div className="course-creadit d-none">
                                                                            <i className="flaticon-menu-1"></i><span>{course.credit} credit</span>
                                                                        </div>
                                                                        <div className="course-network">
                                                                            <i className="fal fa-signal mr-10"></i><span>{course.level}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <h4 className='mb-25'>{sectionData.site_student_profile_tab_profile_text}</h4>
                                            <ul className='student-profile-info'>
                                                {data?.user?.created_at &&
                                                    <li>
                                                        <h5>Registration Date :</h5>
                                                        <span>{formatDate(data.user.created_at)}</span>

                                                    </li>
                                                }
                                                {data?.titel_name &&
                                                    <li>
                                                        <h5>Title Name :</h5>
                                                        <span>{data.titel_name}</span>
                                                    </li>
                                                }
                                                {data?.first_name &&
                                                    <li>
                                                        <h5>First Name :</h5>
                                                        <span>{data.first_name}</span>
                                                    </li>
                                                }
                                                {data?.last_name &&
                                                    <li>
                                                        <h5>Last Name :</h5>
                                                        <span>{data.last_name}</span>
                                                    </li>
                                                }
                                                {data?.user?.email &&
                                                    <li>
                                                        <h5>Email :</h5>
                                                        <span>{data.user.email}</span>
                                                    </li>
                                                }
                                                {data?.user?.phone &&
                                                    <li>
                                                        <h5>Phone :</h5>
                                                        <span>{data.user.phone}</span>
                                                    </li>
                                                }
                                                {data?.website_url &&
                                                    <li>
                                                        <h5>Website URL :</h5>
                                                        <span>{data.website_url}</span>
                                                    </li>
                                                }
                                                {data?.fb_url &&
                                                    <li>
                                                        <h5>Facebook URL :</h5>
                                                        <span>{data.fb_url}</span>
                                                    </li>
                                                }
                                                {data?.instagram_url &&
                                                    <li>
                                                        <h5>Instagram URL :</h5>
                                                        <span>{data.instagram_url}</span>
                                                    </li>
                                                }
                                                {data?.street_address &&
                                                    <li>
                                                        <h5>Address :</h5>
                                                        <span>{data.street_address}</span>
                                                    </li>
                                                }
                                                {data?.city &&
                                                    <li>
                                                        <h5>City :</h5>
                                                        <span>{data.city}</span>
                                                    </li>
                                                }
                                                {data?.zip &&
                                                    <li>
                                                        <h5>Zip Code :</h5>
                                                        <span>{data.zip}</span>
                                                    </li>
                                                }
                                                {data?.country &&
                                                    <li>
                                                        <h5>Country :</h5>
                                                        <span>{data.country}</span>
                                                    </li>
                                                }
                                                {data?.teaser &&
                                                    <li>
                                                        <h5>Biography :</h5>
                                                        <span>{data.teaser}</span>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                            <h4 className='mb-25'>{sectionData.site_student_profile_tab_enroll_course_text}</h4>
                                            <div className="student-profile-enroll">
                                                <div className="row">
                                                    {data.courses && data.courses.map((course: ICourse) => (
                                                        <div key={uuidv4()} className="col-xxl-4 col-lg-6 col-md-6">
                                                            <div className="protfolio-course-2-wrapper mb-30">
                                                                <div className="student-course-img">
                                                                    <Link href={`/course/${course.slug}`} legacyBehavior><a><img src={getImage(course.image_url)} alt="course-img" /></a></Link>
                                                                </div>
                                                                <div className="course-cart">
                                                                    <div className="course-info-wrapper">
                                                                        <div className="cart-info-body">
                                                                            {course.categories && course.categories.map((cat: ICourse) => (
                                                                                <span key={`cat-${cat.title}`} className="category-color category-color-1">
                                                                                    <Link href={`/categories/${cat.slug}`} legacyBehavior><a>{cat.title}</a></Link>
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
                                                                                    <button className="wishlist-btn"><i className="flaticon-like"></i></button>
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
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="wishlist" role="tabpanel" aria-labelledby="wishlist-tab">
                                            <h4 className='mb-25'> {sectionData.site_student_profile_tab_wishlist_text} </h4>
                                            <div className="student-profile-wishlist">
                                                <MyWishlist />
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                            <h4 className='mb-25'>{sectionData.site_student_profile_tab_review_text}</h4>
                                            <div className="student-profile-reviews">
                                                {data.courseReviews && data.courseReviews.map((review: ICourseReview) => (
                                                    <div className="student-profile-reviews-item mb-30" key={`review-${review.id}`}>
                                                        <div className="student-profile-reviews-course-title">
                                                            <h5>{review.title}</h5>
                                                        </div>
                                                        <div className="student-profile-reviews-text">
                                                            <div className="student-profile-reviews-text-wrap mb-20">
                                                                <div className="student-profile-review-icon">
                                                                    <Link href="#" legacyBehavior><a><i className={review.rating}></i></a></Link>
                                                                </div>
                                                                <div className="student-profile-review-update">
                                                                    <button type='button' className='student-profile-review-update-btn'><i className="far fa-edit"></i> Edit</button>
                                                                    <button type='button' className='student-profile-review-update-btn'><i className="far fa-trash-alt"></i> Delete</button>
                                                                </div>
                                                            </div>
                                                            <div className="student-profile-review-content">
                                                                <p>{review.message}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="quiz" role="tabpanel" aria-labelledby="quiz-tab">
                                            <h4 className='mb-25'>{sectionData.site_student_profile_tab_quiz_text}</h4>
                                            <p>Không có kết quả</p>
                                        </div>
                                        <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                                            <h4 className='mb-25'>{sectionData.site_student_profile_tab_order_history_text}</h4>
                                            <div className="student-profile-orders-wrapper">
                                                <div className="student-profile-orders">
                                                    {data.orders && data.orders.map((history: IInvoice) => (
                                                        <div className="student-profile-order custom-height-80" key={uuidv4()}>
                                                            <div className="student-profile-order-name">
                                                                <span>{history.title}</span>
                                                            </div>
                                                            <div className="student-profile-order-price">
                                                                <span>${history.total_price}</span>
                                                            </div>
                                                            <div className="student-profile-order-duration">
                                                                <span>{history.qty}</span>
                                                            </div>
                                                            <div className="student-profile-order-status">
                                                                <span>{history.status}</span>
                                                            </div>
                                                            <div className="student-profile-order-date">
                                                                <span>{history.created_at}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="setting" role="tabpanel" aria-labelledby="setting-tab">
                                            <h4 className='mb-25'>{sectionData.site_student_profile_tab_setting_text}</h4>
                                            <div className="student-profile-enroll">
                                                <ul className="nav mb-30" id="myTab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link active" id="profileA-tab" data-bs-toggle="tab" data-bs-target="#profileA" type="button" role="tab" aria-controls="profileA" aria-selected="true">Profile</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="password-tab" data-bs-toggle="tab" data-bs-target="#password" type="button" role="tab" aria-controls="password" aria-selected="false">Password</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="completedA-tab" data-bs-toggle="tab" data-bs-target="#completedA" type="button" role="tab" aria-controls="completedA" aria-selected="false">Social</button>
                                                    </li>
                                                </ul>
                                                <div className="tab-content" id="myTabContent">
                                                    <div className="tab-pane fade show active" id="profileA" role="tabpanel" aria-labelledby="profileA-tab">
                                                        <div className="student-profile-settings">
                                                            <div className="student-profile-setting-img mb-40">
                                                                <div className="student-profile-setting-cover-img" style={{ backgroundImage: `url(${getImage(sectionData?.site_student_profile_banner_image)})` }}></div>
                                                                <div className="student-profile-setting-author-img d-none">
                                                                    <img src="assets/img/course/course-student.png" alt="" />
                                                                </div>
                                                            </div>
                                                            <form action="#">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <label htmlFor="FirstName">First Name</label>
                                                                            <input id='FirstName' type="text" placeholder="First Name" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <label htmlFor="LastName">Last Name</label>
                                                                            <input id='LastName' type="text" placeholder="Last Name" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <label htmlFor="User">User Name</label>
                                                                            <input id='User' type="text" placeholder="User Name" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <label htmlFor="Email">Email</label>
                                                                            <input id='Email' type="email" placeholder="Email" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <label htmlFor="Phone">Phone </label>
                                                                            <input id='Phone' type="text" placeholder="Phone" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <label htmlFor="Occupation">Occupation  </label>
                                                                            <input id='Occupation' type="text" placeholder="Occupation " />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <div className="contact-from-input mb-20">
                                                                            <label htmlFor="Bio">Biography  </label>
                                                                            <textarea id='Bio' placeholder="Biography"></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12">
                                                                        <div className="cont-btn mb-20 mt-10">
                                                                            <button type='button' className="cont-btn">Update Profile</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                                                        <form action="#">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="contact-from-input mb-20">
                                                                        <label htmlFor="Current">Current Password</label>
                                                                        <input id='Current' type="password" placeholder="Type password" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="contact-from-input mb-20">
                                                                        <label htmlFor="New">New Password</label>
                                                                        <input id='New' type="password" placeholder="Type password" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="contact-from-input mb-20">
                                                                        <label htmlFor="Retype">Re-type New Password</label>
                                                                        <input id='Retype' type="password" placeholder="Type password" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-12">
                                                                    <div className="cont-btn mb-20 mt-10">
                                                                        <button type='button' className="cont-btn">Update Profile</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="tab-pane fade" id="completedA" role="tabpanel" aria-labelledby="completedA-tab">
                                                        <div className="student-social-profile-link">
                                                            <span className='mb-20'>Social Profile Link</span>
                                                            <form action="#">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <input type="text" placeholder="Write Your Facebook URL" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <input type="text" placeholder="Write Your Twitter URL" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <input type="text" placeholder="Write Your Instagram URL" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="contact-from-input mb-20">
                                                                            <input type="text" placeholder="Write Your Linkedin URL" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 ">
                                                                        <div className="cont-btn mb-20 mt-10">
                                                                            <button type='button' className="cont-btn">Update Profile</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    ) : null
};

export default MyProfileMain;