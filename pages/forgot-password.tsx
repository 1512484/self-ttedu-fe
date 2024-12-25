import { useEffect, useState, useMemo } from 'react';
import type { IUser, ILogin } from '../interfaces/users'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { requiredValidationMessage } from '../helpers/constants';
import React from 'react';
import Breadcrumb from '../components/Common/Breadcrumb';
import HeaderFour from '../components/Layouts/Header/HeaderFour/HeaderFour';
import getImage from '../helpers/getImage';
import Footer from '../components/Layouts/Footer/Default/Footer';

import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../hooks/useStorage';

const ForgotPassword = () => {
    const router = useRouter();
    interface iSectionDataType {
        site_forget_pass_title: string;
        site_forget_pass_img: string
        site_forget_pass_text: string
        site_forget_pass_email_text: string
        site_forget_pass_signin_btn_text: string
        site_forget_pass_back_text: string
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
    } = useForm<ILogin>({
        resolver: yupResolver(validationSchema),
    });

    const loginResponse = (response: any) => {
        if (response.success == true) {
            let userData = JSON.stringify({
                id: response.data.id,
                email: response.data.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                role: response.data.role,
            })
            storage.setItem(LOCAL_STORAGE_KEYS.APP_TOKEN, response.data.bearer_token)
            storage.setItem(LOCAL_STORAGE_KEYS.APP_USER, userData)
            router.push('/my-profile');
        }
    }


    const handleLogin = async (data: ILogin) => {

        console.log('login form data => ', data);

        try {
            // Login 
            fetch(`${process.env.APP_BACK_END_URL}/users/login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(response => loginResponse(response))
                .catch(err => console.error(err))
        }
        catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/inner-page/forget-password`,
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
            'title': "Quên mật khẩu",
            'sub_title': res.data?.site_forget_pass_title,
            'image': res.data.site_forget_pass_banner_img,
            'description': res.data?.site_forget_pass_description,
            'keywords': res.data?.site_forget_pass_keywords,
            'url': process.env.APP_BASE_URL
        }
        setPageData(data);
    }



    return typeof pageData !== 'undefined' ? (
        <>
            {/* <HeaderFour /> */}

            <Breadcrumb pageData={pageData} />

            {sectionData && (
                <div className="signin-page-area pt-120 pb-120">
                    <div className="signin-page-area-wrapper">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-10 col-lg-10">
                                    <form onSubmit={handleSubmit(handleLogin)} autoComplete='off'>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="signup-box text-center">
                                                    <div className="signup-text">
                                                        <h3 className='m-0 pb-30'>Quên mật khẩu</h3>
                                                    </div>
                                                    <div className="signup-thumb">
                                                        <img src={getImage(sectionData.site_forget_pass_img)} alt="image not found" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="signup-form-wrapper">
                                                    <p className='mb-25'>Bạn quên mật khẩu? Vui lòng nhập địa chỉ email của bạn. Bạn sẽ nhận liên kết tạo lại mật khẩu thông qua email này.</p>
                                                    <div className="signup-wrapper">
                                                        <input id='email'
                                                            type='text'
                                                            className='validate'
                                                            name='email'
                                                            {...register('email')}
                                                            placeholder="Nhập email của bạn" />

                                                        {errors.email && (
                                                            <span className='helper-text red-text'>
                                                                {errors.email.message}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="sign-button mb-20">
                                                        <button type='submit' className="sign-btn">Gửi</button>
                                                    </div>
                                                    <div className="registered wrapper">
                                                        <div className="not-register">
                                                            <span>Quay về?</span>
                                                            <span><Link href="/login" legacyBehavior><a>Đăng nhập</a></Link></span>
                                                        </div>
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

export default ForgotPassword;