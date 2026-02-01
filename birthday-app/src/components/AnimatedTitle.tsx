import './AnimatedTitle.css';

const AnimatedTitle = () => {
  const parabens = 'Parabéns'.split('');
  const lilinha = 'Lilinha'.split('');

  return (
    <div className="title-container">
      <div className="title">
        <h1 className="happy">
          {parabens.map((letter, index) => (
            <span key={index} style={{ '--t': `${4 + index * 0.2}s` } as React.CSSProperties}>
              {letter}
            </span>
          ))}
        </h1>
        <h1 className="birthday">
          {lilinha.map((letter, index) => (
            <span key={index} style={{ '--t': `${5 + index * 0.2}s` } as React.CSSProperties}>
              {letter}
            </span>
          ))}
        </h1>
        <div className="hat">
          <img src="/images/hat.png" alt="Party Hat" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedTitle;
