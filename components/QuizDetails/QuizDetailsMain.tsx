import React, { useEffect, useReducer, useState, useMemo } from "react";
import McqQuestion from "../Questions/McqQuestion";
import HeaderQuestion from "../Questions/HeaderQuestion";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';
import { IQuiz } from "../../interfaces/quiz";
import storage from 'local-storage-fallback';
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IQuizAnswers } from "../../interfaces/quizAnswers";

const initialState = {
    isActive: true,
}

const reducer = (state: { isActive: any; }, action: any) => {
    switch (action) {
        case "writeReview":
            return {
                ...state,
                isActive: !state.isActive,
            };
        default:
            throw new Error("Unexpected action");
    }
};

const QuizDetailsMain = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [answers, setAnswers] = useState([]);
    const router = useRouter();
    const [data, setData] = useState<IQuiz>()
    const [pageData, setPageData] = useState({})
    const [studentAnswers, setStudentAnswers] = useState("")
    const [studentMultiAnswers, setStudentMultiAnswers] = useState("")
    const [shortQuestion, setShortQuestion] = useState("")
    const [fillTheBlank, setFillTheBlank] = useState("")
    const [examTime, setExamTime] = useState(90);
    const [examTimer, setExamTimer] = useState("");
    const slug = router.query.slug;
    const cid = router.query.cid;
    const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
    let timerId;
    
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
    } = useForm<IQuizAnswers>({
        resolver: yupResolver(validationSchema),
    });

    const handleQuizAnswers = async (data: IQuizAnswers) => {
        setValue('exam_time', examTime);
        setValue('mcq_question', JSON.stringify(answers));
        setValue('short_question', shortQuestion);
        setValue('fill_the_blank', fillTheBlank);
        setValue('multi_mcq_question', JSON.stringify(studentMultiAnswers));
        setValue('user_id', UserObj.id);
        const bearerToken = storage.getItem(LOCAL_STORAGE_KEYS.APP_TOKEN);
        console.log(`${process.env.APP_BACK_END_URL}/result/quiz-submit`);
        // store student quiz answers
        fetch(`${process.env.APP_BACK_END_URL}/result/quiz-submit`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(response => registerResponse(response))
            .catch(err => console.error(err))
    };

    const registerResponse = (response: any) => {
        if (response.data) {
            let resultId = response.data.quiz.id;
            let resultSlug = response.data.quiz.slug;
            router.push('/result/' + resultId + '?title=' + resultSlug);
        }
    }

    const checkAnswerPref = (msqAnswer: string, selectedAll: string, selectedName: string) => {
        const selectedArray = JSON.parse(selectedAll);
        selectedArray.map((option: any, index: number) => {
            let opt = selectedName + option,
                indx = answers.indexOf(opt)
            if(msqAnswer != opt && indx != -1) {
                answers.splice(indx, 1)
            }
        });
        answers.push(msqAnswer);
        setAnswers(answers);
    }

    useEffect(() => {
        if(UserObj?.id ==  null)
        {
            router.push('/login');
        }
        else {
            const endDate = moment(UserObj.end_at);
            const todayDate = moment(new Date());
            const diffDays = endDate.diff(todayDate, 'days');
            if(diffDays <= 0)
            {
                router.push('/membership');
            }
        }
        
        if(slug)
        {
            fetch(
                `${process.env.APP_BACK_END_URL}/quiz/details?slug=${slug}`,
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
                    if(response.data.title)
                    {
                        setData(response.data);
                        let ct = response.data.setting_data.timer_time*60;
                        setExamTime(ct);
                        startCountdown(ct);
                    }
                    else 
                    {
                        router.push('/404');
                    }
                })
                .catch(err => console.error(err))

            fetch(
                `${process.env.APP_BACK_END_URL}/setting/inner-page/course-details?slug=${slug}`,
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
        }
    }, [slug])

    const handleResponseData = (res) => {
        let data = {
            'title': res.data?.site_course_details_title,
            'sub_title': res.data?.site_course_details_sub_title,
            'image': res.data?.site_course_details_banner_image,
            'description': res.data?.site_course_details_description,
            'keywords': res.data?.site_course_details_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }

    const startCountdown = (time) => {
        timerId = setInterval(() => {
            time--;
            if( !isNaN(time) ) {
                if( time <= 0 ) {
                    clearInterval(timerId);
                }
                timeFormat(time);
                setExamTime(time);
            }
        }, 1000);
    }

    const timeFormat = (time) => {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
        minutes = minutes.toString().length === 1 ? 0 + minutes : minutes;
        seconds = seconds.toString().length === 1 ? 0 + seconds : seconds;
        setExamTimer(minutes + ':' + seconds)
    }

   // startCountdown(examTime);

   // Sticky Menu Area start
	useEffect(() => {
		window.addEventListener('scroll', sticky);
		return () => {
		   window.removeEventListener('scroll', sticky);
		};
	 });
  
	 const sticky = (e) => {
		const classSidebar = document.querySelector('.bd-class-sidebar');
		const scrollTop = window.scrollY;
		scrollTop >= 120 ? classSidebar.classList.add('sticky') : classSidebar.classList.remove('sticky');
	 };
	 // Sticky Menu Area End

    return typeof data?.title !== 'undefined' && pageData !== 'undefined' && data !== null && (data.setting_data.quiz_attempt > data.taken_quiz) ? (
        <main>
            {data && (
                <div className="bd-class-area pt-120 pb-120">
                    <form onSubmit={handleSubmit(handleQuizAnswers)} autoComplete='off'>
                        <input type="hidden"
                            name="quiz_id"
                            value={data.id}
                            {...register('quiz_id')} />
                        <input type="hidden"
                            name="exam_time"
                            value={examTime}
                            {...register('exam_time')} />
                        <input type="hidden"
                            name="course_id"
                            value={cid}
                            {...register('course_id')} />
                        <input type="hidden"
                            name="user_id"
                            value={UserObj.id ?? ""}
                            {...register('user_id')} />
                        <input type="hidden"
                            name="mcq_question"
                            value={JSON.stringify(answers)}
                            {...register('mcq_question')} />
                        <input type="hidden"
                            name="multi_mcq_question"
                            value={studentMultiAnswers}
                            {...register('multi_mcq_question')} />
                        <input type="hidden"
                            name="short_question"
                            value={shortQuestion}
                            {...register('short_question')} />
                        <input type="hidden"
                            name="fill_the_blank"
                            value={fillTheBlank}
                            {...register('fill_the_blank')} />
                        <div className="container-fluid">
                            <div className="header-main-wrapper">
                                <div className="bd-class-main">
                                    <div className="bd-class-sidebar">
                                        <div className="bd-class-sidebar-header">
                                            <h3>{data?.title}</h3>
                                            <i className="far fa-chevron-right"></i>
                                        </div>
                                        <div className="bd-class-sidebar-header pt-0">
                                            {data.setting_data &&
                                            <div className="quiz-setting"> 
                                                <div className="quiz-timer"><span className="w-20"><strong>{examTimer}</strong></span> time left</div>
                                                <div className="quiz-time duration"><strong>Time: </strong>{data.setting_data.timer_time} Minutes</div>
                                                <div className="quiz-time marking"><strong>Negative Marking: </strong>{data.setting_data.allow_negative_mark == "1" ? 'Yes' : 'No'}</div>
                                            </div>
                                            }
                                        </div>

                                        <div className="bd-class-lessons">
                                            <ul>
                                                {data?.lessons && data?.lessons.map((lesson: any) => (
                                                    <li className="active" key={uuidv4()}><span>{lesson.title}</span>
                                                        {lesson?.topics && (
                                                            <>
                                                                <ul>
                                                                    {lesson?.topics && lesson?.topics.map((topic: any) => (
                                                                        <li key={uuidv4()}>{topic?.title}</li>
                                                                    ))}
                                                                </ul>
                                                            </>
                                                        )}
                                                        {lesson?.class_test && (
                                                            <ul>
                                                                <li>{lesson?.class_test?.title}</li>
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="bd-class-content">
                                        {data.questions && data.questions.map((question: any, number: number) => (
                                            <div className="bd-class-content-single" key={uuidv4()}>
                                                {question.category == 'Header' &&
                                                    <HeaderQuestion dataQ={question} answers={answers} number={number} />
                                                }
                                                {question.category == 'MCQ' &&
                                                    <McqQuestion checkAnswerPref={checkAnswerPref} dataQ={question} answers={answers} number={number} />
                                                }
                                            </div>
                                        ))}
                                        <div className="bd-class-content-btn text-center">
                                            <button type="submit" className="blog-btn">Submit Quiz</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </main>
    ) : <div className="bd-class-area pt-120 pb-120">
            <div className="container-fluid">
                <div className="header-main-wrapper text-center">Already you reach out your limit. You have been taken {data?.taken_quiz} times
                </div>
            </div>
        </div>
};

export default QuizDetailsMain;