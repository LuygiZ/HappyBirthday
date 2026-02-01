import { useEffect, useState } from 'react';
import './DateOfBirth.css';

interface DateOfBirthProps {
  date: string;
}

const DateOfBirth = ({ date }: DateOfBirthProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < date.length) {
          setDisplayText(date.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setShowStars(true);
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }, 12000);

    return () => clearTimeout(timeout);
  }, [date]);

  return (
    <div className="date-of-birth">
      {showStars && <i className="fa-solid fa-star"></i>}
      <span>{displayText}</span>
      {showStars && <i className="fa-solid fa-star"></i>}
    </div>
  );
};

export default DateOfBirth;
