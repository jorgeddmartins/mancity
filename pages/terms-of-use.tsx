import Page from '@components/Page';
import * as data from '@utils/data';
import { GetStaticProps } from 'next';

import PageTermsOfUse from '@components//PageTermsOfUse';

type TermsProps = {
  copy: Record<string, string>;
};

export const getStaticProps: GetStaticProps<TermsProps> = async () => {
  const copy = await data.copy();

  return {
    props: {
      copy
    }
  };
};

const Page404 = ({ copy }: TermsProps) => {
  return (
    <Page copy={copy} noCookies allowDesktop>
      <PageTermsOfUse />
    </Page>
  );
};

export default Page404;
