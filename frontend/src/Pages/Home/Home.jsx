import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './button.css';
import './home.sass';
const Home = () => {

  const [lastManga, setLastManga] = useState({})

  useEffect(() => {

    // TODO : get last manga from backend
    setLastManga({
      title: "Chainsaw Man ",
      japaneseTitle: "チェンソーマン",
      cover: "",
      id: "csm",
      chapters: {
        all: 111,
        read: 57,
      },
    })

    if (lastManga.cover)
      document.getElementById("home").style.backgroundImage = `url(${lastManga.cover})`
  }, [])

  return (
    <div id="home">
      <div id="bg" />
      {
        (!lastManga || !lastManga.chapters) ?
          <h1>hello</h1>
        :
        <div className="last-manga__container">
          <div className="last-manga">
            <h1 className="last-manga__japanese-title">{lastManga.japaneseTitle}</h1>
            <h1 className="last-manga__title">{lastManga.title}</h1>
            <div className='last-manga__progressbar-container'>
              <BorderLinearProgress className="last-manga__progressbar" variant="determinate" value={(lastManga.chapters.read/lastManga.chapters.all)*100} />
            </div>
            {/* <h1 className="last-manga__progress" >{lastManga.chapters.read}/{lastManga.chapters.all}</h1> */}
            <Link className='last-manga__button' to={`/read/${lastManga.id}`}>
              {/* <button className='last-manga__continue-button'>Continue Reading...</button> */}
              {/* <a class="fancy" href="#"> */}
                <span className="top-key"></span>
                <div className="text">
                  <AutoStoriesIcon />
                  <h3>
                    Continue Reading...
                  </h3>
                </div>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
              {/* </a> */}
            </Link>
          </div>
        </div>
      }
    </div>
  )
}


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 3,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#424242",
  },
}));


export default Home;