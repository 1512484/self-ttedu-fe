import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';
import { IFact } from '../../interfaces/factSetting';

const CounterSectionThree = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-03/stats`,
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
        <div className="counter-area pt-75 pb-30" style={{ background: "url(assets/img/bg/university-counter.png)" }}>
            <div className="container">
                <div className="row">
                    {data && data.map((factItem: IFact) => (
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6" key={uuidv4()}>
                            <div className="university-counter-wrapper text-center mb-40">
                                <div className="counter-img">
                                    <img src={getImage(factItem.image)} alt="img not found" />
                                </div>
                                <div className="university-couner-text">
                                    <span className="counter">{factItem.title}</span>
                                    <p>{factItem.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null
};

export default CounterSectionThree;