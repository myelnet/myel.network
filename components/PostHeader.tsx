import * as React from 'react';

import DateFormatter from './DateFormatter';
import Avatar from './Avatar';
import Image from 'next/image';
import {Author} from '../types';
import styles from './PostHeader.module.css';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export default function PostHeader({title, coverImage, date, author}: Props) {
  return (
    <header className={styles.container}>
      <h1>{title}</h1>
      <div className={styles.avatarWide}>
        <Avatar {...author} />
      </div>
      <div className={styles.cover}>
        <Image src={coverImage} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.avatar}>
        <Avatar {...author} />
      </div>
      <div className={[styles.textColumn, styles.date].join(' ')}>
        <DateFormatter dateString={date} />
      </div>
    </header>
  );
}
