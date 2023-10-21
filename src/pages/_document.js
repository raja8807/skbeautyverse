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
      <title>SK BeautyVerse</title>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11384016350"
      ></Script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || []; 
          function gtag(){
          dataLayer.push(arguments);
          } gtag('js', new Date()); gtag('config', 'AW-11384016350'); 
          `,
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
