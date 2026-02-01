import { useEffect, useState } from 'react';
import './ProfileSlideshow.css';

const images = ['/images/her.png', '/images/her2.png', '/images/her3.png'];

const ProfileSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="box-account">
      <div className="image-container">
        <div
          className="image-slider"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="slide">
              <img src={img} alt={`Lilinha ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="slide-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="name-tag">
        <i className="fa-solid fa-heart"></i>
        <span>Para a Lilinha</span>
        <i className="fa-solid fa-heart"></i>
      </div>
      <div className="balloon-one">
        <img src="/images/balloon1.png" alt="Balloon" />
      </div>
      <div className="balloon-two">
        <img src="/images/balloon2.png" alt="Balloon" />
      </div>
    </div>
  );
};

export default ProfileSlideshow;
