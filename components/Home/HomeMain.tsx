import React from 'react';
import dynamic from 'next/dynamic';
import BrowserCourseSection from './BrowserCourseSection';
import EducationSection from './EducationSection';
import FeatureSection from './FeatureSection';
import HeroSection from './HeroSection';
import StudentChooseSection from './StudentChooseSection';
import TopCategorySection from './TopCategorySection';
import CourseTab from '../Elements/Tabs/CourseTab';

const BrandSlider = dynamic(() => import('../Elements/Slider/BrandSlider'), {
  ssr: false
})
const TestimonialSlider = dynamic(() => import('../Elements/Slider/TestimonialSlider'), {
  ssr: false
})

const HomeMain = () => {
  return (
    <main>
      <HeroSection />
      <TopCategorySection />
      <CourseTab />
      <FeatureSection />
      <StudentChooseSection />
      <TestimonialSlider />
      <BrowserCourseSection />
      <EducationSection />
      <BrandSlider />
    </main>
  );
};

export default HomeMain;