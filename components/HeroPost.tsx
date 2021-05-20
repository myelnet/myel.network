import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroPost.module.css';
import {Author} from '../types';
import DateFormatter from './DateFormatter';
import Avatar from './Avatar';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  const path = `/blog/${slug}`;
  return (
    <section>
      <div className={styles.cover}>
        <Link href={path}>
          <a>
            <div className={styles.image}>
              <Image src={coverImage} alt={title} layout="fill" />
            </div>
          </a>
        </Link>
      </div>
      <div className={styles.body}>
        <div>
          <h3>
            <Link href={path}>
              <a>{title}</a>
            </Link>
          </h3>
          <div>
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p>{excerpt}</p>
          <Avatar {...author} />
        </div>
      </div>
    </section>
  );
}
