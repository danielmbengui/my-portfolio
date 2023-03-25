import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Chatbot from 'react-chatbot-kit';
import config from '../utility/chatbot/config';
import ActionProvider from '../utility/chatbot/ActionProvider';
import MessageParser from '../utility/chatbot/MessageParser';
import LinksBar from '../components/layouts/LinksBar';
import SectionsBar from '../components/layouts/SectionsBar';
import useWindowSize from '../hooks/useWindowSize';
import { Box } from '@mui/system';
import MobileHeader from '../components/layouts/MobileHeader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES } from '../_mocks_/_settings_items_';

const WebHome = () => {
  return (
    <>
      <div className={styles.links}>
        <LinksBar />
      </div>
      <Chatbot
        className={styles}
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
      <div className={styles.links}>
        <SectionsBar />
      </div>
    </>
  );
};

const MobileHome = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        minHeight: '100vh',
        height: '100vh',
      }}
    >
      <MobileHeader />
      <Chatbot
        className={styles}
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </Box>
  );
};

export default function Home() {
  const { width } = useWindowSize();

  return (
    <div className={styles.app}>
      <Head>
        <title>Inbox · Jeffrey Yu</title>
        <meta
          name="description"
          content="Jeffrey Yu | Software Engineer | Personal Website "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/me.ico" />
      </Head>
      {width > 740 ? <WebHome /> : <MobileHome />}
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
      props: {
        //tabPrice: response,
          ...(await serverSideTranslations(locale, ARRAY_NAMESPACES, null, ARRAY_LANGAGES)),
          // Will be passed to the page component as props
      },
  }
}