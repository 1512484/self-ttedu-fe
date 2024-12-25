import React, { useEffect } from 'react';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Header from "../components/Layouts/Header/HeaderFive/Header";
import Footer from "../components/Layouts/Footer/Footer";
import ContactGroup from '../components/Layouts/ContactGroup';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../redux/store';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';
import '../styles/chatbot.scss'
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://n8n.vn.xuantan97.com/webhook/dc84419f-f99e-4407-8155-bee777993fc6/chat',
      initialMessages: [
        'Xin chào! 👋',
        'Tôi là TTEDU. Tôi có thể giúp gì cho bạn?'
      ],
      i18n: {
        en: {
          title: 'TTEDU',
          subtitle: "",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
          closeButtonTooltip: 'X'
        },
      },
    });
  }, []);
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800&family=Raleway:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/fontAwesome5Pro.css" />
        <link rel="stylesheet" href="/assets/css/flaticon.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </Head>

      <Header />

      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>

      <Footer />

      <ContactGroup />
    </>
  )
}

export default MyApp