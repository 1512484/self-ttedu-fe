import React from 'react';

const ContactFormSection = (data) => {
    return (
        <>
            <div className="section-title mb-50">
                <h2>{data.sectionData.site_contact_title}</h2>
            </div>
            <div className="contact-form">
                <form action="#">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="contact-from-input mb-20">
                                <input type="text" placeholder="Tên" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="contact-from-input mb-20">
                                <input type="text" placeholder="Số điện thoại" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="contact-from-input mb-20">
                                <input type="text" placeholder="Email" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="contact-select">
                                <select className="mb-20">
                                    <option defaultValue="Subject">Khóa học</option>
                                    <option defaultValue="Subject">Đội ngũ</option>
                                    <option defaultValue="Subject">Chính sách</option>
                                    <option defaultValue="Subject">Thông tin chung</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="contact-from-input mb-20">
                                <textarea placeholder="Nhập thông tin..." name="message"></textarea>
                            </div>
                        </div>
                        <div className="colxl-2 ">
                            <div className="cont-btn mb-20">
                                <button type='button' className="cont-btn">{data.sectionData.site_contact_btn_text}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactFormSection;