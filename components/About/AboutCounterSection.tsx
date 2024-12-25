import React, { useEffect, useState } from 'react';
import { IFact } from '../../interfaces/factSetting';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';

const AboutCounterSection = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-02/stats`,
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
        <div className="counter-area pt-120 pb-85">
            <div className="container">
                <div className="row">
                    {data && data.slice(0, 4).map((factItem: IFact) => (
                        <div className="col-xl-3 col-lg-6 col-md-6" key={uuidv4()}>
                            <div className="counter-wrapper text-center mb-30">
                                <div className="counter-icon">
                                    <div className="counter-icon-wrap">
                                        <img src={getImage(factItem.image)} alt="" />
                                    </div>
                                    <div className="count-number">
                                        <span className="counter">{factItem.title}</span>
                                        <p>{factItem.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null
};

export default AboutCounterSection;