import Link from 'next/link';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../../../../hooks/useStorage';
import useSticky from '../../../../hooks/useSticky';
import HeaderTop from './HeaderTop';
import SearchInput from './SearchInput';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavMenuItems from './NavMenuItems';

let windowWidth = 0;

const Header = () => {
    const { sticky } = useSticky();
    const router = useRouter();
    const { pathname } = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
    const logout = () => {
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_TOKEN)
        storage.removeItem(LOCAL_STORAGE_KEYS.APP_USER)
        storage.clear()
        router.push('/login');
    }


    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (windowWidth !== window.innerWidth) {
                setMenuOpen(false);
            }
            windowWidth = window.innerWidth;
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    useEffect(() => {
        if (!document?.body) return;
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
        let header = document.getElementById("header-five");
        let menu = document.getElementById("mobile-menu");
        let menuContent = document.querySelector("#mobile-menu > .menu-content") as HTMLDivElement;

        if (!header || !menu || !menuContent) return;

        if (header.classList?.contains("open")) {
            menu.style.top = header.clientHeight + "px";
            // menu.style.height = (Math.min(window.innerHeight, menuContent.clientHeight) - header.clientHeight) + "px";
            menu.style.height = window.innerHeight - header.clientHeight + "px";
            menu.style.opacity = '1';
        } else {
            menu.style.top = window.innerHeight * (-1) + "px";
            menu.style.opacity = '0';
        }

        if (window.innerHeight - header.clientHeight <= menuContent.clientHeight || true) {
            menuContent.style.height = '100%';
        } else {
            menuContent.style.height = 'auto';
        }
    }, [menuOpen]);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <HeaderTop />
            <header className={`${menuOpen ? 'open' : ''}`} id="header-five">
                <div className={`header-area sticky-header ${sticky && false ? 'sticky' : ''}`}>
                    <div className="container-fluid">
                        <div className="d-flex align-items-center header-main-wrapper main-wrapper">
                            <div className="header-logo">
                                <Link href="/" legacyBehavior>
                                    <a>
                                        <img
                                            src="/assets/img/logo/thanh-tuyen-logo.png"
                                            title="Thanh Tuyen Logo"
                                            alt="Thanh Tuyen Logo"
                                            width={48}
                                            height={48}
                                        />
                                    </a>
                                </Link>
                            </div>
                            <NavMenuItems className="d-none d-md-block" />
                            <SearchInput className="d-none d-md-block" />
                            {
                                isClient &&
                                <div className="login-wrapper">
                                    {
                                        UserObj?.id == null ?
                                            <Link href="/login" legacyBehavior>
                                                <a>
                                                    <button type="button" className="login-btn">Đăng nhập</button>
                                                </a>
                                            </Link>
                                            :
                                            <div className="nav-dropdown">
                                                <Link href="#" legacyBehavior>
                                                    <a className="nav-dropdown-btn">
                                                        Tài khoản
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </a>
                                                </Link>
                                                <ul className={`nav-dropdown-menu`}>
                                                    <li className="nav-dropdown-menu-item">
                                                        <Link href="/my-profile" legacyBehavior><a>Chào, {UserObj.first_name} {UserObj.last_name}</a></Link>
                                                    </li>
                                                    <li className="nav-dropdown-menu-item">
                                                        <Link href="/my-profile" legacyBehavior><a>Chỉnh sửa tài khoản</a></Link>
                                                    </li>
                                                    <li className="nav-dropdown-menu-item">
                                                        <Link href="#" legacyBehavior><a onClick={() => { logout() }}>Đăng xuất</a></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                    }
                                </div>
                            }
                            <div className="d-md-none menu-icon" onClick={() => { setMenuOpen(!menuOpen) }}>
                                {
                                    !menuOpen ?
                                        <img
                                            src="/assets/img/icon/menu.svg"
                                            title="Menu Icon"
                                            alt="Menu Icon"
                                            width={24}
                                            height={24}
                                        />
                                        :
                                        <img
                                            src="/assets/img/icon/close.svg"
                                            title="Close Icon"
                                            alt="Close Icon"
                                            width={24}
                                            height={24}
                                        />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
                <div className="menu-layout" onClick={() => { setMenuOpen(!menuOpen) }}></div>
                <div className="menu-content">
                    <SearchInput />
                    <NavMenuItems />
                    <div className="contact">
                        <p>Mail: support@thanhtuyen.edu.com</p>
                        <p>Hotline: 1900 xxxx</p>
                    </div>
                    <div className="social">
                        <p>Kết nối với chúng tôi</p>
                        <div className="social-list">
                            <a href="https://facebook.com" target="_blank" className="social-item">
                                <img
                                    src="/assets/img/connect/facebook.svg"
                                    title="Facebook Icon"
                                    alt="Facebook Icon"
                                    width={16}
                                    height={16}
                                />
                            </a>
                            <a href="https://chat.zalo.me" target="_blank" className="social-item">
                                <img
                                    src="/assets/img/connect/zalo.svg"
                                    title="Zalo Icon"
                                    alt="Zalo Icon"
                                    width={16}
                                    height={16}
                                />
                            </a>
                            <a href="https://youtube.com" target="_blank" className="social-item">
                                <img
                                    src="/assets/img/connect/youtube.svg"
                                    title="Youtube Icon"
                                    alt="Youtube Icon"
                                    width={16}
                                    height={16}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;