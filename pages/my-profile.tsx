import Footer from '../components/Layouts/Footer/Default/Footer';
import HeaderFour from '../components/Layouts/Header/HeaderFour/HeaderFour';
import MyProfileMain from '../components/MyProfile/MyProfileMain';
import MyInstructorProfileMain from '../components/MyInstructorProfile/MyInstructorProfileMain';
import storage from "local-storage-fallback"
import { LOCAL_STORAGE_KEYS } from '../hooks/useStorage';

export default function StudentProfile() {
  const UserObj = JSON.parse(storage.getItem(LOCAL_STORAGE_KEYS.APP_USER));
  return typeof UserObj?.role !== 'undefined' ? (
    <>
      {/* <HeaderFour /> */}
      {UserObj?.role == 'Student' ?
        <MyProfileMain />
        :
        <MyInstructorProfileMain />
      }
      {/* <Footer /> */}
    </>
  ) : null
}