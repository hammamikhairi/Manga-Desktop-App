import { useEffect, useRef, useState } from 'react';
import './readingProgress.sass';


const ReadingProgress = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const  ref  = useRef();
  let opacity = 0

  const scrollHeight = () => {
    var el = document.documentElement,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    var percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;

    setReadingProgress(percent);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  });

  if (readingProgress < 80) {
    opacity = readingProgress / 20;
  } else {
    opacity = (100 - readingProgress) / 20
  }

  return (
    <div className="progressBar__container">
      <div className="progressBar__background"
      style={{ opacity: opacity }}
      >
        <div ref={ref} className="progressBar"
          style={{height: `${readingProgress}%`}}
        ></div>
      </div>
    </div>
  )
};

export default ReadingProgress;