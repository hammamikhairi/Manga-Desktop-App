import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { motion } from "framer-motion";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BorderLinearProgress from '../../Components/BorderLinearProgress/BorderLinearProgress';
import TypeWriter from '../../Components/TypeWriter/TypeWriter';
import './button.css';
import './home.sass';

const LOADS_OF_ANIMATIONS = 1;

const Home = ({lastManga}) => {

  const [animationEnded, setAnimationEnded] = useState(false)
  const [counter, setCounter] = useState(LOADS_OF_ANIMATIONS)

  const nav = useNavigate()
  document.addEventListener("reading", (event) => {
    const type = setInterval(() => {
      //! fucking manga + chapter
      if (event.detail)
        nav("/read/" + event.detail)
      clearInterval(type)
    }, 2000);
  })
  
 document.addEventListener('animationEnd', () => {
    setCounter(counter - 1);
    if (counter === 0)
      setAnimationEnded(true)
  });

  if (lastManga.Title === undefined) {
    return
  }

  return (
    <div id="home">
      <div className="last-manga__container">
          <div className="last-manga">
            <TypeWriter
              onAnimationEnd={() => { document.dispatchEvent(new CustomEvent("animationEnd", null));}}
              type="h1"
              className="last-manga__japanese-title"
              content={lastManga.Japanesetitle} 
            />
            <TypeWriter
              onAnimationEnd={() => { document.dispatchEvent(new CustomEvent("animationEnd", null));}}
              type="h1"
              className="last-manga__title"
              content={lastManga.Title}
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
                  max={lastManga.Totalchapters}
                  level={lastManga.Progress}
                  // max={20}
                  // level={10}
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
                  onClick={() => {document.dispatchEvent(new CustomEvent("reading", {detail : `${lastManga.Id}/chidk`}))}}
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
      </div>
    </div>
  )
}



export default Home;