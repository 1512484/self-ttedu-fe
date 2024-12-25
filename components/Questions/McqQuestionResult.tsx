import React from 'react';

const McqQuestionResult = ({number, dataQ}) => {
   return typeof dataQ !== 'undefined' ? (
      <>
        <div className="bd-class-content-mcq mb-50">
            <h4>{dataQ.title}</h4>
            <p>{dataQ.user_correct == "1" ? JSON.parse(dataQ.content_data).points +"/" : "0/"}{JSON.parse(dataQ.content_data).points} {JSON.parse(dataQ.content_data).points > 1 ? 'points' : 'point'}</p>
            <div className="bd-class-content-mcq-list">
                <ul>
                {dataQ.content_data && JSON.parse(dataQ.content_data).options.map((content: any, index: number) => (
                    <li className={ (JSON.parse(dataQ.content_data).correct == content) ? 'active' : '' }>
                        <label htmlFor={`mcq_question_`+ number +'_'+ index}>
                            <input type="radio" 
                                id={`mcq_question_`+ number +'_'+ index}
                                name={`mcq[${dataQ.id}]`} 
                                checked={dataQ.user_answer == content}
                                value={content} />
                         {content}</label>
                    </li>
                ))}
                </ul>
            </div>
            {dataQ.user_correct == "1" &&
            <div className="result-message passed">
              <span><i className="far fa-check"></i> Your answer was correct</span>
            </div>
            }
            {dataQ.user_correct == "0" &&
            <>
            <div className="result-message failed mb-2">
              <span><i className="fal fa-times"></i> Your answer was wrong!</span>
            </div>
            <p>Correct answer is {JSON.parse(dataQ.content_data).correct}</p>
            </>
            }
        </div>
      </>
   ) : null
};

export default McqQuestionResult;