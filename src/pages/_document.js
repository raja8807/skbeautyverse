import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

{
  /* <script> 
window.dataLayer = window.dataLayer || []; 
function gtag(){
dataLayer.push(arguments);
} gtag('js', new Date()); gtag('config', 'AW-11384016350'); 
</script> */
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>SK Beauty-Verse</title>
      {/* <meta name="google-site-verification" content="EtiaVHchwxdgY4Yjyls8SzpUMeiIzGVw-1a4ChPzfxY" /> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=GTM-MC9VM5PW"
      ></Script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || []; 
          function gtag(){
          dataLayer.push(arguments);
          } gtag('js', new Date()); gtag('config', 'GTM-MC9VM5PW'); 
          `,
        }}
      />
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MC9VM5PW"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
