import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { motion } from "framer-motion";
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BorderLinearProgress from '../Components/BorderLinearProgress/BorderLinearProgress';
import Navbar from '../Components/Navbar/Navbar';
import TypeWriter from '../Components/TypeWriter/TypeWriter';
import { GetLastManga } from '../wailsjs/wailsjs/go/main/App';
// import { GetLastManga } from '../wailsjs/go/main/App';

const LOADS_OF_ANIMATIONS = 1;


// const lastManga = {
//   Title: "Attack on Titan",
//   Totalchapters: 139,
//   lastChapter: 100,
//   lastChapterID: "id",
//   id: 1,
// }

const Home = () => {

  const [animationEnded, setAnimationEnded] = useState(true)
  const [counter, setCounter] = useState(LOADS_OF_ANIMATIONS)
  const [manga, setManga] = useState(null)

  const nav = useRouter()

  useEffect(() => {

    // document.body.style.zoom = '100%';

    // var scale = 'scale(1)';
    // document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
    // document.body.style.msTransform =   scale;       // IE 9
    // document.body.style.transform = scale;     // General

    document.addEventListener("reading", (event) => {
      const type = setInterval(() => {
        if (event.detail) {
          nav.push("/read/" + event.detail.manga + "/" + event.detail.chapter)
        }

        clearInterval(type)
      }, 1500);
    })


    document.addEventListener('animationEnd', () => {
      setCounter(counter - 1);
      if (counter === 0)
        setAnimationEnded(true)
    });



    GetLastManga().then(res => {
      if (res.exists) {
        setManga(res.lastManga)
      }
    })

  }, [])





  if (manga === null) {
    return ""
  }

  return (
    <>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0;" />
      </Head>
      <Navbar highlited="/" />

      <div id="home">
        <div className="last-manga__container">
          <div className="last-manga">
            {/* <TypeWriter
              onAnimationEnd={() => { document.dispatchEvent(new CustomEvent("animationEnd", null)); }}
              type="h1"
              className="last-manga__japanese-title"
              content={manga.Japanesetitle}
            /> */}
            <h1 className="last-manga__title" style={{opacity : 0}}>{manga.title}</h1>
            <TypeWriter
              onAnimationEnd={() => { document.dispatchEvent(new CustomEvent("animationEnd", null)); }}
              type="h1"
              className="last-manga__title"
              content={manga.title}
            />
            {
              animationEnded &&
              <motion.div
                initial={{
                  height: 0.1,
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{ type: 'spring', duration: 1 }}
                className='last-manga__progressbar-container'
              >
                <BorderLinearProgress
                  className="last-manga__progressbar"
                  max={manga.totalChapter}
                  level={manga.lastChapter}
                />
              </motion.div>
            }

            {
              animationEnded &&
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{ type: 'spring', duration: 2, delay: 0.5 }}
                className="last-manga__button-container"
              >
                <button
                  className='last-manga__button'
                  onClick={() => { document.dispatchEvent(new CustomEvent("reading", { detail : {manga: manga.id, chapter : manga.lastChapterID}})) }}
                >
                  <span className="top-key"></span>
                  <div className="text">
                    <AutoStoriesIcon />
                    <h3>
                      Continue Reading...
                    </h3>
                  </div>
                  <span className="bottom-key-1"></span>
                  <span className="bottom-key-2"></span>
                </button>
              </motion.div>
            }
          </div>
        </div>
      </div>
    </>
  )
}



export default Home;