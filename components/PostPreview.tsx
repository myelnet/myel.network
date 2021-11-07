import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DateFormatter from './DateFormatter';
import Avatar from './Avatar';
import {Author} from '../types';
import styles from './PostPreview.module.css';
import backroundBlur from '../public/BackgroundBlur.png';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  const path = `/blog/${slug}`;
  return (
    <div className={styles.preview}>
      <div className={styles.framebackground}>
        <Image
          src={backroundBlur}
          alt="blur"
          height={500}
          width={900}
          layout="fixed"
        />
      </div>

      <div className={styles.date}>
        <DateFormatter dateString={date} />
      </div>
      <h3>
        <Link href={path}>{title}</Link>
      </h3>
      <div className={styles.cover}>
        <Link href={path}>
          <a>
            <Image
              src={coverImage}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
