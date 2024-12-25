import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ModalVideo from 'react-modal-video';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import { IClassroom } from '../../interfaces/classroom';
const CourseDetailsSidebar = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openVideoModal = () => setIsOpen(!isOpen);

    useEffect(() => {
        const header = document?.getElementById("header-five");

        if (!header) return;

        if (isOpen) {
            header.style.position = "unset";
            header.style.display = "unset";
        } else {
            header.style.position = "sticky";
            header.style.display = "flex";
        }
    }, [isOpen]);

    return (
        <>
            {data && (
                <div className="course-video-widget">
                    <div className="course-widget-wrapper mb-30">
                        <ModalVideo channel='youtube' isOpen={isOpen} videoId='vWLcyFtni6U' onClose={() => { openVideoModal(); }} />
                        <div className="course-video-thumb w-img">
                            <img src={getImage(data.image_url)} alt="img not found" />
                            <div className="sidber-video-btn">
                                <span className="popup-video" onClick={() => { openVideoModal(); }}><i className="fas fa-play"></i></span>
                            </div>
                        </div>
                        {data.price != 0 && <div className="course-video-price">
                            {data.price !== "Free" && <span>{data.money_sign}{data.price}</span>}
                            {data.price == "Free" && <span>{data.money_sign}{data.price}</span>}
                            {data.discount !== 0 && <del>{data.money_sign}{data?.discount}</del>}
                        </div>}
                        <div className="course-video-body">
                            <ul>
                                <li>
                                    <div className="course-vide-icon">
                                        <i className="flaticon-filter"></i>
                                        <span>Độ khó</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{data.level}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="course-vide-icon">
                                        <i className="flaticon-computer"></i>
                                        <span>Video bài giảng</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{data.lessons.length} {data.lessons.length > 1 ? "Bài" : "Bài"}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="course-vide-icon">
                                        <i className="flaticon-menu-1"></i>
                                        <span>Số tín chỉ</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{data.credit} {data.credit > 1 ? "Điểm" : "Điểm"}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="course-vide-icon">
                                        <i className="flaticon-clock"></i>
                                        <span>Thời gian</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>{data.duration}</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="course-vide-icon">
                                        <i className="flaticon-menu-2"></i>
                                        <span>Danh mục</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <div className='cart-info-body-categories'>
                                            {data.categories && data.categories.map((category: any) => (
                                                <span key={uuidv4()} className={`${category.slug}`}>
                                                    <Link href={`/category/${category.slug}`} legacyBehavior><a>{category.title}</a></Link>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                                {data.language != '' &&
                                    <li>
                                        <div className="course-vide-icon">
                                            <i className="flaticon-global"></i>
                                            <span>Ngôn ngữ</span>
                                        </div>
                                        <div className="video-corse-info">
                                            <span>{data.language}</span>
                                        </div>
                                    </li>}
                                {/* <li>
                                    <div className="course-vide-icon">
                                        <i className="flaticon-bookmark-white"></i>
                                        <span>Access</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>Full Lifetime</span>
                                    </div>
                                </li> */}
                                {/* <li>
                                    <div className="course-vide-icon">
                                        <i className="flaticon-award"></i>
                                        <span>Chứng chỉ</span>
                                    </div>
                                    <div className="video-corse-info">
                                        <span>Có </span>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                        {data.classrooms && data.classrooms.map((classroom: IClassroom) => (
                            <div className="video-wishlist mb-0" key={uuidv4()}>
                                <Link href={`/class/${classroom.slug}`} legacyBehavior><a className="video-cart-btn"><i className="fal fa-shopping-cart"></i>Start Course</a></Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
};

export default CourseDetailsSidebar;