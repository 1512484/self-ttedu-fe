import React from 'react';

const Preloader = () => {
    return (
        <div id="loading">
            <div id="loading-center">
                <div id="loading-center-absolute">
                    <div className="loading-icon text-center d-flex flex-column align-items-center justify-content-center">
                        <img src="/assets/img/logo/thanh-tuyen-logo.png" alt="logo-img" />
                        <img className="loading-logo" src="/assets/img/logo/preloader.svg" alt="loading" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Preloader;


