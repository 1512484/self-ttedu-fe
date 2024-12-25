import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import getImage from '../../../../helpers/getImage';
import { IMenu } from '../../../../interfaces/menu';

const MobileMenu = ({ data, setMenuOpen, menuOpen }) => {

    const [menuActive, setMenuActive] = useState(false)

    const router = useRouter()
    const [path, setPath] = useState("")

    const [menus, setMenus] = useState([])
    const [childMenus, setChildMenus] = useState([])

    useEffect(() => {
        setPath(router.pathname)
        fetch(
            `${process.env.APP_BACK_END_URL}/setting/menu/by-category?type=Header_Style_1`,
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
                setMenus(response.items.parentMenus);
                setChildMenus(response.items.childMenus);
            })
            .catch(err => console.error(err))
    }, [router])

    const openMobileMenu = (menuName: number) => {
        setMenuActive(!menuActive)
    };

    return typeof data !== 'undefined' && data?.mobileMenuData !== 'undefined' ? (
        <>
            {data && (
                <div className="fix">
                    <div className={menuOpen ? "side-info info-open" : "side-info"}>
                        <div className="side-info-content">
                            <div className="offset-widget offset-logo mb-40">
                                <div className="row align-items-center">
                                    <div className="col-9">
                                        <Link href="/" legacyBehavior><a><img src={getImage(data.site_header_logo)} alt="Logo" /></a></Link>
                                    </div>
                                    <div className="col-3 text-end"><button className="side-info-close" onClick={() => setMenuOpen(false)}><i className="fal fa-times"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="mm-menu mb-30 d-block d-xl-none">
                                <ul>
                                {menus && menus.map( (menu: IMenu, index: number) => (
                                <li key={`parent-${index}`} className={`${childMenus[menu.id] ? "has-droupdown active" : "has-droupdown"}`}><Link href={menu.url ?? "#"} legacyBehavior><a onClick={() => { openMobileMenu(index); }}>{menu.title}</a></Link>
                                    {childMenus[menu.id] && (
                                    <ul className={`sub-menu ${menuActive? ' active' : ''}`}>
                                        {childMenus[menu.id].map( (childMenu: IMenu, childIndex: number) => (
                                            (menu.id ==  childMenu.parent_id) && (
                                            <li key={childIndex}><Link href={childMenu.url ?? "#"} legacyBehavior><a>{childMenu.title}</a></Link></li>
                                            )
                                        ))}
                                    </ul>
                                    )}
                                </li>
                                ))}
                                </ul>
                            </div>
                            <div className="offset-widget offset_searchbar mb-30">
                                <div className="menu-search position-relative ">
                                    <form action="#" className="filter-search-input">
                                        <input type="text" placeholder="Search keyword" />
                                        <button><i className="fal fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="offset-widget offset_menu-top mb-20">
                                <div className="header-menu-top-icon mb-20">
                                    <a href={`tel:${data.site_header_phone}`}><i className="fas fa-phone-alt"></i>{ data.site_header_phone }</a>
                                    <a href={`mailto:${data.site_header_email}`}><i className="fal fa-envelope"></i>{data.site_header_email}</a>
                                    <div className='d-flex mobile-menu-address'>
                                        <i className="fal fa-map-marker-alt"></i><span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.site_header_address) }} />
                                    </div>
                                </div>
                            </div>
                            <div className='mobile-login-btn'>
                                <Link href={data.site_header_login_url ?? "/"} legacyBehavior><a className="edu-thard-btn d-block d-sm-none mb-20">{data.site_header_login_text}</a></Link>
                                <Link href={data.site_header_signup_url ?? "/"} legacyBehavior><a className="user-btn-sign-up edu-btn d-block d-sm-none">{data.site_header_signup_text}</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null
};

export default MobileMenu;