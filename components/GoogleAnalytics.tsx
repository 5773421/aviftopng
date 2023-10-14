import React from 'react';

export default function GoogleAnalytics({ id }: any) {
  if (!id) {
    return null;
  }

  const scriptContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${id}');
  `;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    </>
  );
}
