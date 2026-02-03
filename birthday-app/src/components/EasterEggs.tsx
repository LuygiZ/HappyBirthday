import { useState, useEffect, useCallback } from 'react';
import './EasterEggs.css';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  duration: number;
}

interface ClickHeart {
  id: number;
  x: number;
  y: number;
}

interface PopupMessage {
  id: number;
  text: string;
  x: number;
  y: number;
}

const EasterEggs = () => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingElement[]>([]);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);
  const [popupMessages, setPopupMessages] = useState<PopupMessage[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [showMiguelEasterEgg, setShowMiguelEasterEgg] = useState(false);
  const [cakeClickCount, setCakeClickCount] = useState(0);
  const [lastCakeClickTime, setLastCakeClickTime] = useState(0);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showKonamiEasterEgg, setShowKonamiEasterEgg] = useState(false);

  const cuteEmojis = ['🎂', '🎈', '🎁', '🎉', '🌸', '💖', '✨', '🦋', '🌟', '🍰', '🧁', '🎀'];

  const birthdayMessages = [
    'Feliz Aniversário! 🎂',
    'Muitos Parabéns! 🎉',
    'Que dia especial! ✨',
    'Arrasa muito! 🌟',
    'És incrível! 🦋',
    'Dia de festa! 🎈',
    'Muita luz! ☀️',
    'O Miguel tem muito orgulho em ti! 💕',
    'Oláaaaa Lilinha! 🎀',
    'NO PC: ↑↑↓↓←→←→BA'
  ];

  // Floating emojis that appear randomly
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newEmoji: FloatingElement = {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 50,
          emoji: cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)],
          size: Math.random() * 20 + 15,
          duration: Math.random() * 5 + 8
        };
        setFloatingEmojis(prev => [...prev, newEmoji]);

        // Remove after animation
        setTimeout(() => {
          setFloatingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
        }, newEmoji.duration * 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Click hearts effect
  const handleClick = useCallback((e: MouseEvent) => {
    // Don't trigger on buttons or links
    if ((e.target as HTMLElement).closest('button, a, .letter-overlay')) return;

    const newHeart: ClickHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };

    setClickHearts(prev => [...prev, newHeart]);
    setClickCount(prev => prev + 1);

    // Remove heart after animation
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1500);

    // Random popup message (22% chance)
    if (Math.random() > 0.78) {
      const newMessage: PopupMessage = {
        id: Date.now() + 1,
        text: birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)],
        x: e.clientX,
        y: e.clientY - 30
      };
      setPopupMessages(prev => [...prev, newMessage]);

      setTimeout(() => {
        setPopupMessages(prev => prev.filter(m => m.id !== newMessage.id));
      }, 2500);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Secret message after 10 clicks
  useEffect(() => {
    if (clickCount === 10 && !showSecretMessage) {
      setShowSecretMessage(true);
      setTimeout(() => setShowSecretMessage(false), 4000);
    }
    if (clickCount === 22) { // Special number - her age!
      setShowSecretMessage(true);
      setTimeout(() => {
        setShowSecretMessage(false);
        setClickCount(0);
      }, 5000);
    }
  }, [clickCount, showSecretMessage]);

  // Random confetti burst
  useEffect(() => {
    const confettiInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        createConfettiBurst();
      }
    }, 8000);

    return () => clearInterval(confettiInterval);
  }, []);

  // Konami Code Easter Egg: ↑↑↓↓←→←→BA
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() === e.key ? e.key : e.key;

      if (key === konamiCode[konamiProgress]) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);

        if (newProgress === konamiCode.length) {
          // Konami code completed!
          setShowKonamiEasterEgg(true);
          setKonamiProgress(0);

          // Create mega confetti explosion
          for (let i = 0; i < 8; i++) {
            setTimeout(() => createConfettiBurst(), i * 150);
          }

          setTimeout(() => setShowKonamiEasterEgg(false), 5000);
        }
      } else if (key === konamiCode[0]) {
        setKonamiProgress(1);
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  // Miguel Easter Egg - triggered by clicking cake 5 times rapidly
  const handleCakeClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const now = Date.now();

    // Reset counter if more than 2 seconds since last click
    if (now - lastCakeClickTime > 2000) {
      setCakeClickCount(1);
    } else {
      setCakeClickCount(prev => prev + 1);
    }

    setLastCakeClickTime(now);

    // Always create confetti on click
    createConfettiBurst();

    // Check if we reached 5 clicks - trigger Miguel!
    if (cakeClickCount >= 4) { // 4 because state hasn't updated yet
      setShowMiguelEasterEgg(true);
      setCakeClickCount(0);

      // Auto-hide after 10 seconds
      setTimeout(() => {
        setShowMiguelEasterEgg(false);
      }, 10000);
    }
  };

  const createConfettiBurst = () => {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-burst';
    confettiContainer.style.left = `${Math.random() * 80 + 10}%`;
    confettiContainer.style.top = `${Math.random() * 30 + 10}%`;

    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.setProperty('--rotation', `${Math.random() * 360}deg`);
      confetti.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
      confetti.style.setProperty('--y', `${Math.random() * 150 + 50}px`);
      confetti.style.backgroundColor = ['#FF7882', '#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'][Math.floor(Math.random() * 6)];
      confettiContainer.appendChild(confetti);
    }

    document.body.appendChild(confettiContainer);
    setTimeout(() => confettiContainer.remove(), 3000);
  };

  return (
    <>
      {/* Floating Emojis */}
      {floatingEmojis.map(emoji => (
        <div
          key={emoji.id}
          className="floating-emoji"
          style={{
            left: emoji.x,
            bottom: -50,
            fontSize: emoji.size,
            animationDuration: `${emoji.duration}s`
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      {/* Click Hearts */}
      {clickHearts.map(heart => (
        <div
          key={heart.id}
          className="click-heart"
          style={{ left: heart.x, top: heart.y }}
        >
          ✨
        </div>
      ))}

      {/* Popup Messages */}
      {popupMessages.map(msg => (
        <div
          key={msg.id}
          className="popup-message"
          style={{ left: msg.x, top: msg.y }}
        >
          {msg.text}
        </div>
      ))}

      {/* Corner Easter Egg - Clickable cake (5 clicks = Miguel!) */}
      <div
        className="corner-easter-egg"
        onClick={handleCakeClick}
        title="Clica em mim!"
      >
        🎂
      </div>

      {/* Konami Code Easter Egg */}
      {showKonamiEasterEgg && (
        <div className="konami-easter-egg">
          <div className="konami-content">
            <span className="konami-icon">🎮</span>
            <span className="konami-title">Código Secreto!</span>
            <span className="konami-text">Ganhaste uma ida ao sushi!</span>
            <span className="konami-subtitle">Tira uma print para comprovar :3</span>
          </div>
        </div>
      )}

      {/* Miguel Easter Egg */}
      {showMiguelEasterEgg && (
        <div className="miguel-easter-egg" onClick={() => setShowMiguelEasterEgg(false)}>
          <div className="miguel-container">
            <div className="miguel-sparkles">
              <span>✨</span>
              <span>💫</span>
              <span>✨</span>
            </div>
            <div className="miguel-image-wrapper">
              <img src="/images/miguel.png" alt="Miguel" className="miguel-image" />
            </div>
            <div className="miguel-message">
              <p className="miguel-text">O Miguel também te deseja</p>
              <p className="miguel-highlight">um Feliz Aniversário!</p>
              <span className="miguel-hearts">💖🎂💖</span>
            </div>
            <div className="miguel-sparkles bottom">
              <span>🌟</span>
              <span>💕</span>
              <span>🌟</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EasterEggs;
