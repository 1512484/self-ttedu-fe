import React, { useReducer, useState, useEffect } from "react";
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

const CourseSidebar = (data) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let checkCatsPref = data.checkCatsPref,
        uncheckCatsPref = data.uncheckCatsPref,
        checkRatingPref = data.checkRatingPref,
        checkPricePref = data.checkPricePref,
        cats = data.cats,
        selectedPrice = data.selectedPrice,
        selectedRating = data.selectedRating;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories((Array.isArray(data?.categoriesData) ? data.categoriesData : []).map(cate => ({
            ...cate,
            isActive: cate.children?.some(item => cats.includes(item.id))
        })));
    }, [data]);

    const handleChangeCategory = e => {
        if (e.target.checked) {
            console.log(e.target.checked);
            let selectedName = e.target.getAttribute('data-name');
            checkCatsPref(e.target.value, selectedName);
        }
        else {
            let selectedName = e.target.getAttribute('data-name');
            uncheckCatsPref(e.target.value, selectedName);
        }
    };

    const handleChangeSubCategory = id => {
        if(checkAnswer(id)) {
            uncheckCatsPref(id);
        } else {
            checkCatsPref(id);
        }
    }

    const handleChangeRating = e => {
        // if (e.target.checked) {
        //     console.log(e.target.checked);
        //     let selectedName = e.target.getAttribute('data-name');
        //     checkRatingPref(e.target.value, selectedName);
        // }
        checkRatingPref(e);
    };

    const handleChangePrice = e => {
        // if (e.target.checked) {
        //     console.log(e.target.checked);
        //     let selectedName = e.target.getAttribute('data-name');
        //     checkPricePref(e.target.value, selectedName);
        // }
        checkPricePref(e);
    };

    let checkAnswer = (val) => {
        return cats.includes(val)
    };

    const handleToggleCategoryDrop = (index) => {
        if (!categories[index]) return;
        setCategories(categories.map((category, _index) => index !== _index ? category : { ...category, isActive: !category.isActive }));
    }

    return typeof data?.categoriesData !== 'undefined' && data !== null ? (
        <div>
            <div className="course-sidebar-widget mb-20">
                <div className={`course-sidebar-info ${state.isActive ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => dispatch("categories")}>Danh mục</h3>
                    <ul>
                        {/* {data.categoriesData && Object.keys(data.categoriesData).map((key) => (
                            <li key={uuidv4()}>
                                <div className="course-sidebar-list">
                                    <input
                                        data-val={data.categoriesData[key].id}
                                        data-name={`course-filter-cat[${data.categoriesData[key].id}]`}
                                        onChange={handleChangeCategory}
                                        className="edu-check-box"
                                        type="checkbox"
                                        id={`e${data.categoriesData[key].id}`}
                                        value={data.categoriesData[key].id} />
                                    <label htmlFor={`e${data.categoriesData[key].id}`} className="edu-check-label">{data.categoriesData[key].title}</label>
                                </div>
                            </li>
                        ))} */}
                        {
                            categories?.map((category, index) => (
                                <li key={uuidv4()}>
                                    <div className={`course-sidebar-info ${category.isActive ? "danger" : "content-hidden"}`}>
                                        <h3 className="drop-btn" onClick={() => handleToggleCategoryDrop(index)}>{category.title}</h3>
                                        <ul>
                                            {category?.children?.map((subcate, i) => (
                                                <li key={subcate?.id}>
                                                    <div className="course-sidebar-list">
                                                        <input
                                                            data-val={subcate.id}
                                                            data-name={`course-filter-cat[${subcate.id}]`}
                                                            className="edu-check-box"
                                                            type="checkbox"
                                                            onChange={() => {
                                                                handleChangeSubCategory(subcate.id)
                                                            }}
                                                            checked={checkAnswer(subcate.id)}
                                                            id={`e${subcate.id}`}
                                                            value={subcate.id} />
                                                        <label htmlFor={`e${subcate.id}`} className="edu-check-label">{subcate.title}</label>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="course-sidebar-widget mb-20">
                <div className={`course-sidebar-info ${state.isActiveA ? "danger" : "content-hidden"}`}>
                    <h3 className="drop-btn" onClick={() => dispatch("ratings")}>Xếp hạng</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input
                                    data-name={`course-filter-rating`}
                                    onChange={() => handleChangeRating(5)}
                                    className="edu-check-box"
                                    type="radio"
                                    id="e-25"
                                    name="rating"
                                    checked={selectedRating == 5}
                                    value="5" />
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
                                <input
                                    data-name={`course-filter-rating`}
                                    onChange={() => handleChangeRating(4)}
                                    className="edu-check-box"
                                    type="radio"
                                    id="e-24"
                                    name="rating"
                                    checked={selectedRating == 4}
                                    value="4" />
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
                                <input
                                    data-name={`course-filter-rating`}
                                    onChange={() => handleChangeRating(3)}
                                    className="edu-check-box"
                                    type="radio"
                                    id="e-12"
                                    name="rating"
                                    checked={selectedRating == 3}
                                    value="3" />
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
                                <input
                                    data-name={`course-filter-rating`}
                                    onChange={() => handleChangeRating(2)}
                                    className="edu-check-box"
                                    type="radio"
                                    id="e-28"
                                    name="rating"
                                    checked={selectedRating == 2}
                                    value="2" />
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
                                <input
                                    data-name={`course-filter-rating`}
                                    onChange={() => handleChangeRating(1)}
                                    className="edu-check-box"
                                    type="radio"
                                    id="e-14"
                                    name="rating"
                                    checked={selectedRating == 1}
                                    value="1" />
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
                    <h3 className="drop-btn" onClick={() => dispatch("price")}>Học phí</h3>
                    <ul>
                        <li>
                            <div className="course-sidebar-list">
                                <input
                                    data-name={`course-filter-price`}
                                    onChange={() => handleChangePrice("")}
                                    className="edu-check-box"
                                    type="radio"
                                    id="course-filter-price-all"
                                    name="price"
                                    checked={selectedPrice == ""}
                                    value="" />
                                <label className="edu-check-label" htmlFor="course-filter-price-all">Tất cả</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input
                                    data-name={`course-filter-price`}
                                    onChange={() => handleChangePrice("free")}
                                    className="edu-check-box"
                                    type="radio"
                                    id="course-filter-price-free"
                                    name="price"
                                    checked={selectedPrice == "free"}
                                    value="free" />
                                <label className="edu-check-label" htmlFor="course-filter-price-free">Miễn phí</label>
                            </div>
                        </li>
                        <li>
                            <div className="course-sidebar-list">
                                <input
                                    data-name={`course-filter-price`}
                                    onChange={() => handleChangePrice("paid")}
                                    className="edu-check-box"
                                    type="radio"
                                    id="course-filter-price-paid"
                                    name="price"
                                    checked={selectedPrice == "paid"}
                                    value="paid" />
                                <label className="edu-check-label" htmlFor="course-filter-price-paid">Có tính phí</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    ) : null;
};

export default CourseSidebar;