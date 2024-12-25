import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Breadcrumb from '../Common/Breadcrumb';
import { IPage } from '../../interfaces/page';
import DOMPurify from 'isomorphic-dompurify';

const PageDetailsMain = () => {
    const router = useRouter();
    const [data, setData] = useState<IPage>()
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState({})
    const slug = router.query.slug;
    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/page/details?slug=${slug}`,
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
                if(response.data?.meta_title)
                {
                    setData(response.data);
                    let data = {
                        'title': response.data?.meta_title,
                        'sub_title': response.data?.meta_title,
                        'image': response.data?.meta_image,
                        'description': response.data?.meta_description,
                        'keywords': "",
                        'url': process.env.APP_BASE_URL
                    }
                    setPageData(data);
                }
                else {
                    router.push('/404');
                }
            })
            .catch(err => console.error(err))
    }, [slug])

    return typeof pageData !== 'undefined' ? (
        <main>
            <Breadcrumb pageData={pageData} />

            <div className="event-detalis-area pt-120 pb-90">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-12">
                            <div className="event-main-wrapper mb-30">
                                {data && (
                                    <>
                                        <div className='privacy-policy-info' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.content) }} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    ) : null 
};

export default PageDetailsMain;