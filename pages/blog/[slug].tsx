import * as React from 'react';
import {useLayoutEffect} from 'react';
import {useRouter} from 'next/router';
import {Post} from '../../types';
import Layout from '../../components/Layout';
import PostHeader from '../../components/PostHeader';
import PostBody from '../../components/PostBody';
import {getPostBySlug, getAllPosts} from '../../lib/getPosts';
import markdownToHtml from '../../lib/markdownToHtml';

type Props = {
  post: Post;
};

export default function BlogPost({post}: Props) {
  useLayoutEffect(() => {
    document.body.dataset.theme = 'light';
  });
  return (
    <Layout>
      <article>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
      </article>
    </Layout>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({params}: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}
