import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const HeaderQuestion = (props) => {
    const dataQ = props.dataQ;
    const number = props.number;
    const answers = props.answers;


    return typeof dataQ !== 'undefined' ? (
    <>
        <div className="bd-class-content-mcq quiz-question-header mb-50">
            <h4>{dataQ.title}</h4>
            {dataQ.explanation && <div className="bd-class-content-mcq-list">
                <div className="explanation">{dataQ.explanation}</div>
            </div>}
        </div>
    </>
    ) : null
};

export default HeaderQuestion;