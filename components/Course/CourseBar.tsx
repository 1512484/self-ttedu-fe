import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

const CourseBar = (data) => {
    let searchPref = data.searchPref,
        totalCourse = data.totalCourse,
        submitCourseForm = data.submitCourseForm,
        searchVal = data.searchVal;

    const handleChangeSearch = e => {
        let selectedName = e.target.getAttribute('data-name');
        searchPref(e.target.value, selectedName);
    };

    const submitCourseFilterForm = e => {
        e.preventDefault();
        submitCourseForm();
    };



    return (
        <div className="course-bar-up-area pt-120">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="course-main-wrapper mb-30">
                            <div className="bar-filter">
                                <i className="flaticon-filter"></i>
                                <div className='inline-block' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.sectionData.site_courses_filter_title) }} />
                            </div>
                            <div className="corse-bar-wrapper">
                                <div className="bar-search">
                                    <form onSubmit={e => submitCourseFilterForm(e)} autoComplete="off">
                                        <div className="bar-secrch-icon position-relative">
                                            <input type="text"
                                                data-name={`course-filter-search`}
                                                onChange={handleChangeSearch}
                                                defaultValue={searchVal}
                                                placeholder={'Tìm kiếm từ khóa...'}
                                            />
                                                {/* placeholder={searchVal ?? 'Tìm kiếm từ khóa...'} */}
                                            <button type="button" disabled><i className="far fa-search"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="course-sidebar-tab">
                                <div className="course-sidebar-wrapper">
                                    <div className="curse-tab-left-wrap">
                                        <div className="course-results">
                                            Hiển thị <span className="course-result-showing"></span> <span
                                                className="course-result-number">{totalCourse}</span> kết quả
                                        </div>

                                    </div>
                                    <div className="couse-dropdown">
                                        <button
                                            onClick={submitCourseFilterForm}
                                            type="submit"
                                            className="edu-btn" >Tìm kiếm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseBar;