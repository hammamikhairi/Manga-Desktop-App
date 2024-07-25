import { useEffect } from 'react';
import '../styles/app.sass';
import '../styles/button.css';
// import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/card.sass';
import '../styles/home.sass';
import '../styles/image.sass';
import '../styles/navbar.sass';
import '../styles/read.sass';
import '../styles/readingProgress.sass';
import '../styles/search.css';


export default function App({ Component, pageProps }) {


  const router = useRouter()

  useEffect(() => {

    // document.body.style.zoom = '100%';

    document.addEventListener("reading", (event) => {
      if (event.detail) {
        document.getElementById("bg")?.classList.add("blurr")
        document.getElementById("home")?.classList.add("blurr")
        document.getElementById("navbar")?.classList.add("blurr")
        document.getElementById("mangas")?.classList.add("blurr")
      }
    })

  }, [])

  return <>

    <Head> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0;" />
    </Head>

    {
      router.pathname === '/' && 
      <img id="bg" src={`/images/bg.jpg`}/>
    }
    <Component {...pageProps} />
  </>
}