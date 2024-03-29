import * as React from 'react';
import {useLayoutEffect} from 'react';
import Layout from '../../components/Layout';
import HeroPost from '../../components/HeroPost';
import PostCollection from '../../components/PostCollection';
import {getAllPosts} from '../../lib/getPosts';
import {Post} from '../../types';
import Head from '../../components/Head';

type Props = {
  allPosts: Post[];
};

export default function BlogIndex({allPosts}: Props) {
  return (
    <>
      <Head
        title="Myel | Blog"
        description="Read the latest about development of the Myel network."
        currentURL="https://www.myel.network"
      />
      <Layout
        title="Blog"
        subtitle="Read the latest about development of the Myel network.">
        {allPosts.length > 0 && <PostCollection posts={allPosts} />}
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: {allPosts},
  };
};
