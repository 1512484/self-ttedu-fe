import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';
import { IBrand } from '../../interfaces/brandSetting';

const GallaryInstaSection = () => {
    interface iDataType {
        home_03_insta_images_titles_title : string;
        home_03_insta_images_titles_url: string;
        items: []
    };
    const [data, setData] = useState<iDataType>()

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/home-03/insta-images-more-titles`,
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

    return typeof data?.home_03_insta_images_titles_title !== 'undefined' ? (
        <div className="gallery-area">
            <div className="swiper-containers">
                <div className="swiper-wrappers gallery-inner">
                    {data.items && data.items.slice(0, 5).map((instagramItem: IBrand) => (
                        <div className="swiper-slides gallery-single w-img" key={uuidv4()}>
                            <img src={getImage(instagramItem.image)} alt="img not found" />
                            <div className="gallery-link">
                                <a target="_blank" href={data?.home_03_insta_images_titles_url} className="gallery-insta"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null
};

export default GallaryInstaSection;