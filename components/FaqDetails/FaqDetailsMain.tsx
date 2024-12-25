import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BreadcrumbTwo from '../Common/BreadcrumbTwo';
import { IFaq } from '../../interfaces/faq';
import DOMPurify from 'isomorphic-dompurify';

const FaqDetailsMain = () => {
    const router = useRouter();
    const [data, setData] = useState<IFaq>()
    const [sectionData, setSectionData] = useState({})
    const [pageData, setPageData] = useState({})
    const slug = router.query.slug;

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/faq-details`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .then((response) => handleResponseData(response))
            .catch(err => console.error(err))

        fetch(
            `${process.env.APP_BACK_END_URL}/faqs/details?slug=${slug}`,
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
                if(response.data.title)
                {
                    setData(response.data);
                }
                else 
                {
                    router.push('/404');
                }
            })
            .catch(err => console.error(err))
    }, [slug])


    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': res.data?.site_faq_details_title,
            'sub_title': res.data?.site_faq_details_sub_title,
            'image': res.data?.site_faq_details_banner_image,
            'description': res.data?.site_faq_details_description,
            'keywords': res.data?.site_faq_details_keywords,
            'url': process.env.APP_BASE_URL
        } 
        setPageData(data);
    }

    return typeof pageData !== 'undefined' ? (
        <main>
            <BreadcrumbTwo pageData={pageData} />

            <section className="faq-detalis-area pt-110 pb-90">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-xl-9 col-lg-8">
                        <div className="faq-content-wrapper mb-25">
                           <div className="faq-detalis-info">
                              <h3>{data?.title}</h3>
                           </div>
                           <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.description) }} />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
        </main>
    ) : null
};

export default FaqDetailsMain;