import Link from "next/link";
import { useState } from "react";

const NavMenuItems = ({ className = "" }) => {
    const menuItems = [
        {
            key: "student-courses",
            title: "Vào học",
            to: "/student-courses"
        },
        {
            key: "instructors",
            title: "Giáo viên",
            to: "/instructors"
        },
        {
            key: "sources",
            title: "Tài nguyên",
            children: [
                {
                    key: "courses",
                    title: "Khóa học",
                    to: "/courses"
                },
                {
                    key: "about",
                    title: "Giới thiệu",
                    to: "/about"
                },
                // {
                //     key: "contact",
                //     title: "Liên hệ",
                //     to: "/contact"
                // },
                {
                    key: "faqs",
                    title: "Câu hỏi thường gặp",
                    to: "/faqs"
                }
            ]
        },
        {
            key: "blogs",
            title: "Tin tức",
            to: "/blogs"
        },
        // {
        //     key: "subscription",
        //     title: "Mua khoá học",
        //     to: "/subscription"
        // }
        {
            key: "contact",
            title: "Liên hệ",
            to: "/contact"
        },
    ];

    const [openItem, setOpenItem] = useState(null);

    return (
        <nav className={`${className} nav-menu-items`}>
            <ul>
                {
                    menuItems?.map?.((item, index: number) => (
                        <li key={index} onClick={() => {
                            setOpenItem(item.children?.length && item?.key !== openItem?.key ? item : null);
                        }}>
                            {
                                !item?.children?.length ?
                                    <Link href={item.to ?? "#"} legacyBehavior><a>{item.title}</a></Link>
                                    :
                                    <div className="nav-dropdown">
                                        <Link href="#" legacyBehavior>
                                            <a className="nav-dropdown-btn">
                                                {item.title}
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.5 3.75L13.75 10L7.5 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </a>
                                        </Link>
                                        <ul className={`nav-dropdown-menu ${openItem?.key === item?.key && 'open'}`}>
                                            {
                                                item.children.map((child, i) => (
                                                    <li key={i} className="nav-dropdown-menu-item">
                                                        <Link href={child.to ?? "#"} legacyBehavior><a>{child.title}</a></Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default NavMenuItems;