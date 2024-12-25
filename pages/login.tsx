import { useEffect, useState, useMemo } from 'react';
import type { IUser, ILogin } from '../interfaces/users'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { requiredValidationMessage } from '../helpers/constants';
import HeaderFour from '../components/Layouts/Header/HeaderFour/HeaderFour';
import Breadcrumb from '../components/Common/Breadcrumb';
import Footer from '../components/Layouts/Footer/Default/Footer';

import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../hooks/useStorage';
import getImage from '../helpers/getImage';

const Login = () => {
  const router = useRouter();
  interface iSectionDataType {
    site_login_title: string;
    site_login_img: string
    site_login_signin_text: string
    site_login_check_text: string
    site_login_register_text: string
    site_login_signup_text: string
    site_login_forget_text: string
  };
  const [sectionData, setSectionData] = useState<iSectionDataType>()
  const [pageData, setPageData] = useState({})
  const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
  if (UserObj?.id != null) {
    router.push('/');
  }

  const validationSchema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          // .email()
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

  // ${process.env.APP_BACKEND_HOME_URL}
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


  const handleLogin = async (data: ILogin) => {

    initialize();

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
  };

  const loginResponse = (response: any) => {
    if (response.success == true) {
      let userData = JSON.stringify({
        id: response.data.id,
        end_at: response.data?.order?.end_at,
        email: response.data.email,
        phone: response.data.phone,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        role: response.data.role,
        city: response.data?.student_profile?.city ?? "",
        zip: response.data?.student_profile?.zip ?? "",
        country: response.data?.student_profile?.country ?? "",
        street_address: response.data?.student_profile?.street_address ?? "",
      })
      storage.setItem(LOCAL_STORAGE_KEYS.APP_TOKEN, response.data.bearer_token)
      storage.setItem(LOCAL_STORAGE_KEYS.APP_USER, userData)
      router.push('/my-profile');
    }
  }

  useEffect(() => {
    fetch(
      `${process.env.APP_BACK_END_URL}/setting/inner-page/login`,
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
      'title': "Đăng nhập",
      'sub_title': res.data?.site_login_title,
      'image': res.data?.site_login_banner_img,
      'description': res.data?.site_login_description,
      'keywords': res.data?.site_login_keywords,
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
                            <h3>Đăng nhập</h3>
                          </div>
                          <div className="signup-thumb">
                            <img src={getImage(sectionData.site_login_img)} alt="image not found" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="signup-form-wrapper">
                          <div className="signup-wrapper">
                            <input id='email'
                              type='text'
                              className='validate'
                              name='email'
                              {...register('email')}
                              placeholder='Nhập email của bạn' />

                            {errors.email && (
                              <span className='helper-text red-text'>
                                {errors.email.message}
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
                                {errors.password.message}
                              </span>
                            )}
                          </div>
                          <div className="signup-action">
                            <div className="course-sidebar-list">
                              <input className="signup-checkbo" type="checkbox" id="sing-in" />
                              <label className="sign-check" htmlFor="sing-in"><span>Lưu mật khẩu</span></label>
                            </div>
                          </div>
                          <div className="sign-button mb-20">
                            <button type='submit' className="sign-btn">Đăng nhập</button>
                          </div>
                          <div className="registered wrapper">
                            <div className="not-register">
                              <span>Chưa có tài khoản?</span><span><Link href="/registration" legacyBehavior><a>Đăng ký</a></Link></span>
                            </div>
                            <div className="forget-password">
                              <Link href="/forgot-password" legacyBehavior><a>Quên mật khẩu?</a></Link>
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

export default Login;