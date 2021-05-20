import * as React from 'react';
import NextHead from 'next/head';

type Props = {
  title: string;
  description: string;
  siteName?: string;
  currentURL: string;
  previewImage?: string;
};

export default function Head({
  title,
  description,
  siteName,
  currentURL,
  previewImage,
}: Props) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName ?? 'Myel'} />
      <meta property="og:url" content={currentURL} />
      <meta
        property="og:image"
        content={previewImage ?? '/myel_icon_412x412.ong'}
      />
      <meta property="og:description" content={description} />
    </NextHead>
  );
}
