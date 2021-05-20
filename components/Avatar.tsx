import * as React from 'react';
import Image from 'next/image';
import styles from './Avatar.module.css';

type Props = {
  name: string;
  picture: string;
};

export default function Avatar({name, picture}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={picture} alt="Avatar" height={48} width={48} />
      </div>
      <div className={styles.label}>{name}</div>
    </div>
  );
}
