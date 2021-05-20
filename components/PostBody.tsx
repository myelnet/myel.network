import * as React from 'react';
import styles from './PostBody.module.css';

type Props = {
  content: string;
};

export default function PostBody({content}: Props) {
  return (
    <div className={styles.text}>
      <div dangerouslySetInnerHTML={{__html: content}} />
    </div>
  );
}
