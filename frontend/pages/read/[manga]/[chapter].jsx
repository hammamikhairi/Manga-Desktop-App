import { useEffect, useState } from "react";
import MangaImage from '../../../Components/Image/MangaImage';
// import ReadingProgress from "../../Components/ReadingProgress/ReadingProgress";

import { useRouter } from "next/router";
import Select from "../../../Components/Proximity/select";
import ReadingProgress from "../../../Components/ReadingProgress/ReadingProgress";
import { Leave, Loader } from "../../../Components/SVGs";
import { GetChapter } from "../../../wailsjs/wailsjs/go/main/App";



const Read = () => {

  const nav = useRouter()

  // const {mngId, chapId} = useParams()

  const [pages, setPages] = useState([])
  const [chapterData, setChapterData] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chapterId, setChapterId] = useState(nav.query.chapter);

  useEffect(() => {
    GetChapter(`/chapter/${nav.query.manga}/${nav.query.chapter}`).then(res => {
      setPages(res.images)
      setChapterData(res)
    })
  }, [])


  // This useEffect is for KeyMapping
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'a') {
        document.getElementById("reader").style.width = `${document.getElementById("reader").clientWidth + 100}px`;
      }
      if (event.key === 'z') {
        document.getElementById("reader").style.width = `${document.getElementById("reader").clientWidth - 100}px`;
      }
    };


    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  }, []);

  useEffect(() => {
    if (!loading && currentImages.length < pages.length) {
      setLoading(true);
      setTimeout(() => {
        setCurrentImages(currentImages.concat(pages.slice(currentImages.length, currentImages.length + 5)));
        setLoading(false);
      }, 2000);
    }
  }, [currentImages, pages, loading]);



  const [hight, setHight] = useState(0);

  useEffect(() => {

    // get height of first child in reader
    if (currentImages.length > 0) {
      const height = document.getElementById("reader")?.firstChild.clientHeight;
      if (height > 300) {
        setHight(height * pages.length);
      }
    }


  }, [currentImages])


  return (
    <>
      <div className="reading_controls">
        <a href="/">
          <Leave fill={"grey"} />
        </a>
      </div>

    <div id="reading_space">
      {
        chapterData &&
        <div className="chapter_title">
          <h1>{chapterData.currentChapter}</h1>
        </div>
      }
      {
        pages.length === 0 ?
        <div className="loader-container">
            <Loader />
            <p>Loading Data...</p>
          </div>
          :
          <>
            <ReadingProgress hight={hight} />
            <div id="reader" className="reading_manga__container"
              style={{ width: `${1000}px` }}
              >
              {currentImages.map((image, index) => {
                return (
                  <MangaImage key={index} url={image.image} />
                )
              })}
            </div>
          </>
      }
      {
        currentImages.length !== 0 && chapterData && 
        <div className="chapters_list">
          <Select
            id={"SELECT-ELEMENT"}
            current={chapterId}
            values={chapterData.chapterListIds}
            update={
              (selected) => {

                setPages([])
                setCurrentImages([])

                GetChapter(`/chapter/${nav.query.manga}/${selected}`).then(res => {
                  setPages(res.images)
                  setChapterData(res)
                  setChapterId(selected)
                })
              }
            }
          />
        </div>
      }
    </div>
      </>
  );
};






export default Read;