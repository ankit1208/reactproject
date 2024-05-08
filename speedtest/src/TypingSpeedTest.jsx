import React, { useState, useEffect } from 'react';

const TypingSpeedTest = () => {
  const [text, setText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [typingTime, setTypingTime] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
    if (!isTyping) {
      setIsTyping(true);
      setStartTime(Date.now());
    }
  };

  useEffect(() => {
    if (isTyping) {
      const timeElapsed = (Date.now() - startTime) / 1000; 
      setTypingTime(timeElapsed);
      const words = text.trim().split(/\s+/).length;
      setWordCount(words);
      setTypingSpeed((words / timeElapsed) * 60); 
    }
  }, [text, startTime, isTyping]);

  return (
    <div>
      <h1>Typing Speed Test</h1>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={handleInputChange}
        placeholder="Start typing here..."
      />
      {isTyping && typingTime !== null && (
        <div>
          <p>Time elapsed: {typingTime.toFixed(1)} seconds</p>
          <p>Word count: {wordCount}</p>
          <p>Typing speed: {typingSpeed.toFixed(0)} words per minute</p>
        </div>
      )}
    </div>
  );
};

export default TypingSpeedTest;
