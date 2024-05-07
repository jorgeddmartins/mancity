import { useContext, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { PageContext } from './Page';
import FormCRMSignup from './FormCRMSignup';
import s from './PageDownload.module.scss';
import Button from './Button';
import Error from './Error';
import { convertSrcToFile } from '@utils/file';
import { download, shareImage } from '@utils/sharing';
import { ReactComponent as Arrowdownload } from '../assets/img/arrowdownload.svg';
import { ReactComponent as Logo } from '../assets/img/logo.svg';
import { ReactComponent as Bottomicons } from '../assets/img/bottomicons.svg';
import { sendEvent } from '@utils/analytics';

const PageDownload: NextPage = () => {
  const router = useRouter();
  const { copy } = useContext(PageContext);

  const [isUserRegisteredCRM, setIsUserRegisteredCRM] =
    useState<boolean>(false);
  const [is404, setIs404] = useState(false);

  const imgUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_BLOB_STORAGE}/${router?.query?.uuid}.jpg?${process.env.NEXT_PUBLIC_BLOB_SASTOKEN}`;
  }, [router]);

  const downloadImg = async () => {
    const fileBlob = await convertSrcToFile(
      imgUrl,
      'your-pose-with-the-pros.jpg'
    );
    sendEvent('image_download', {});
    shareImage(fileBlob);
  };

  useEffect(() => {
    if (!router.query.uuid && router.isReady) {
      setIs404(true);
    }
  }, [router]);

  return is404 ? (
    <Error notFound />
  ) : (
    <>
      <section className={s.wrapDownload}>
        <div className={s.contentDownload}>
          <div className={s.logo}>
            <Logo />
          </div>
          <h1>{copy('download.subtitle')}</h1>
          <div className={s.imageContent}>
            <Image
              width="310"
              alt={copy('download.imgcaption')}
              height="610"
              className={s.silhouettes}
              src={imgUrl}
            />
          </div>
          <div className={s.bottomContent}>
            <Button onClick={downloadImg}>
              {copy('download.CTA')} <Arrowdownload />
            </Button>
            <Bottomicons />
          </div>
        </div>
      </section>
      <FormCRMSignup
        onSignup={() => {
          setIsUserRegisteredCRM(true);
        }}
        show={!isUserRegisteredCRM}
      />
    </>
  );
};

export default PageDownload;
