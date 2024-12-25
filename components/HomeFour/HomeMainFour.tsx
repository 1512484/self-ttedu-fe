import HeroSectionFour from "./HeroSectionFour";
import IntroSection from "./IntroSection";
import BenefitSection from "./BenefitSection";
import CourseSection from "./CourseSection";
import PartnerSection from "./PartnerSection";
import ArticleSection from "./ArticleSection";
import Head from "next/head";

const HomeMainFour = () => {
    return (
        <>
            <Head>
                <title>Thành Tuyên EDU</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <HeroSectionFour />
                <IntroSection />
                <BenefitSection />
                <CourseSection />
                <PartnerSection />
                <ArticleSection />
            </main>
        </>
    )
}

export default HomeMainFour;