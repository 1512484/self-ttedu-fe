import React, { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    isActive: true,
    isActiveA: true,
    isActiveB: true,
    isActiveC: true,
    isActiveD: true,
    isActiveE: true
}
const reducer = (state: { isActive: any; isActiveA: any; isActiveB: any; isActiveC: any; isActiveD: any; isActiveE: any; }, action: any) => {
    switch (action) {
        case "categories":
            return {
                ...state,
                isActive: !state.isActive,
            };
        case "ratings":
            return {
                ...state,
                isActiveA: !state.isActiveA,
            };
        case "price":
            return {
                ...state,
                isActiveB: !state.isActiveB,
            };
        default:
            throw new Error("Unexpected action");
    }
};

const CourseFromCategorySidebar = (data) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return typeof data?.categoriesdata !== 'undefined'  &&  data !== null ? (
        <div>
            <div className="course-sidebar-widget mb-20">
                <div className={`course-sidebar-info ${state.isActive ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => dispatch("categories")}>{data.sectionData.site_courses_filter_category_title}</h3>
                    <ul>
                        {data.categoriesData && Object.keys(data.categoriesData).map((key) => (
                        <li key={uuidv4()}>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="checkbox" id={`e${data.categoriesData[key].title}`} value={data.categoriesData[key].id} />
                                <label className="edu-check-label" htmlFor="e-heal">{ data.categoriesData[key].title }</label>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="course-sidebar-widget mb-20">
                <div className={`course-sidebar-info ${state.isActiveA ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => dispatch("ratings")}>{data.sectionData.site_courses_filter_rating_title}</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-25" name="rating" />
                                <label className="edu-check-star" htmlFor="e-25">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-24" name="rating" />
                                <label className="edu-check-star" htmlFor="e-24">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fal fa-star"></i>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-12" name="rating" />
                                <label className="edu-check-star" htmlFor="e-12">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    <i className="fal fa-star"></i>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-28" name="rating" />
                                <label className="edu-check-star" htmlFor="e-28">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    <i className="fal fa-star"></i>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-14" name="rating" />
                                <label className="edu-check-star" htmlFor="e-14">
                                    <i className="fas fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    <i className="fal fa-star"></i>
                                    <i className="fal fa-star"></i>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="course-sidebar-widget mb-20">
                <div className={`course-sidebar-info ${state.isActiveB ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => dispatch("price")}>{data.sectionData.site_courses_filter_price_title}</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-85" name="price" />
                                <label className="edu-check-label" htmlFor="e-85">All</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="e-all" name="price" />
                                <label className="edu-check-label" htmlFor="e-all">Free</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input className="edu-check-box" type="radio" id="f-all" name="price" />
                                <label className="edu-check-label" htmlFor="f-all">Paid</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ): null;
};

export default CourseFromCategorySidebar;