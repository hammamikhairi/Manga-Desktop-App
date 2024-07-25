import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BorderLinearProgress from '../Components/BorderLinearProgress/BorderLinearProgress';
import Navbar from '../Components/Navbar/Navbar';
import { GetLocalList } from '../wailsjs/wailsjs/go/main/App';


const MangaList = () => {
  const [searchResults, setSearchResults] = useState([])

  const router = useRouter()

  useEffect(() => {
    GetLocalList().then(res => {
      setSearchResults(res.mangas)
    }, [])
  }, [])


  return (
    <>

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0;" />
      </Head>
      <Navbar highlited="/list" />


      <div className='search_container'>
        <div className="search_result" id='mangas'>
          {
            searchResults && searchResults.length > 0 &&
            <div className="mangas__cards-container">
              {searchResults.map((elem, index) =>
                <motion.div 
                  onClick={() => router.push(`/read/${elem.id}/${elem.lastChapterID}`)}
                key={index + elem.id} className='card_thing'>
                  <img src={elem.image} alt="cover" style={{ height: 250, width: 200 }} /> <br />
                  {trimExtra(elem.title, 30)} <br />
                  <div className='progres__card_container'>
                    <BorderLinearProgress
                      className="last-manga__progressbar"
                      max={elem.totalChapter}
                      level={elem.lastChapter}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          }
        </div>
      </div>

    </>
  )
}

export default MangaList;

const trimExtra = (str, len) => {
  if (str.length > len) {
    return str.slice(0, len) + '...'
  }
  return str
}