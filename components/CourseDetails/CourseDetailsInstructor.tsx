import React from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';

const CourseDetailsInstructor = (data) => {

    return (
        <>
            {data && (
                <>
                    {data.instructor.authors && data.instructor.authors.map((author: any) => (
                        <div className="course-instructors mt-45 mb-25" key={uuidv4()}>
                            <h3>{author.category}</h3>
                            <div className="instructors-heading">
                                <div className="instructors-img w-img">
                                    <Link href={`${author.slug ?? "/"}`} legacyBehavior><a><img src={getImage(author.logo_url)} alt="image not found" /></a></Link>
                                </div>
                                <div className="instructors-body">
                                    <h5>
                                        <Link href={`${author.slug ?? "/"}`} legacyBehavior><a>{author.salute_name + ' ' + author.titel_name + ' ' + author.first_name + ' ' + author.last_name}</a></Link>
                                    </h5>
                                    <span>{author.designation}</span>
                                </div>
                            </div>
                            <div className="intructors-content">
                                <p>{author.teaser}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    )
};

export default CourseDetailsInstructor;