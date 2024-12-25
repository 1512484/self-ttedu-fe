import React, { useEffect, useReducer, useState } from "react";
import Link from 'next/link';
import McqQuestionResult from "../Questions/McqQuestionResult";
import { useRouter } from "next/router";
import storage from 'local-storage-fallback';
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import { v4 as uuidv4 } from 'uuid';
import { IQuizResult } from "../../interfaces/quizResult";

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

const ResultDetailsMain = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();
    const [data, setData] = useState<IQuizResult>()
    const [pageData, setPageData] = useState({})
    const slug = router.query.slug;
    
    useEffect(() => {
        const bearerToken = storage.getItem(LOCAL_STORAGE_KEYS.APP_TOKEN);
        const userObj = storage.getItem(LOCAL_STORAGE_KEYS.APP_USER);
        const userId = JSON.parse(userObj).id ?? "";
        if(slug) 
        {
            fetch(
                `${process.env.APP_BACK_END_URL}/result/user-exam?qid=${slug}&user_id=${userId}`,
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
                    if(response.data.course.title)
                    {
                        setData(response.data);
                    }
                    else 
                    {
                        router.push('/404');
                    }
                })
                .catch(err => console.error(err))
        }
    }, [slug])

    return typeof data?.quiz_id !== 'undefined' ? (
        <main>
            {data && (
                <div className="bd-class-area pt-120 pb-120">
                    <div className="container-fluid">
                        <div className="header-main-wrapper">
                            <div className="bd-class-main">
                                <div className="bd-class-sidebar">
                                    <div className="bd-class-sidebar-header">
                                        <h3>{data.course?.title}</h3>
                                        <i className="far fa-chevron-right"></i>
                                    </div>
                                    <div className="bd-class-sidebar-header">
                                        {data.take_time &&
                                        <div className="quiz-setting"> 
                                            <div className="quiz-time"><strong>Score: </strong>{data.earned_score}</div>
                                            <div className="quiz-time"><strong>Percentage: </strong>{data.score_percentage}</div>
                                            <div className="quiz-time"><strong>Correct answer: </strong>{data.correct_number}</div>
                                            <div className="quiz-time"><strong>Wrong answer: </strong>{data.wrong_number}</div>
                                            <div className="quiz-time"><strong>Not answer: </strong>{data.not_answers_number}</div>
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
                                    <div className="bd-class-content-single active" key={number}>
                                        {question.category == 'MCQ' && 
                                            <McqQuestionResult number={number} dataQ={question} />
                                        }
                                    </div>
                                ))}
                                    <div className="bd-class-content-btn">
                                        <a href="/courses" className="user-btn-sign-up edu-btn">Go Course</a>
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

export default ResultDetailsMain;