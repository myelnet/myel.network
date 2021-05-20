import * as React from 'react';

import {Post} from '../types';
import PostPreview from './PostPreview';
import styles from './PostCollection.module.css';

type Props = {
  posts: Post[];
};

export default function PostCollection({posts}: Props) {
  return (
    <section>
      <h2 className={styles.title}>Latest Posts</h2>
      <div className={styles.container}>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
