import { motion } from "framer-motion";
import { useState } from "react";
import { TailSpin } from 'svg-loaders-react';
import './image.sass';

const LoadingImage= () =>
    <div className="loading">
      <TailSpin />
    </div>



const MangaImage = ({url, alt}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };



  return (
      <div
        className={`${pulsing ? "pulse" : ""} loadable Image`}
        style={{ width: "100%", borderRadius: "3px" }}
      >
        {
            imageLoading &&
            <LoadingImage />
        }
        <motion.img
          initial={{ opacity: 0 }}
          animate={{
            height: imageLoading ? "100%" : "auto",
            opacity: imageLoading ? 0 : 1
          }}
          transition={
            ({ height: { delay: 0, duration: 0.4 } },
            { opacity: { delay: 0.5, duration: 0.4 } })
          }
          onLoad={imageLoaded}
          // onError={handleError}
          className="Image"
          width="100%"
          src={url}
          alt={alt}
        />
      </div>
  );
}

export default MangaImage;
