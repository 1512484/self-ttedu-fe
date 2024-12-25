import React, { useEffect, useState } from 'react';
import { ICourseReview } from '../../interfaces/courseReview';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import getImage from '../../helpers/getImage';

const CourseReviews = (prop: any) => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/courses/reviews?courseId=${prop.courseId}`,
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

    //for rating handle
    const getRating = (rating: any) => {
        let empty_rating_count = 5 - rating;
        let ratings = [];
        for (let i = 0; i < rating; i++) {
            ratings.push(<i className="fas fa-star" key={`l-${i}`}></i>)
        }
        for (let i = 0; i < empty_rating_count; i++) {
            ratings.push(<i className="far fa-star" key={`p-${i}`}></i>)
        }
        return ratings;
    }
    //for rating handle

    return typeof data !== 'undefined'  &&  data !== null ? (
        <>
        {data.length > 0 &&
            <div className="course-detalis-reviews pt-15">
                <div className="course-detalis-reviews-tittle">
                    <h3>Reviews</h3>
                </div>
                {data && data.map((reviewItem: ICourseReview) => (
                    <div className="course-review-item mb-30" key={uuidv4()}>
                        <div className="course-reviews-img">
                            <Link href={`/student/${reviewItem.student?.slug}`} legacyBehavior><a><img src={getImage(reviewItem.student?.image_url)} alt="img not found" /></a></Link>
                        </div>
                        <div className="course-review-list">
                            <h5>
                                <Link href={`/student/${reviewItem.student?.slug}`} legacyBehavior><a>{reviewItem.student?.titel_name + ' ' + reviewItem.student?.first_name + ' ' + reviewItem.student?.last_name}</a></Link>
                            </h5>
                            <div className="course-start-icon">
                                {getRating(reviewItem?.rating)}
                            </div>
                            <p>{reviewItem.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        }
        </>
    ) : null
};

export default CourseReviews;