import React from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import WebinarsContent from './WebinarsContent';

const WebinarsMain = () => {
    return (
        <>
            <main>
                <Breadcrumb breadcrumbTitle="Webinars" breadcrumbSubTitle="Webinars" />
                <WebinarsContent />
            </main>
        </>
    );
};

export default WebinarsMain;