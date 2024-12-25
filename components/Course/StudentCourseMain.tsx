import React, { useEffect, useState, useMemo } from 'react';
import CourseBar from './CourseBar';
import CourseSidebar from './CourseSidebar';
import CoursePagination from './CoursePagination';
import Link from 'next/link';
import Breadcrumb from '../Common/Breadcrumb';
import { ICourse } from '../../interfaces/course';
import { ICategory } from '../../interfaces/category';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import Preloader from '../Common/Preloader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICourseFilter } from '../../interfaces/CourseFilter';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import DOMPurify from 'isomorphic-dompurify';

const CourseMain = () => {
    const router = useRouter();
    const [data, setData] = useState([])
    const [fullData, setFullData] = useState(null)
    const [wishlistData, setWishlistData] = useState([])
    const [sectionData, setSectionData] = useState({})
    const [categoriesData, setCategoriesData] = useState({})
    const [pageData, setPageData] = useState({})
    const [page, setPage] = useState(1)
    const [cats, setCats] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [search, setSearch] = useState('');
    const searchVal = router.query.search;
    const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
    const bearerToken = storage.getItem(LOCAL_STORAGE_KEYS.APP_TOKEN);
    const [tempFilter, setTempFilter] = useState({
        cats: [],
        selectedRating: '',
        selectedPrice: '',
        search: ''
    });

    const validationSchema = useMemo(
        () =>
            yup.object({

            }),
        [],
    );

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<ICourseFilter>({
        resolver: yupResolver(validationSchema),
    });

    const handleCourseFilter = async (currentPage = 1, useTempFilter = false) => {
        useTempFilter = false; // always use main filters
        if(!UserObj?.id) return;
        const params = {
            categories: (useTempFilter ? tempFilter.cats : cats).toString(),
            keyword: useTempFilter ? tempFilter.search : search,
            rating: useTempFilter ? tempFilter.selectedRating : selectedRating,
            page: String(currentPage)
        }
        
        setPage(currentPage);
        if(!useTempFilter) {
            setTempFilter({
                cats,
                search,
                selectedRating,
                selectedPrice
            });
        } else {
            setCats(tempFilter.cats);
            setSearch(tempFilter.search);
            setSelectedRating(tempFilter.selectedRating);
            setSelectedPrice(tempFilter.selectedPrice);
        }

        fetch(`${process.env.APP_BACK_END_URL}/users/search-courses?${new URLSearchParams(params)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
        })
            .then(response => response.json())
            .then(response => courseFilterResponse(response))
            .catch(err => console.error(err))
    };

    const courseFilterResponse = (response: any) => {
        // console.log('return daata!');
        // console.log(response.data);
        if (response.data) {
            setData(response.data?.data);
            setFullData(response.data);
        }
    }

    const checkCatsPref = (catId: number) => {
        let newCats = [...cats, catId];
        setCats(newCats);
        setValue('cats', (newCats.toString()));
    }

    const uncheckCatsPref = (catId: number) => {
        let newCats = cats.filter(option => option !== catId);
        setCats(newCats);
        setValue('cats', (newCats.toString()));
    }

    const checkPricePref = (price: string) => {
        setSelectedPrice(price);
        setValue('price', price);
    }

    const checkRatingPref = (rating: string) => {
        setSelectedRating(rating);
        setValue('rating', rating);
    }

    const searchPref = (search: string) => {
        setSearch(search);
        setValue('search', search);
    }

    const pageRef = (currentPage: number) => {
        setPage(currentPage);
        setValue('page', currentPage);
        handleCourseFilter(currentPage, true);
    }

    const getAllCourses = () => {
        fetch(
            `${process.env.APP_BACK_END_URL}/users/courses`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerToken}`,
                }
            }
        )
            .then(response => response.json())
            .then((response) => {
                setData(response.data?.data);
                setFullData(response.data);
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/course`,
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

        if(UserObj?.id) {
            fetch(
                `${process.env.APP_BACK_END_URL}/users/categories`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${bearerToken}`,
                    }
                }
            )
                .then(response => response.json())
                .then((response) => {
                    setCategoriesData(response.data);
                })
                .catch(err => console.error(err))
        }
    }, [])

    useEffect(() => {
        if(!UserObj?.id) return;

        if(cats?.length || selectedRating) {
            handleCourseFilter();
        } else {
            getAllCourses();
        }
    }, [cats, selectedRating, UserObj?.id]);

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': "Vào học",
            'sub_title': res.data.site_courses_sub_title,
            'image': res.data.site_courses_banner_image,
            'description': res.data?.site_courses_description,
            'keywords': res.data?.site_courses_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }

    const submitCourseForm = (e) => {
        setPageData([]);
        handleCourseFilter();
    }

    if (!pageData) return <Preloader />

    return typeof data !== 'undefined' && data !== null ? (
        <main>
            <Breadcrumb pageData={pageData} />

            <CourseBar searchVal={searchVal ?? ""} totalCourse={data.length} searchPref={searchPref} sectionData={sectionData} submitCourseForm={submitCourseForm} />
            <section className="course-content-area pb-90">
                <form onSubmit={() => handleCourseFilter()} autoComplete='off'>
                    <input type="hidden"
                        name="cats"
                        value={(cats.toString())}
                        {...register('cats')} />
                    <input type="hidden"
                        name="rating"
                        value={selectedRating}
                        {...register('rating')} />
                    <input type="hidden"
                        name="price"
                        value={selectedPrice}
                        {...register('price')} />
                    <input type="hidden"
                        name="search"
                        value={search}
                        {...register('search')} />
                    <input type="hidden"
                        name="page"
                        value={page}
                        {...register('page')} />
                    <div className="container">
                        <div className="row mb-10">
                            <div className="col-xl-3 col-lg-4 col-md-12">
                                <CourseSidebar checkCatsPref={checkCatsPref} uncheckCatsPref={uncheckCatsPref} checkRatingPref={checkRatingPref} checkPricePref={checkPricePref} cats={cats} selectedRating={selectedRating} selectedPrice={selectedPrice} sectionData={sectionData} categoriesData={categoriesData} />
                            </div>
                            <div className="col-xl-9 col-lg-8 col-md-12">
                                <div className="row">
                                    {data && data.map?.((course: ICourse) => (
                                        <div key={uuidv4()} className="col-xl-4 col-lg-6 col-md-6">
                                            <div className="protfolio-course-2-wrapper mb-30">
                                                <div className="student-course-img">
                                                    <Link href={`/course/${course.slug}`} legacyBehavior><a><img src={getImage(course.image_url)} alt="course-img" /></a></Link>
                                                </div>
                                                <div className="course-cart">
                                                    <div className="course-info-wrapper">
                                                        <div className="cart-info-body">
                                                            <div className='cart-info-body-categories'>
                                                                {course.categories && course.categories.map((cat: ICategory) => (
                                                                    <span key={cat.title} className={`category-color category-color-1 ${cat.slug}`}>
                                                                        <Link href={`/category/${cat.slug}`} legacyBehavior><a>{cat.title}</a></Link>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <Link href={`/course/${course.slug}`} legacyBehavior><a><h3>{course.title}</h3></a></Link>
                                                            <div className="cart-lavel">
                                                                <h5>Độ khó: <span>{course.level}</span></h5>
                                                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.teaser) }} />
                                                            </div>
                                                            <div className="course-action">
                                                                <Link href={`/course/${course.slug}`} legacyBehavior><a className="view-details-btn">Xem chi tiết</a></Link>
                                                                <Link href={`/my-wishlist?cid=${course.id}`} legacyBehavior><a>
                                                                    <button className={`wishlist-btn ${(wishlistData[course.id] && wishlistData[course.id].includes(UserObj?.id) == true) ? 'w-added' : ''}`}><i className="flaticon-like"></i></button>
                                                                </a></Link>
                                                                <Link href={`/course/${course.slug}`} legacyBehavior><a className="c-share-btn"><i className="flaticon-previous"></i></a></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="portfolio-course-2-content">
                                                    <div className="portfolio-course-wrapper">
                                                        <div className="portfolio-price">
                                                            {course.price !== "Free" && <span>{course.money_sign}{course.price}</span>}
                                                            {course.price == "Free" && <span>{course.money_sign}{course.price}</span>}
                                                            {course.discount && <del>{course.money_sign}{course?.discount}</del>}
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
                                                        <i className="fal fa-signal mr-10"></i><span>{course.level?.substring(0, 20)} {course.level?.length > 20 ? `...` : ''}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {!data?.length && <div>Không có dữ liệu</div>}
                                </div>
                                {
                                    fullData && 
                                    <CoursePagination
                                        onPageChange={page => pageRef(page)}
                                        totalCount={fullData?.total}
                                        currentPage={fullData?.current_page}
                                        pageSize={fullData?.per_page}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    ) : null
};

export default CourseMain;