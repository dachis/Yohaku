import { useState } from 'react';

const useTyping = () => {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState(0);
  const [inputLock, setLock] = useState(false);

  const typeStart = (text = '') => {
    setKey(current => current + 1);
    setLock(true);
    setMessage(text);
  };

  const typeEnd = () => {
    setLock(false);
  };

  return {
    typeStart,
    typeEnd,
    inputLock,
    key,
    message,
  };
};

export default useTyping;