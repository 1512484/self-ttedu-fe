import React, { useEffect, useState, useMemo } from 'react';
import Breadcrumb from '../components/Common/Breadcrumb';
import HeaderFour from '../components/Layouts/Header/HeaderFour/HeaderFour';
import type { IUser, IRegister } from '../interfaces/users'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { requiredValidationMessage } from '../helpers/constants';
import Footer from '../components/Layouts/Footer/Default/Footer';
import getImage from '../helpers/getImage';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../hooks/useStorage';
import Link from 'next/link';

const Registration = () => {

    const router = useRouter();
    interface iSectionDataType {
        site_signup_title: string;
        site_signup_img: string
        site_signup_policy_text: string
        site_signup_btn_text: string
        site_signup_back_text: string
    };
    const [sectionData, setSectionData] = useState<iSectionDataType>()
    const [pageData, setPageData] = useState({})

    const validationSchema = useMemo(
        () =>
            yup.object({
                email: yup
                    .string()
                    .email()
                    .required(`Email ${requiredValidationMessage}`),
                password: yup
                    .string()
                    .required(`Mật khẩu ${requiredValidationMessage}`),
            }),
        [],
    );

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IRegister>({
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

    const handleRegister = async (data: IRegister) => {
        initialize();

        console.log(JSON.stringify(data));
        // Register 
        fetch(`${process.env.APP_BACK_END_URL}/users/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(response => registerResponse(response))
            .catch(err => console.error(err))
    };

    const registerResponse = (response: any) => {
        if (response.data) {
            router.push('/login?status=success');
        }
    }

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/signup`,
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
    }, [])


    const handleResponseData = (res) => {
        setSectionData(res.data);
        let data = {
            'title': "Đăng ký",
            'sub_title': res.data?.site_signup_sub_title,
            'image': res.data?.site_signup_banner_img,
            'description': res.data?.site_signup_description,
            'keywords': res.data?.site_signup_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }

    return typeof sectionData !== 'undefined' ? (
        <>
            {/* <HeaderFour /> */}
            <Breadcrumb pageData={pageData} />
            {sectionData && (
                <div className="signup-page-area pt-120 pb-120">
                    <div className="signup-page-area-wrapper">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-10 col-lg-10">
                                    <form onSubmit={handleSubmit(handleRegister)} autoComplete='off'>
                                        <input type="hidden"
                                            name="role"
                                            value="Student"
                                            {...register('role')} />

                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="signup-box text-center">
                                                    <div className="signup-text">
                                                        <h3>Đăng ký</h3>
                                                    </div>
                                                    <div className="signup-thumb">
                                                        <img src={getImage(sectionData.site_signup_img)} alt="image not found" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="signup-form-wrapper">
                                                    <div className="signup-input-wrapper">
                                                        <input type="text"
                                                            name="first_name"
                                                            {...register('first_name')}
                                                            placeholder="Tên" />

                                                        {errors.first_name && (
                                                            <span className='helper-text red-text'>
                                                                Tên không được để trống
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="signup-input-wrapper">
                                                        <input type="text"
                                                            name="last_name"
                                                            {...register('last_name')}
                                                            placeholder="Họ" />

                                                        {errors.last_name && (
                                                            <span className='helper-text red-text'>
                                                                Họ không được để trống
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="signup-input-wrapper">
                                                        <input type="text"
                                                            name="phone"
                                                            {...register('phone')}
                                                            placeholder="Nhập số điện thoại" />

                                                        {errors.phone && (
                                                            <span className='helper-text red-text'>
                                                                Số điện thoại không được để trống
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="signup-wrapper">
                                                        <input id='email'
                                                            type='text'
                                                            className='validate'
                                                            name='email'
                                                            {...register('email')}
                                                            placeholder='Nhập email của bạn' />

                                                        {errors.email && (
                                                            <span className='helper-text red-text'>
                                                                Email không được để trống
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="signup-wrapper">
                                                        <input id='password'
                                                            type='password'
                                                            className='validate'
                                                            name='password'
                                                            {...register('password')}
                                                            placeholder='Nhập mật khẩu của bạn' />
                                                        {errors.password && (
                                                            <span className='helper-text red-text'>
                                                                Mật khẩu không được để trống
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="signup-action">
                                                        <div className="course-sidebar-list">
                                                            <input className="signup-checkbo" type="checkbox" id="sing-up" />
                                                            <label className="sign-check" htmlFor="sing-up">
                                                                {/* <div dangerouslySetInnerHTML={{ __html: sectionData.site_signup_policy_text }} /> */}
                                                                <div>Đồng ý <a href="/content/privacy-policy">Chính sách bảo mật</a></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="sign-button mb-20">
                                                        <button type='submit' className="sign-btn">Đăng ký</button>
                                                    </div>
                                                    <div className="acount-login text-center">
                                                        {/* <span dangerouslySetInnerHTML={{ __html: sectionData.site_signup_back_text }} /> */}
                                                        <span>Bạn đã có tài khoản?</span>
                                                        <span><Link href="/login" legacyBehavior><a>Đăng nhập</a></Link></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* <Footer /> */}
        </>
    ) : null
};

export default Registration;