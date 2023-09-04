import "@/styles/globals.css"
import {AppProps} from 'next/app'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react'
import Layout from "../src/layout/Layout";
 
export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 50,
    });
  });
  return (
    <Layout>
      <Component {...pageProps} />
      </Layout>
  )
}