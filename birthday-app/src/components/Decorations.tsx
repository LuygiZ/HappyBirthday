import './Decorations.css';

const Decorations = () => {
  const stars = [
    { className: 'star1', delay: '15s' },
    { className: 'star2', delay: '15.2s' },
    { className: 'star3', delay: '15.4s' },
    { className: 'star4', delay: '15.6s' },
    { className: 'star5', delay: '15.8s' },
  ];

  const flowers = [
    { className: 'flower-one', delay: '15s' },
    { className: 'flower-two', delay: '15.3s' },
    { className: 'flower-three', delay: '15.6s' },
  ];

  return (
    <>
      {stars.map((star, index) => (
        <div
          key={index}
          className={`decorate-star ${star.className}`}
          style={{ '--t': star.delay } as React.CSSProperties}
        />
      ))}

      {flowers.map((flower, index) => (
        <div
          key={index}
          className={`decorate-flower ${flower.className}`}
          style={{ '--t': flower.delay } as React.CSSProperties}
        >
          <img src="/images/decorate_flower.png" alt="Flower" />
        </div>
      ))}

      <div className="decorate-bottom">
        <img src="/images/decorate.png" alt="Decoration" />
      </div>

      <div className="smiley-icon">
        <img src="/images/smiley_icon.png" alt="Smiley" />
      </div>

      <div className="mewmew-decoration">
        <img src="/images/mewmew.gif" alt="Mew Mew" />
      </div>
    </>
  );
};

export default Decorations;
