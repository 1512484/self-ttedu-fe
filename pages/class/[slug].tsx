import ClassDetailsMain from '../../components/ClassDetails/ClassDetailsMain';
import Footer from '../../components/Layouts/Footer/Default/Footer';
import HeaderFour from '../../components/Layouts/Header/HeaderFour/HeaderFour';

export default function ClassDetails() {

    return (
        <>
            {<HeaderFour />}
            <ClassDetailsMain />
            <Footer />
        </>
    )
}