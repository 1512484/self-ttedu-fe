import React from 'react';
import BlogSection from '../HomeTwo/BlogSection';
import AcademicCourse from './AcademicCourse';
import CampusSection from './CampusSection';
import CounterSectionThree from './CounterSectionThree';
import EventSection from './EventSection';
import GallaryInstaSection from './GallaryInstaSection';
import HeroSectionThree from './HeroSectionThree';
import UniversityCardSection from './UniversityCardSection';
import UniversityMessage from './UniversityMessage';

const HomeThreeMain = () => {
    return (
        <main>
            <HeroSectionThree />
            <UniversityCardSection />
            <UniversityMessage />
            <AcademicCourse />
            <CounterSectionThree />
            <CampusSection />
            <EventSection />
            <BlogSection />
            <GallaryInstaSection />
        </main>
    );
};

export default HomeThreeMain;