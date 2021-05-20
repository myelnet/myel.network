import * as React from 'react';
import NextHead from 'next/head';

type Props = {
  title: string;
  description: string;
  siteName?: string;
  currentURL: string;
  previewImage?: string;
  type?: string;
  publishedTime?: string;
};

export default function Head({
  title,
  description,
  siteName,
  currentURL,
  previewImage,
  type,
  publishedTime,
}: Props) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type ?? 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName ?? 'Myel'} />
      <meta property="og:url" content={currentURL} />
      <meta
        property="og:image"
        content={previewImage ?? '/myel_icon_412x412.ong'}
      />
      <meta property="og:description" content={description} />
      {!!publishedTime && (
        <meta property="og:article:published_time" content={publishedTime} />
      )}
    </NextHead>
  );
}
