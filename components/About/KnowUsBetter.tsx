import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IKnowUs } from '../../interfaces/knowUsSetting';
import { v4 as uuidv4 } from 'uuid';
import getImage from '../../helpers/getImage';
import DOMPurify from 'isomorphic-dompurify';

const KnowUsBetter = (pData: any) => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/blogs/by-category?catId=${pData.sectionData.site_about_blog_category}`,
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
    }, [pData])
    return typeof data !== 'undefined'  &&  data !== null ? (
        <div className="know-us-better-area pb-90">
            <div className="container">
                <div className="know-us-border pt-110">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12">
                            {pData && (
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6">
                                        <div className="section-title mb-55">
                                            <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pData.sectionData.site_about_blog_title) }} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 justify-content-end">
                                        <div className="know-us-tittle mb-55">
                                            <p>{pData.sectionData.site_about_blog_description}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        {data && data.slice(0, 3).map((knowusItem: IKnowUs) => (
                            <div className="col-xl-4 col-lg-4 col-md-6" key={uuidv4()}>
                                <div className="know-us-wrapper mb-30">
                                    <div className="know-us-better-thumb">
                                        <Link href={`/blog/${knowusItem.slug}`} legacyBehavior><a><img src={getImage(knowusItem.image)} alt="know-us-img" /></a></Link>
                                    </div>
                                    <div className="know-us-text text-center">
                                        <Link href={`/blog/${knowusItem.slug}`} legacyBehavior><a><h3>{knowusItem.title}</h3></a></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : null
};

export default KnowUsBetter;