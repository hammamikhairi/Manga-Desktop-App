import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MangaImage from '../../Components/Image/MangaImage';
import ReadingProgress from "../../Components/ReadingProgress/ReadingProgress";

import './read.sass';




const Read = () =>  {

  const nav = useNavigate()

  // return (
  //   <h1 onClick={() => {document.dispatchEvent(new CustomEvent("reading", {detail : undefined})) ; nav("/")}}>hello</h1>
  //   <button style={{zIndex : 999}} onClick={() => {console.log("hello");document.getElementById("bg").style.backgroundImage = "url('src/assets/images/bg7.jpg')"}}>this</button>
  // );

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    navbar.style.display = 'none';

    const type = setInterval(() => {
      navbar.classList.remove("blurr")
      clearInterval(type);
    }, 2000);

    return () => {
      navbar.style.display = 'block';
    };
  }, []);

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

  const [currentImages, setCurrentImages] = useState(images.slice(0, 5));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading && currentImages.length < images.length) {
      setLoading(true);
      setTimeout(() => {
        setCurrentImages(currentImages.concat(images.slice(currentImages.length, currentImages.length + 5)));
        setLoading(false);
      }, 2000);
    }
  }, [currentImages, images, loading]);

  return (
    <div id="reading_space">
      <button onClick={() => {nav("/")}}>here</button>
      {/* // TODO : do the config thingie to wether keep or remove it */}
      <ReadingProgress />
      <div id="reader" className="reading_manga__container">
        {currentImages.map((image, index) => (
          <MangaImage key={index} url={image}  />
        ))}
      </div>
    </div>
  );
};

export default Read;