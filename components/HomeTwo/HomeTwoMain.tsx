import React from 'react';
import dynamic from 'next/dynamic';
import FeatureSection from '../Home/FeatureSection';
import AboutSection from './AboutSection';
import BlogSection from './BlogSection';
import CounterSection from './CounterSection';
import HeroSectionTwo from './HeroSectionTwo';
import PartnerSection from './PartnerSection';
import SkillSection from './SkillSection';
import TeacherSection from './TeacherSection';
import ZoomSection from './ZoomSection';
const CourseTab = dynamic(() => import('../Elements/Tabs/CourseTab'), {
    ssr: false
})
const CategorySlider = dynamic(() => import('../Elements/Slider/CategorySlider'), {
    ssr: false
})

const HomeTwoMain = () => {
    return (
        <main>
            <HeroSectionTwo />
            <CounterSection />
            <AboutSection />
            <CategorySlider />
            <CourseTab />
            <FeatureSection />
            <PartnerSection /> 
            <TeacherSection />
            <ZoomSection />
            <SkillSection />
            <BlogSection />
        </main>
    );
};

export default HomeTwoMain;