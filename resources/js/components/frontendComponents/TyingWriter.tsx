
import React, { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
  lines: string[];        
  speed?: number;         
  deleteSpeed?: number;   
  delay?: number;         
}


const TypewriterEffect: React.FC<TypewriterEffectProps> =({ lines, speed, deleteSpeed, delay }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const index = useRef(0);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null); 

  useEffect(() => {
    const typeText = () => {
      const currentLine = lines[currentLineIndex];

      if (!isDeleting) {
        setDisplayText((prev) => prev + currentLine.charAt(index.current));
        index.current++;

     
        if (index.current === currentLine.length) {
          setIsDeleting(true);
          timeoutRef.current = setTimeout(typeText, delay); 
        } else {
          timeoutRef.current = setTimeout(typeText, speed);
        }
      } else {
        setDisplayText((prev) => prev.slice(0, -1));
        index.current--;

       
        if (index.current === 0) {
          setIsDeleting(false);
          setCurrentLineIndex((prev) => (prev + 1) % lines.length);
        }
        timeoutRef.current = setTimeout(typeText, deleteSpeed);
      }
    };

    timeoutRef.current = setTimeout(typeText, speed);

   
     return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, currentLineIndex, lines, speed, deleteSpeed, delay]);

  return (
    <div>
      <p className='md:h-[55px] h-[30px] '
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap', 
          overflow: 'hidden',
          borderRight: '2px solid rgb(216, 216, 216)',
          animation: 'blink 0.5s step-end infinite normal',
          // height: '55px',
          marginTop: '9px',
        }}
      >
        {displayText}
      </p>
    </div>
  );
};

export default TypewriterEffect;