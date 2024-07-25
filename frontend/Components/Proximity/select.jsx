import { useEffect, useState } from 'react';

const Select = ({ id, values, current, update }) => {
   const [isVisible, setIsVisible] = useState(false);

   const handleMouseMove = (e) => {
      const proximityThreshold = 150; // Adjust the threshold distance as needed
      const element = document.getElementById(id);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;
      const distance = Math.sqrt((mouseX - elementX) ** 2 + (mouseY - elementY) ** 2);

      if (distance < proximityThreshold) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousemove', handleMouseMove);
      return () => {
         document.removeEventListener('mousemove', handleMouseMove);
      };
   }, []);

   const fetchPrevious = () => {
      const index = values.findIndex((chapter) => chapter.id === current);
      if (index === values.length -1) return -1;
      return values[index + 1].id;
   }

   const fetchNext = () => {
      const index = values.findIndex((chapter) => chapter.id === current);
      if (index === 0) return -1;
      return values[index - 1].id;
   }


   return (
      <div id={id} className={`proximity-element ${isVisible ? 'visible' : ''}`}
         style={{ backdropFilter: 'blur(5px)' }}
      >
         <div className='nav_buttons'>
            <button
               style={{ opacity: fetchPrevious() === -1 ? '0' : '1' }}
               onClick={() => {
                  const target = fetchPrevious()
                  if (target === -1) return
                  update(target)
               }}
               >Previous</button>
            <button
               style={{ opacity: fetchNext() === -1 ? '0' : '1' }}
               onClick={() => {
                  const target = fetchNext()
                  if (target === -1) return
                  update(target)
            }}
            >Next</button>
         </div>
         <select name="chapters" id="qsd"
            value={current}
            onChange={(e) => {
               update(e.target.value)
            }}
         >
            {
               values.map((chapter, index) => {
                  return (
                     <option key={index + chapter.id} value={chapter.id}>{chapter.name}</option>
                  )
               })
            }
         </select>
      </div>
   );
};

export default Select;