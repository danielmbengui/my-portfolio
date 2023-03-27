import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import Test from '../components/resume/Test';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_LANGAGES, ARRAY_NAMEPACES } from '../_mocks_/_settings_items_';
import ReactPDF from '@react-pdf/renderer';
import { useDeviceMode } from '../contexts/DeviceModeProvider';
import { Button, Stack } from '@mui/material';
import { isBot } from 'next/dist/server/web/spec-extension/user-agent';

export default function ResumePage() {
const {isMobile, isTablet, isLaptop} = useDeviceMode();
    const router = useRouter();
const [component, setComponent] = useState();
    useEffect(() => {

if (router.isReady && window) {
    setComponent(<></>)
    var display = 'none';
    var displayPdf = 'none';
    var displayButtonDownload = 'none';
    if (isTablet) {
        display = 'flex';
        displayPdf = 'none';
        displayButtonDownload = 'flex';
    } else {
        display = 'none';
        displayPdf = 'flex';
        displayButtonDownload = 'none';
    }
    setComponent(<Stack direction={'row'} py={ isTablet ? 30 : 0} justifyContent={'center'} alignItems={'center'}>
        <div style={{display:displayButtonDownload}}>
        <PDFDownloadLink document={<Test />} fileName="cv-daniel-mbengui.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : <Button variant='contained'>{`'Download my CV!'`}</Button>
        }
      </PDFDownloadLink>
            </div>
            <div style={{
                display: displayPdf,
                position:'absolute',
                top:0,
                left:0,
                right:0,
                bottom:0,
            }}>
            <PDFViewer 
            id={'resume'}
            width={'100%'}
            height={'100%'}
            showToolbar
            >
                <Test />
              </PDFViewer>
            </div>
        </Stack>)
}
    }, [isTablet])
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