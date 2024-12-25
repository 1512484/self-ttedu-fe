import React, { useEffect, useState } from 'react';
import getImage from '../../helpers/getImage';
import { v4 as uuidv4 } from 'uuid';

const FeatureScetion = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-01/features`,
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

    return typeof data !== 'undefined' && data !== null ? (
        <div className="features-area section-bg fix pt-120 pb-80">
            <div className="container">
                <div className="row">
                    {data && data.slice(3, 6).map((featureItem: any) => (
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={uuidv4()}>
                            <div className="features-box text-center mb-30">
                                <div className="features-svg">
                                    <img src={getImage(featureItem.image)} alt="features" />
                                </div>
                                <div className="features-text">
                                    <h4>{featureItem.title}</h4>
                                    <p>{featureItem.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null
};

export default FeatureScetion;