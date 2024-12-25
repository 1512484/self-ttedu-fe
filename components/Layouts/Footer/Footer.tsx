import Link from "next/link";
import { motion } from "motion/react"

const Footer = () => {
    const facilities = Array.from(Array(3), _ => ({
        name: "Thành Tuyên 1",
        address: "88 Lê Lợi, Tuyên Quang, Vietnam"
    }));

    const generalLinks = [
        {
            title: "Giới thiệu",
            to: "/about"
        },
        {
            title: "Quy định chung",
            to: "/content/terms-conditions"
        },
        {
            title: "Hướng dẫn thanh toán",
            to: "/content/refund-policy"
        },
        {
            title: "Điều kiện giao dịch",
            to: "/content/refund-policy"
        },
        {
            title: "Chính sách bảo mật",
            to: "/content/privacy-policy"
        },
        {
            title: "Thông tin liên hệ",
            to: "/contact"
        }
    ]

    return (
        <footer className="footer">
            <div className="container-fluid">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="main-wrapper footer-wrapper"
                >
                    <div className="footer-top">
                        <div className="footer-col">
                            <Link href="/" legacyBehavior>
                                <a>
                                    <img
                                        src="/assets/img/logo/footer-thanh-tuyen-logo.png"
                                        title="Thanh Tuyen Logo"
                                        alt="Thanh Tuyen Logo"
                                        width={104}
                                        height={104}
                                        className="logo"
                                    />
                                </a>
                            </Link>
                            <p className="owner-name">Hệ thống Giáo dục Trực tuyến <span>Thành Tuyên EDU</span></p>
                        </div>
                        <div className="footer-col">
                            <p className="col-title">CƠ sở</p>
                            <ul>
                                {
                                    facilities?.map?.((facility, index) => (
                                        <li key={index}>
                                            <p className="item-title">{facility.name}</p>
                                            <p className="item-subtitle">{facility.address}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="footer-col">
                            <p className="col-title">Tổng quát</p>
                            <ul>
                                {
                                    generalLinks?.map?.((link, index) => (
                                        <li key={index}>
                                            <Link href={link.to} legacyBehavior>
                                                <a className="item-title">{link.title}</a>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="footer-col">
                            <p className="col-title">Kết nối với chúng tôi</p>
                            <ul className="social">
                                <li>
                                    <a href="https://facebook.com" target="_blank">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.2" d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" fill="currentColor" />
                                            <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 11H19C18.2044 11 17.4413 11.3161 16.8787 11.8787C16.3161 12.4413 16 13.2044 16 14V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://youtube.com" target="_blank">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.2" d="M27.8466 8.50022C27.6721 7.40168 26.5962 6.38453 25.5 6.25886C19.1855 5.56736 12.8145 5.56736 6.5 6.25886C5.40344 6.3845 4.32813 7.40177 4.15344 8.50022C3.38879 13.471 3.38879 18.5295 4.15344 23.5002C4.32806 24.5987 5.4035 25.616 6.5 25.7416C12.8145 26.4331 19.1855 26.4331 25.5 25.7416C26.5967 25.6161 27.6721 24.5986 27.8466 23.5002C28.6112 18.5295 28.6112 13.471 27.8466 8.50022ZM14 20.0002V12.0002L20 16.0002L14 20.0002Z" fill="currentColor" />
                                            <path d="M25.5 25.7416C19.1855 26.4331 12.8145 26.4331 6.5 25.7416C5.4035 25.616 4.32806 24.5987 4.15344 23.5002C3.38879 18.5295 3.38879 13.471 4.15344 8.50022C4.32813 7.40177 5.40344 6.3845 6.5 6.25886C12.8145 5.56736 19.1855 5.56736 25.5 6.25886C26.5962 6.38453 27.6721 7.40168 27.8466 8.50022C28.6112 13.471 28.6112 18.5295 27.8466 23.5002C27.6721 24.5986 26.5967 25.6161 25.5 25.7416Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20 16L14 12V20L20 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <p className="col-title">Hỗ trợ trực tuyến</p>
                            <ul>
                                <li>
                                    <a href="tel:1900xxxx" target="_blank" className="item-title">1900 xxxx</a>
                                </li>
                                <li>
                                    <a href="mailto:support@Thanhtuyen.edu.vn" target="_blank" className="item-title">support@Thanhtuyen.edu.vn</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        @2024 Thành Tuyên EDU
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer;