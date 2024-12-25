import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router'
import SignUp from './SignUp';

type ISignIn = {
    signinOpen: boolean,
    setSignInOpen: Dispatch<SetStateAction<boolean>>
}

const SignIn: React.FC<ISignIn> = ({setSignInOpen, signinOpen}) => {

    const [signupOpen, setSingUpOpen] = useState(false)

      const router = useRouter()
      const [path, setPath] = useState("")
      useEffect(() => {
        setPath(router.pathname)
      }, [router])

      return (
        <div className={signinOpen ? "signin-area open": "signin-area"}>
            <div className="signin-area-wrapper">
                <div className="signup-box text-center">
                    <div className="signup-text">
                        <h3>Sign in</h3>
                    </div>
                    <div className="signup-thumb">
                        <img src="assets/img/sing-up/sign-up.png" alt="image not found"/>
                    </div>
                </div>
                <div className="signup-form-wrapper">
                    <div className="signup-wrapper">
                        <input type="text" placeholder="Email or Username"/>
                    </div>
                    <div className="signup-wrapper">
                        <input type="text" placeholder="Password"/>
                    </div>
                    <div className="signup-action">
                        <div className="course-sidebar-list">
                            <input className="signup-checkbo" type="checkbox" id="sing-in"/>
                            <label className="sign-check" htmlFor="sing-in"><span>Remember me</span></label>
                        </div>
                    </div>
                    <div className="sign-button mb-20">
                        <button type='submit' className="sign-btn">SignIn now</button>
                    </div>
                    <div className="registered wrapper">
                        <div className="not-register">
                            <span>Not registered?</span><span><a href="#!" onClick={() => {setSingUpOpen(!signupOpen)}}>Sign up</a></span>
                        </div>
                        <div className="forget-password">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>
                    <div className="sign-social text-center">
                        <span>Or Sign- in with</span>
                    </div>
                    <div className="sign-social-icon">
                        <div className="sign-facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9.034" height="18.531" viewBox="0 0 9.034 18.531">
                                <path id="Path_212" data-name="Path 212"
                                    d="M183.106,757.2v-1.622c0-.811.116-1.274,1.39-1.274h1.621v-3.127h-2.664c-3.243,0-4.285,1.506-4.285,4.169v1.969h-2.085v3.127h1.969v9.265h4.054v-9.265h2.664l.347-3.243Z"
                                    transform="translate(-177.083 -751.176)" fill="#2467ec" />
                            </svg>
                            <a href="#">Facebook</a>
                        </div>
                        <div className="sign-gmail">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21.692" height="16.273" viewBox="0 0 21.692 16.273">
                                <g id="gmail" transform="translate(0 -63.953)">
                                    <path id="Path_8685" data-name="Path 8685"
                                    d="M1.479,169.418H4.93v-8.381l-2.26-3.946L0,157.339v10.6a1.479,1.479,0,0,0,1.479,1.479Z"
                                    transform="translate(0 -89.192)" fill="#0085f7" />
                                    <path id="Path_8686" data-name="Path 8686"
                                    d="M395.636,169.418h3.451a1.479,1.479,0,0,0,1.479-1.479v-10.6l-2.666-.248-2.264,3.946v8.381Z"
                                    transform="translate(-378.874 -89.192)" fill="#00a94b" />
                                    <path id="Path_8687" data-name="Path 8687"
                                    d="M349.816,65.436,347.789,69.3l2.027,2.541,4.93-3.7V66.176A2.219,2.219,0,0,0,351.2,64.4Z"
                                    transform="translate(-333.054)" fill="#ffbc00" />
                                    <path id="Path_8688" data-name="Path 8688"
                                    d="M72.7,105.365l-1.932-4.08L72.7,98.956l5.916,4.437,5.916-4.437v6.409L78.619,109.8Z"
                                    transform="translate(-67.773 -33.52)" fill="#ff4131" fillRule="evenodd" />
                                    <path id="Path_8689" data-name="Path 8689"
                                    d="M0,66.176v1.972l4.93,3.7V65.436L3.55,64.4A2.219,2.219,0,0,0,0,66.176Z"
                                    transform="translate(0)" fill="#e51c19" />
                                </g>
                            </svg>
                            <a href="#">Google</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offcanvas-overlay" onClick={() => setSignInOpen(false)}></div>
            <SignUp signupOpen={signupOpen} setSignUpOpen={setSingUpOpen} />
			<div onClick={() => setSingUpOpen(false)} className={signupOpen ? "offcanvas-overlay overlay-open" : "offcanvas-overlay"}></div>
        </div>

    )
}

export default SignIn;