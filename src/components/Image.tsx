import * as React from 'react';
import {useState} from 'react';
import styles from './Image.module.css';

type ProgressiveImageProps = {
  src?: string;
  srcSet?: string;
  ratio?: 'high' | 'long' | 'sans';
  className?: string;
  alt: string;
  plh?: string;
};

const ProgressiveImage = ({
  src,
  srcSet,
  alt,
  plh,
  ratio,
  className,
}: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(!plh);
  return (
    <div
      className={[
        styles.container,
        ratio === 'long' ? styles.long : ratio === 'high' ? styles.high : '',
        className,
      ].join(' ')}>
      {plh ? <img alt={alt} src={plh} className={styles.placeholder} /> : null}
      <img
        src={src}
        srcSet={srcSet}
        alt={alt}
        className={[styles.final, loaded ? styles.show : ''].join(' ')}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ProgressiveImage;
