import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ICourse } from "../../interfaces/course";
import { ILesson } from "../../interfaces/lesson";
import Preloader from '../Common/Preloader';
import { v4 as uuidv4 } from 'uuid';
import getImage from "../../helpers/getImage";
import Link from "next/link";
import DOMPurify from 'isomorphic-dompurify';
declare global {
    interface Window {
        MathJax: {
            typesetPromise?: () => Promise<void>;
            startup?: { defaultReady?: () => void };
        };
    }
}

const LessonDetailsMain = () => {
    const router = useRouter();
    const [courseData, setCourseData] = useState<ICourse>();
    const [lessons, setLessons] = useState<Array<ILesson>>([]);
    const [data, setData] = useState<ILesson>();
    const [prevData, setPrevData] = useState<ILesson>();
    const [nextData, setNextData] = useState<ILesson>();
    const [children, setChildren] = useState<Array<ILesson>>();
    const courseSlug = router.query.courseSlug;
    const slug = router.query.slug;
    const [isLoading, setLoading] = useState(true);
    // const [testData, setTestData] = useState();

    const getData = async () => {
        if (!courseSlug || !slug) return;

        setLoading(true);
        let response: any = await fetch(
            `${process.env.APP_BACK_END_URL}/courses/details?slug=${courseSlug}`,
            {
                next: { revalidate: 300 },
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .catch(err => console.error(err));

        response = await response.json();

        if (!response?.data) return router.push('/404');

        setCourseData(response.data);

        const lessonsResponse = await fetch(
            `${process.env.APP_BACK_END_URL}/lessons/by-course?courseId=${response.data.id}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .catch(err => console.error(err));

        setLoading(false);

        setLessons(lessonsResponse.data);
        if (!lessonsResponse?.data?.length) return;

        const lessonIndex = lessonsResponse.data.findIndex(_lesson => _lesson.slug === slug);
        setData(lessonsResponse.data[lessonIndex]);
        setChildren(lessonsResponse.data[lessonIndex]?.children || []);

        setPrevData(lessonIndex > 0 ? lessonsResponse.data[lessonIndex - 1] : null);
        setNextData(lessonIndex < lessonsResponse.data.length - 1 ? lessonsResponse.data[lessonIndex + 1] : null);
    }

    useEffect(() => {
        getData();
    }, [courseSlug, slug]);

    useEffect(() => {
        resize();
        sticky();
        window.addEventListener('scroll', sticky);
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('scroll', sticky);
            window.removeEventListener('resize', resize);
        };
    });

    const CONTAINER_MAX_WIDTH = 1320;
    const SIDEBAR_VISIBLE_WINDOW_WIDTH = 1700;
    const LESSON_MARGIN_TOP = 60;

    const sticky = () => {
        const lessonSidebar = document.querySelector(".lesson-sidebar") as HTMLDivElement;
        const lessonRightSidebar = document.querySelector(".lesson-sidebar-right") as HTMLDivElement;
        const lessonDetail = document.querySelector(".lesson-sidebar + div") as HTMLDivElement;
        const footer = document.querySelector("footer");
        const header = document.querySelector("header");
        if (!lessonSidebar || !header || !lessonDetail || !footer || !lessonRightSidebar) return;

        if (
            lessonDetail.getBoundingClientRect().top <= header.clientHeight - LESSON_MARGIN_TOP &&
            window.innerWidth >= SIDEBAR_VISIBLE_WINDOW_WIDTH &&
            Math.floor(lessonSidebar.clientHeight + LESSON_MARGIN_TOP) !== Math.floor(lessonDetail.clientHeight)
        ) {
            lessonSidebar.style.position = lessonRightSidebar.style.position = "fixed";
            lessonSidebar.style.top = lessonRightSidebar.style.top = header.clientHeight + "px";
            lessonSidebar.style.marginTop = lessonRightSidebar.style.marginTop = "0px";
            lessonDetail.style.marginLeft = "auto";
        } else {
            lessonSidebar.style.position = lessonRightSidebar.style.position = "static";
            lessonSidebar.style.marginTop = lessonRightSidebar.style.marginTop = LESSON_MARGIN_TOP + "px";
            if (window.innerWidth >= SIDEBAR_VISIBLE_WINDOW_WIDTH) {
                lessonDetail.style.marginLeft = "-16px";
            }
        }

        if (footer.getBoundingClientRect().top + 65 < window.innerHeight) {
            lessonSidebar.style.bottom = lessonRightSidebar.style.bottom = window.innerHeight - footer.getBoundingClientRect().top + 65 + "px";
            lessonSidebar.style.top = lessonRightSidebar.style.top = "unset";
        }
    };

    const resize = () => {
        const lessonSidebar = document.querySelector(".lesson-sidebar") as HTMLDivElement;
        const lessonRightSidebar = document.querySelector(".lesson-sidebar-right") as HTMLDivElement;
        const lessonDetail = document.querySelector(".lesson-sidebar + div") as HTMLDivElement;
        const header = document.querySelector("header");
        if (!lessonSidebar || !header || !lessonDetail || !lessonRightSidebar) return;

        lessonSidebar.style.width = lessonRightSidebar.style.width = (window.innerWidth - CONTAINER_MAX_WIDTH) / 2 + "px";
        lessonSidebar.style.height = lessonRightSidebar.style.height = (window.innerHeight - header.clientHeight) + "px";
        lessonSidebar.style.left = "0px";
        lessonRightSidebar.style.right = "0px";

        if (window.innerWidth >= SIDEBAR_VISIBLE_WINDOW_WIDTH) {
            lessonDetail.style.marginLeft = "-16px";
            lessonSidebar.style.display = lessonRightSidebar.style.display = "block";
        } else {
            lessonDetail.style.marginLeft = "auto";
            lessonSidebar.style.display = lessonRightSidebar.style.display = "none";
        }

        const activeLesson = document.querySelector(".lessons-item.active") as HTMLDivElement;
        const sidebarScrollContent = document.querySelector(".lesson-sidebar > div");
        if (!activeLesson || !sidebarScrollContent) return;

        sidebarScrollContent.scrollTop = activeLesson.offsetTop;
    }

    useEffect(() => {
        const mathjaxConfigScript = document.createElement('script');
        mathjaxConfigScript.type = 'text/x-mathjax-config';
        mathjaxConfigScript.innerHTML = `
            MathJax.Ajax.config.path["mhchem"] = "https://cdnjs.cloudflare.com/ajax/libs/mathjax-mhchem/3.3.2";
            MathJax.Hub.Config({
                showMathMenu: false,
                messageStyle: "none",
                SVG: {
                    scale: 120,
                    linebreaks: {
                        automatic: true
                    }
                },
                "HTML-CSS": { linebreaks: { automatic: true } },
                CommonHTML: { linebreaks: { automatic: true } },
                tex2jax: {
                    inlineMath: [ ['$','$'], ["\\\\(","\\\\)"], ["\\(","\\)"] ]
                },
                TeX: {extensions: ["[mhchem]/mhchem.js"]},
            });
        `;
        document.head.appendChild(mathjaxConfigScript);

        // Tải MathJax từ CDN
        const mathjaxScript = document.createElement('script');
        mathjaxScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-MML-AM_CHTML';
        mathjaxScript.async = true;

        mathjaxScript.onload = () => {
            console.log('MathJax loaded successfully.');
        };

        mathjaxScript.onerror = () => {
            console.error('Failed to load MathJax script.');
        };

        document.head.appendChild(mathjaxScript);

        // Cleanup khi component bị unmount
        return () => {
            document.head.removeChild(mathjaxConfigScript);
            document.head.removeChild(mathjaxScript);
        };
    }, []);

    useEffect(() => {
        if (isLoading) return;

        if (window.MathJax) {
            console.log('MathJax typesetting...');
            //@ts-ignore
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        } else {
            console.error('MathJax is not defined after loading.');
        }
    }, [isLoading]);

    // useEffect(() => {
    //     if (!testData) return;

    //     if (window.MathJax) {
    //         console.log('MathJax typesetting...');
    //         //@ts-ignore
    //         MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    //     } else {
    //         console.error('MathJax is not defined after loading.');
    //     }
    // }, [testData]);

    // const showFile = async (e) => {
    //     e.preventDefault()
    //     const reader = new FileReader()
    //     reader.onload = async (e) => { 
    //       const text = (e.target.result)
    //       console.log(text)
    //       setTestData(text as any);
    //     };
    //     reader.readAsText(e.target.files[0])
    // }

    if (isLoading) return <Preloader />

    return (
        <main className="lesson-details-main">
            {/*<input type="file" onChange={(e) => showFile(e)} />*/}
            <div className="hero-arera course-item-height" style={{ background: `url(${getImage("images/course_1/1O4R8afYmMs8eQ1WYZXTglnxnd2inesEIUpZXdiH.jpg")})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className='hero-breadcrumb-wrapper'>
                                <div className="hero-course-1-text">
                                    <h2>Chi tiết bài học</h2>
                                </div>
                                <div className="course-title-breadcrumb">
                                    <nav>
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link href="/courses" legacyBehavior><a>Khoá học</a></Link></li>
                                            <li className="breadcrumb-item"><Link href={`/course/${courseSlug}`} legacyBehavior><a>{courseData?.title}</a></Link></li>
                                            <li className="breadcrumb-item"><span>{data?.title}</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                data && <section className="course-detalis-area d-flex">
                    {
                        lessons?.length &&
                        <div className="lesson-sidebar">
                            <div className="h-100 overflow-auto lessons">
                                {
                                    lessons?.map((lesson, index) => (
                                        <Link
                                            key={index}
                                            href={`/lesson/${courseSlug}/${lesson.slug}`}
                                            legacyBehavior
                                        >
                                            <a className={`d-block p-3 border-bottom lessons-item ${lesson.slug === slug && 'active'}`}>
                                                {lesson.title}
                                            </a>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    }
                    <div className="container">
                        <div className="course-detalis-wrapper mb-30">
                            <div className="course-heading mb-20">
                                <h2>{data.title}</h2>
                            </div>
                            <div className="">
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content_data) }} />
                                {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testData) }} /> */}
                            </div>
                        </div>

                        {
                            data?.document_url &&
                            <div className="pdf-viewer">
                                <object
                                    width="100%"
                                    height="800"
                                    data={data.document_url.includes('http') ? data.document_url : getImage(data.document_url)}
                                    type="application/pdf"
                                ></object>
                            </div>
                        }
                    </div>
                    <div className="lesson-sidebar-right">
                        <div className="h-100 overflow-auto">
                            <div className="banner">
                                <img
                                    src="/assets/img/slider/hero-3.jpg"
                                    alt="Lesson Right Sidebar Banner"
                                    title="Lesson Right Sidebar Banner"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            }

            <div className="container">
                <div className="course-curriculam-accodion course-detalis-wrapper mb-30 px-30">
                    <div className="accordion" id="accordionExample">
                        {children && children.map((curriculam: ILesson, lCount: number) => (
                            <div className="accordion-item" key={uuidv4()}>
                                <div className="accordion-body" id={`heading-${lCount}`}>
                                    <button className={`accordion-button collapsed`} type="button" data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${lCount}`} aria-expanded="true"
                                        aria-controls={`collapse-${lCount}`}>
                                        <span className="accordion-header">
                                            <span className="accordion-tittle">
                                                <span>{lCount + 1}. {curriculam.title}</span>
                                            </span>
                                        </span>
                                    </button>
                                </div>
                                <div id={`collapse-${lCount}`} className={`accordion-collapse collapse p-4`}
                                    aria-labelledby={`heading-${lCount}`} data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(curriculam.content_data) }} />

                                        {
                                            curriculam?.document_url &&
                                            <object
                                                width="100%"
                                                height="800"
                                                data={curriculam.document_url.includes('http') ? curriculam.document_url : getImage(curriculam.document_url)}
                                                type="application/pdf"
                                            ></object>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="navigator-wrapper course-detalis-wrapper">
                    <div>
                        {
                            prevData && <Link href={`/lesson/${courseSlug}/${prevData.slug}`} legacyBehavior>
                                <a className="navigator prev">
                                    <span className="title">
                                        <i className="fa fa-arrow-circle-left"></i>
                                        Bài học trước
                                    </span>
                                    <span className="subtitle">{prevData.title}</span>
                                </a>
                            </Link>
                        }
                    </div>
                    <div>
                        {
                            nextData && <Link href={`/lesson/${courseSlug}/${nextData.slug}`} legacyBehavior>
                                <a className="navigator next">
                                    <span className="title">
                                        Bài học tiếp theo
                                        <i className="fa fa-arrow-circle-right"></i>
                                    </span>
                                    <span className="subtitle">{nextData.title}</span>
                                </a>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}

export default LessonDetailsMain;