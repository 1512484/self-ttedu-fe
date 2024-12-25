import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const McqQuestion = (props) => {
    let dataQ = props.dataQ;
    let number = props.number;
    let checkAnswerPref = props.checkAnswerPref; 
    let answers = props.answers;
    
    const handleChange = e => {
        if (e.target.checked) {
            let selectedAll = e.target.getAttribute('data-val');
            let selectedName = e.target.getAttribute('data-name');
            checkAnswerPref(e.target.value, selectedAll, selectedName); 
        }
    };

    let checkAnswer = (val) => {
        return answers.includes(val)
    };

    return typeof dataQ !== 'undefined' ? (
    <>
        <div className="bd-class-content-mcq mb-50">
            <h4>{dataQ.title}</h4>
            <p>{dataQ.content_data && JSON.parse(dataQ.content_data).points} {JSON.parse(dataQ.content_data).points > 1 ? 'points' : 'point'}</p>
            <div className="bd-class-content-mcq-list">
                <ul>
                {dataQ.content_data && JSON.parse(dataQ.content_data).options.map((content: any, index: number) => (
                    <li key={uuidv4()}>
                        <label htmlFor={`mcq_question_`+ number +'_'+ index}>
                            <input type="radio" 
                                data-val={JSON.stringify(JSON.parse(dataQ.content_data).options)}
                                data-name={dataQ.id +'~=~'}
                                id={`mcq_question_`+ number +'_'+ index}
                                name={`mcq[${dataQ.id}]`} 
                                checked={checkAnswer(dataQ.id +'~=~'+ content)}
                                onChange={handleChange}
                                value={dataQ.id +'~=~'+ content} />
                         {content}</label>
                    </li>
                ))}
                </ul>
                {dataQ.explanation && <div className="explanation">{dataQ.explanation}</div>}
            </div>
        </div>
    </>
    ) : null
};

export default McqQuestion;