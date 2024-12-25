import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSticky from '../../../../hooks/useSticky';
import MobileMenu from '../HeaderOne/MobileMenu';
import HeaderMenu from '../HeaderOne/HeaderMenu';
import DropdownCategory from '../HeaderOne/DropdownCategory';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../../../hooks/useStorage';
import HeaderTopTwo from '../HeaderTwo/HeaderTopTwo';
import getImage from '../../../../helpers/getImage';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISearchFilter } from '../../../../interfaces/SearchFilter';
import DOMPurify from 'isomorphic-dompurify';

const HeaderFour = () => {
    // sticky nav
    const { sticky } = useSticky();
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter()
    const [path, setPath] = useState("")
    interface iDataType {
        site_header_logo : string;
        site_header_white_logo : string;
        site_header_category_icon: string
        site_header_category_title: string
        site_header_login_text: string
        site_header_signup_text: string
    };
    const [data, setData] = useState<iDataType>()
    const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
    const logout = () => {
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_TOKEN)
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_USER)
        storage.clear()
        router.push('/login');
    }

    const validationSchema = useMemo(
        () =>
            yup.object({

            }),
        [],
    );

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<ISearchFilter>({
        resolver: yupResolver(validationSchema),
    });

    const handleSearchFilter = async (data: ISearchFilter) => {
        router.push('/courses?search='+ data.search);
    };

    useEffect(() => {
        setPath(router.pathname)
        fetch(
            `${process.env.APP_BACK_END_URL}/site-setting/header`,
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
    }, [router])

    return typeof data?.site_header_logo !== 'undefined' ? (
        <header>
            {<HeaderTopTwo data={data} />}
            {data && (
                <div className={sticky ? "sticky header-area sticky-header" : "header-area sticky-header"}>
                    <div className="container-fluid">
                        <div className="header-main-wrapper">
                            <div className="row align-items-center">
                                <div className="col-xxl-7 col-xl-9 col-lg-7 col-md-5 col-6">
                                    <div className="header-left d-flex align-items-center">
                                        <div className="header-logo mr-50">
                                            <Link href="/" legacyBehavior><a><img src={getImage(data.site_header_logo)} alt="logo" /></a></Link>
                                        </div>
                                        <div className="category-menu d-none">
                                            <div className="Category-click">
                                                <figure className="cattext">
                                                    <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.site_header_category_icon) }} />
                                                    <span className="text">{data.site_header_category_title}</span></figure>
                                                <div className="dropdown-category">
                                                    <nav>
                                                        <DropdownCategory />
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-menu d-none d-xl-block">
                                            <nav id="mobile-menu">
                                                <HeaderMenu />
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-5 col-xl-3 col-lg-5 col-md-7 col-6">
                                    <div className="header-right d-flex align-items-center justify-content-end">
                                        <div className="header-search d-none d-xxl-block mr-30">
                                            <form onSubmit={handleSubmit(handleSearchFilter)} autoComplete='off'>
                                                <div className="search-icon p-relative">
                                                    <input 
                                                        name="search" 
                                                        type="text" 
                                                        placeholder="Search courses..." 
                                                        {...register('search')} />
                                                    <button type="submit"><i className="fas fa-search"></i></button>
                                                </div>
                                            </form>
                                        </div>
                                        {UserObj?.id ==  null ?
                                        <>
                                        <div className="user-btn-inner p-relative d-none d-md-block">
                                            <div className="user-btn-wrapper">
                                                <div className="user-btn-content">
                                                    <Link href="/login" legacyBehavior><a className="user-btn-sign-in">{data.site_header_login_text}</a></Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-none d-md-block">
                                            <Link href="/registration" legacyBehavior><a className="user-btn-sign-in">{data.site_header_signup_text}</a></Link>
                                        </div>
                                        </>
                                        :
                                            <ul className='bd-profile-dropdown'>
                                                <li className="menu-item-has-children"><button type='button' className="side-toggle">Profile <i className="far fa-chevron-down"></i></button>
                                                    <ul className="sub-menu">
                                                        <li className='pb-0'><Link href="/my-profile" legacyBehavior><a>Hi, {UserObj.first_name} {UserObj.last_name}</a></Link></li>
                                                        <li><Link href="/my-profile" legacyBehavior><a>Edit Account</a></Link></li>
                                                        <li>
                                                            <button type='button' className="side-toggle header-3" onClick={() => { logout() }}>Logout</button>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        }
                                        <div className="menu-bar d-xl-none ml-20">
                                            <button type='button' className="side-toggle" onClick={() => { setMenuOpen(!menuOpen) }}>
                                                <div className="bar-icon">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <MobileMenu data={data} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div onClick={() => setMenuOpen(false)} className={menuOpen ? "offcanvas-overlay overlay-signin" : "offcanvas-overlay"}></div>
        </header>
    ) : null
};

export default HeaderFour;