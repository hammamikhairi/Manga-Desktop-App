import React, { useEffect, useState } from 'react';

function TypeWriter({type, className, content = "EMPTY", delay = 100, onAnimationEnd = () => {}}) {
  const [text, setText] = useState('');
  const message = content;

  useEffect(() => {
    let i = 0;
    const type = setInterval(() => {
      setText(message.slice(0, i));
      i++;
      if (i > message.length) {
        clearInterval(type);
        onAnimationEnd()
      }
    }, delay);
  }, []);

  return React.createElement(type, { className: className }, text);
}


export default TypeWriter;