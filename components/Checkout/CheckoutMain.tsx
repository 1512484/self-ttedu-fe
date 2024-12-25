import React, { useEffect, useReducer, useState, useMemo } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import type { IOrder } from '../../interfaces/order';
import { IPricePlan } from '../../interfaces/pricePlan';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { requiredValidationMessage } from '../../helpers/constants';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../hooks/useStorage';
import DOMPurify from 'isomorphic-dompurify';

const initialState = {
    isActive: true,
    isActiveA: true,
    isActiveB: true,
    isActiveC: true
}
const reducer = (state: { isActive: any; isActiveA: any; isActiveB: any; isActiveC: any; }, action: any) => {
    switch (action) {
        case "returnCustomer":
            return {
                ...state,
                isActive: !state.isActive,
            };
        case "coupon":
            return {
                ...state,
                isActiveA: !state.isActiveA,
            };
        case "account":
            return {
                ...state,
                isActiveB: !state.isActiveB,
            };
        case "address":
            return {
                ...state,
                isActiveC: !state.isActiveC,
            };
        default:
            throw new Error("Unexpected action");
    }
};

const CheckoutMain = () => {
    interface iDataType {
        site_checkout_billing_title : string;
        site_checkout_account_title: string;
        site_checkout_account_description: string;
        site_checkout_shipping_title: string;
        site_checkout_payment_title: string;
        site_checkout_payment_default_title: string;
        site_checkout_payment_default_description: string;
        site_checkout_btn_text: string;
        site_checkout_payment_url: string;
    };
    const [sectionData, setSectionData] = useState<iDataType>()
    const [state, dispatch] = useReducer(reducer, initialState);
    const [pageData, setPageData] = useState({})
    const [packageData, setPackageData] = useState([])
    const [selectedPackageData, setSelectedPackageData] = useState<IPricePlan>()
    const router = useRouter();
    const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
    const pck = router.query.pck ?? 0;

    const validationSchema = useMemo(
        () =>
            yup.object({
                email: yup
                    .string()
                    .email()
                    .required(`Email ${requiredValidationMessage}`),
                    first_name: yup
                    .string()
                    .required(`First name ${requiredValidationMessage}`),
            }),
        [],
    );

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IOrder>({
        resolver: yupResolver(validationSchema),
    });

    // csrf cookie
    const initialize = () => {
        fetch(`${process.env.APP_BACKEND_HOME_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        })
        .then(response => console.log(response))
        .catch(err => console.error(err))
    }

    const handleRegister = async (data: IOrder) => {
        //initialize();
        // Orders 
        fetch(`${process.env.APP_BACK_END_URL}/users/order-with-register`, {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(response => registerResponse(response) )
            .catch(err => console.error(err))
    };

    const registerResponse = (response: any) => {
        if (response.data && selectedPackageData.type != null) {
            router.push(sectionData.site_checkout_payment_url + "/"+ UserObj.id + "/"+ selectedPackageData.type);
        } 
    }

    useEffect(() => {
        if(UserObj?.id ==  null)
        {
            router.push('/login');
        }
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/checkout`,
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
        // packages
        fetch(
            `${process.env.APP_BACK_END_URL}/subscription/packages`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            }
        )
            .then(response => response.json())
            .then((response) => handlePackageResponseData(response))
            .catch(err => console.error(err))
    }, [pck])

    const handleResponseData = (res) => {
        setSectionData(res.data);
        let dataObj = {
            'title': res.data.site_checkout_title,
            'sub_title': res.data?.site_checkout_sub_title,
            'image': res.data.site_checkout_banner_image,
            'description': res.data?.site_checkout_description,
            'keywords': res.data?.site_checkout_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(dataObj);
    }

    const handlePackageResponseData = (res) => {
        setPackageData(res.data);
        res.data.forEach(function(member){
            if(pck == member.id) {
                setSelectedPackageData(member);
            }
        })
    }

    return typeof sectionData !== 'undefined'  &&  sectionData !== null ? (
        <main>
            <>
                <Breadcrumb pageData={pageData} />
                {sectionData && (
                    <section className="checkout-area pt-70 pb-70">
                        <div className="container">
                            <form onSubmit={handleSubmit(handleRegister)} autoComplete='off'>
                 
                            <input type="hidden" 
                                name="user_id" 
                                value={UserObj?.id}
                                {...register('user_id')} />

                            <input type="hidden" 
                                name="price_plan_id" 
                                value={pck}
                                {...register('price_plan_id')} />

                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="checkbox-form">
                                            <h3 className='mb-25'>{sectionData.site_checkout_billing_title}</h3>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list country-select">
                                                        <span>Membership Type: </span>
                                                        {selectedPackageData?.type != null ?
                                                        <span key={selectedPackageData?.id}>{selectedPackageData.type} - {selectedPackageData.money_sign}{selectedPackageData.amount}/{selectedPackageData.title}</span>
                                                       : 'No package yet!'}
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>First Name <span className="required">*</span></label>
                                                        <input type="text" 
                                                            name="first_name" 
                                                            {...register('first_name')}
                                                            value={UserObj?.first_name}
                                                            placeholder="First Name" />
                                                            {errors.first_name && (
                                                            <span className='helper-text red-text'>
                                                                First name is required
                                                            </span>
                                                            )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Last Name <span className="required">*</span></label>
                                                        <input type="text" 
                                                        name="last_name" 
                                                        value={UserObj?.last_name}
                                                        {...register('last_name')}
                                                        placeholder="Last Name" />

                                                        {errors.last_name && (
                                                        <span className='helper-text red-text'>
                                                            Last name is required
                                                        </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Address <span className="required">*</span></label>
                                                        <input type="text" 
                                                        name="street_address" 
                                                        {...register('street_address')}
                                                        value={UserObj?.street_address}
                                                        placeholder="Street address" />
                                                        {errors.street_address && (
                                                        <span className='helper-text red-text'>
                                                            Address is required
                                                        </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Town / City <span className="required">*</span></label>
                                                        <input type="text" 
                                                        name="city" 
                                                        value={UserObj?.city}
                                                        {...register('city')}
                                                        placeholder="City" />

                                                        {errors.city && (
                                                        <span className='helper-text red-text'>
                                                            City is required
                                                        </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Country <span className="required">*</span></label> 
                                                        <input type="text" 
                                                        name="country" 
                                                        value={UserObj?.country}
                                                        {...register('country')}
                                                        placeholder="Country" />

                                                        {errors.country && (
                                                        <span className='helper-text red-text'>
                                                            Country is required
                                                        </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Postcode / Zip <span className="required">*</span></label>
                                                        <input type="text" 
                                                        name="zip" 
                                                        value={UserObj?.zip}
                                                        {...register('zip')}
                                                        placeholder="Zip" />

                                                        {errors.zip && (
                                                        <span className='helper-text red-text'>
                                                            Zip is required
                                                        </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Email Address <span className="required">*</span></label>
                                                        <input type="text" 
                                                        name="email" 
                                                        {...register('email')}
                                                        value={UserObj?.email}
                                                        placeholder="Email" />

                                                        {errors.email && (
                                                        <span className='helper-text red-text'>
                                                            Email is required
                                                        </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Phone <span className="required">*</span></label>
                                                        <input type="text" 
                                                        name="phone" 
                                                        value={UserObj?.phone}
                                                        {...register('phone')}
                                                        placeholder="Phone" />

                                                        {errors.phone && (
                                                        <span className='helper-text red-text'>
                                                            Phone is required
                                                        </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="different-address">
                                                <div className="ship-different-title">
                                                    <label onClick={() => dispatch("address")}>{sectionData.site_checkout_shipping_title}</label>
                                                </div>
                                                <div id="ship-box-info" className={`${state.isActiveC ? "danger" : "d-block"}`}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="checkout-form-list">
                                                                <label>First Name</label>
                                                                <input type="text" 
                                                                name="alt_first_name" 
                                                                {...register('alt_first_name')}
                                                                placeholder="First address" />

                                                                {errors.first_name && (
                                                                <span className='helper-text red-text'>
                                                                    First name is required
                                                                </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="checkout-form-list">
                                                                <label>Last Name</label>
                                                                <input type="text" 
                                                                name="alt_last_name" 
                                                                {...register('alt_last_name')}
                                                                placeholder="Last Name" />

                                                                {errors.alt_last_name && (
                                                                <span className='helper-text red-text'>
                                                                    Last name is required
                                                                </span>
                                                                )}
                                                            </div>
                                                        </div>
                                               
                                                        <div className="col-md-12">
                                                            <div className="checkout-form-list">
                                                                <label>Address</label>
                                                                <input type="text" 
                                                                name="alt_street_address" 
                                                                {...register('alt_street_address')}
                                                                placeholder="Street address" />

                                                                {errors.alt_street_address && (
                                                                <span className='helper-text red-text'>
                                                                    Street address is required
                                                                </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="checkout-form-list">
                                                                <label>Town / City</label>
                                                                <input type="text" 
                                                                name="alt_city" 
                                                                {...register('alt_city')}
                                                                placeholder="City" />
                                                                {errors.alt_city && (
                                                                <span className='helper-text red-text'>
                                                                    City is required
                                                                </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="checkout-form-list">
                                                                <label>State / County</label>
                                                                <input type="text" 
                                                                name="street_address" 
                                                                {...register('alt_country')}
                                                                placeholder="Country Name" />

                                                                {errors.alt_country && (
                                                                <span className='helper-text red-text'>
                                                                    Country is required
                                                                </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="checkout-form-list">
                                                                <label>Postcode / Zip</label>
                                                                <input type="text" 
                                                                name="alt_zip" 
                                                                {...register('alt_zip')}
                                                                placeholder="Postcode / Zip" />

                                                                {errors.alt_zip && (
                                                                <span className='helper-text red-text'>
                                                                    Zip is required
                                                                </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="checkout-form-list">
                                                            <label>Email</label>
                                                                <input type="text" 
                                                                name="alt_email" 
                                                                {...register('alt_email')}
                                                                placeholder="Email address" />
                                                                {errors.alt_email && (
                                                                <span className='helper-text red-text'>
                                                                    Email is required
                                                                </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="checkout-form-list">
                                                                <label>Phone</label>
                                                                <input type="text" 
                                                                name="alt_phone" 
                                                                {...register('alt_phone')}
                                                                placeholder="Phone" />
                                                                {errors.alt_phone && (
                                                                <span className='helper-text red-text'>
                                                                    Phone is required
                                                                </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="your-order mb-30 ">
                                            <h3>{sectionData.site_checkout_payment_title}</h3>
                                            <div className="payment-method">
                                                <div className="accordion" id="checkoutAccordion">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="checkoutOne">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#bankOne" aria-expanded="true" aria-controls="bankOne">
                                                                {sectionData.site_checkout_payment_default_title}</button>
                                                        </h2>
                                                        <div id="bankOne" className="accordion-collapse collapse show"
                                                            aria-labelledby="checkoutOne" data-bs-parent="#checkoutAccordion">
                                                            <div className="accordion-body">
                                                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(sectionData.site_checkout_payment_default_description) }} />
                                                                <label htmlFor={`mollie_payment`}>
                                                                    <input type="radio" 
                                                                        id={`mollie_payment`}
                                                                        name={`payment_method`} 
                                                                        checked={true}
                                                                        value="1" readOnly /> Mollie Payment</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                    
                                                <div className="order-button-payment mt-20">
                                                    <button type="submit" className="edu-btn">{sectionData.site_checkout_btn_text}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
            </>
        </main>
    ) : null
};

export default CheckoutMain;