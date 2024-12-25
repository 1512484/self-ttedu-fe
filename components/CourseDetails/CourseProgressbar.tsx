import React, { useEffect, useState } from 'react';
import { ICourse } from '../../interfaces/course';
import { v4 as uuidv4 } from 'uuid';

const CourseProgressbar = () => {
    const [data, setData] = useState<ICourse>()
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/courseDetails`,
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

    return typeof data !== 'undefined'  &&  data !== null ? (
        <div className="student-reating-bar">
            <div className="reating-bar-wrapper">
                {data && data.courseProgress.map((progressItem: ICourse) => (
                    <div className="rating-row mb-10" key={uuidv4()}>
                        <div className="rating-star">
                            <i className={progressItem.rating}></i>
                        </div>
                        <div className="progress">
                            <div className="progress-bar progress-bar1 wow fadeInLeft" style={{width:`${progressItem.bar}`}}></div>
                        </div>
                        <div className="progress-tittle">
                            <span>{progressItem.percent}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : null
};

export default CourseProgressbar;