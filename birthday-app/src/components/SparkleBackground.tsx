import { useEffect, useState } from 'react';
import './SparkleBackground.css';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'star' | 'dot' | 'heart';
}

const SparkleBackground = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 50; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5,
          type: ['star', 'dot', 'heart'][Math.floor(Math.random() * 3)] as 'star' | 'dot' | 'heart',
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, []);

  return (
    <div className="sparkle-background">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className={`sparkle sparkle-${sparkle.type}`}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}
      <div className="gradient-overlay" />
      <div className="confetti-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              backgroundColor: ['#ff7882', '#ffd700', '#ff9a9e', '#fff', '#ffb6c1'][
                Math.floor(Math.random() * 5)
              ],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SparkleBackground;
