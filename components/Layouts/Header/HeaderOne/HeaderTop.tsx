import React, { useReducer } from "react";
import DOMPurify from 'isomorphic-dompurify';

const initialState = {
    isActiveF: true
}
const reducer = (state: { isActiveF: any; }, action: any) => {
    switch (action) {
        case "close":
            return {
                ...state,
                isActiveF: !state.isActiveF,
            };
        default:
            throw new Error("Unexpected action");
    }
};

const HeaderTop = (data) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return typeof data !== 'undefined'  &&  data !== null ? (
        <>
            {data && (
                <div className={`header-note-area p-relative d-none d-md-block ${state.isActiveF ? "danger" : "eduman-header-notice-hide"}`}>
                    <div className="container-fluid">
                        <div className="note-text text-center" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.message) }} />
                    </div>
                    <div className="eduman-header-notice-action-close">
                        <button onClick={() => dispatch("close")}><i className="fal fa-times"></i></button>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default HeaderTop;