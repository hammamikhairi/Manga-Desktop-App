import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BorderLinearProgress from '../../Components/BorderLinearProgress/BorderLinearProgress';
import TypeWriter from '../../Components/TypeWriter/TypeWriter';
import './button.css';
import './home.sass';

const LOADS_OF_ANIMATIONS = 1;
const TempData = {
  title: "Chainsaw Man ",
  japaneseTitle: "チェンソーマン",
  cover: 'file:///home/khairi/smbg.jpg',
  id: "csm",
  chapters: {
    all: 111,
    read: 50,
  },
}


const Home = () => {

  const nav = useNavigate()
  document.addEventListener("reading", (event) => {
    const type = setInterval(() => {
      //! fucking manga + chapter
      if (event.detail)
        nav("/read/" + event.detail)
      clearInterval(type)
    }, 2000);
  })

  const [lastManga, setLastManga] = useState({})
  const [counter, setCounter] = useState(LOADS_OF_ANIMATIONS)
  const [animationEnded, setAnimationEnded] = useState(false)

  useEffect(() => {
    // TODO : get last manga from backend
    setLastManga(TempData)
  }, [])

  document.addEventListener('animationEnd', () => {
    setCounter(counter - 1);
    if (counter === 0)
      setAnimationEnded(true)
  });

  return (
    <div id="home">
      <div id="bg" />
      {/* {
        temp &&
        <img src="tempManga/fa.png" />
      } */}
      <div className="last-manga__container">
      {
        (!lastManga || !lastManga.chapters) ?
          undefined
        :
          <div className="last-manga">
            <TypeWriter
              onAnimationEnd={() => { document.dispatchEvent(new CustomEvent("animationEnd", null));}}
              type="h1"
              className="last-manga__japanese-title"
              content={lastManga.japaneseTitle}
            />
            <TypeWriter
              onAnimationEnd={() => { document.dispatchEvent(new CustomEvent("animationEnd", null));}}
              type="h1"
              className="last-manga__title"
              content={lastManga.title}
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
                transition={{type:'spring', duration:1}}
                className='last-manga__progressbar-container'
              >
                <BorderLinearProgress
                  className="last-manga__progressbar"
                  max={TempData.chapters.all}
                  level={TempData.chapters.read}
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
                transition={{type:'spring', duration:2, delay:0.5}}
                className="last-manga__button-container"
              >
                <Link
                  className='last-manga__button'
                  onClick={() => {document.dispatchEvent(new CustomEvent("reading", {detail : `${lastManga.id}/chidk`}))}}
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
                </Link>
              </motion.div>
            }
          </div>
      }
      </div>
    </div>
  )
}



export default Home;