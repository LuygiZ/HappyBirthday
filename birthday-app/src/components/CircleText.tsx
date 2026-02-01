import './CircleText.css';

const CircleText = () => {
  const text = 'feliz-dia-lili-';

  return (
    <div className="circle-container">
      <div className="text-circle">
        {text.split('').map((char, index) => (
          <span key={index} style={{ '--i': index + 1 } as React.CSSProperties}>
            {char}
          </span>
        ))}
      </div>
      <i className="fa-solid fa-heart center-heart"></i>
    </div>
  );
};

export default CircleText;
