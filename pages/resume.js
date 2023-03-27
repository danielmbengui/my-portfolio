import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import Test from '../components/resume/Test';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_LANGAGES, ARRAY_NAMEPACES } from '../_mocks_/_settings_items_';

export default function ResumePage() {

    const router = useRouter();
const [component, setComponent] = useState(<></>);
    useEffect(() => {
if (router.isReady && window) {
    setComponent(<PDFViewer 
    width={'100%'}
    height={'100%'}
    showToolbar
    >
        <Test />
      </PDFViewer>)
}
    }, [])
    return (
<div style={{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
}}>
{component}
</div>
    )
} 

export async function getStaticProps({ locale }) {
    return {
        props: {
          //tabPrice: response,
            ...(await serverSideTranslations(locale, ARRAY_NAMEPACES, null, ARRAY_LANGAGES)),
            // Will be passed to the page component as props
        },
    }
  }