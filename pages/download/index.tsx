import type { NextPage, GetStaticProps } from 'next';

import Page from '@components/Page';
import PageDownload from '@components/PageDownload';
import * as data from '@utils/data';

type HomeProps = {
  copy: Record<string, string>;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const copy = await data.copy();

  return {
    props: {
      copy
    }
  };
};
const HomePage: NextPage = ({ copy }: HomeProps) => {
  return (
    <Page copy={copy}>
      <PageDownload />
    </Page>
  );
};

export default HomePage;
