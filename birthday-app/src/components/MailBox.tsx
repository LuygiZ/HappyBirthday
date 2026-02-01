import { useEffect, useState } from 'react';
import './MailBox.css';

interface MailBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const MailBox = ({ isOpen, onClose }: MailBoxProps) => {
  const [showContent, setShowContent] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer1 = setTimeout(() => setShowContent(true), 2000);
      const timer2 = setTimeout(() => setShowMessage(true), 4000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setShowContent(false);
      setShowMessage(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowContent(false);
    setShowMessage(false);
    onClose();
  };

  return (
    <div className={`box-mail ${isOpen ? 'active' : ''}`}>
      <i className="fa-solid fa-xmark close-btn" onClick={handleClose}></i>
      <div className="box-mail-container">
        <div className="card1">
          <div className="user-img">
            <img src="/images/her.png" alt="Lilinha" />
          </div>
          <h4 className="username">Para: Lilinha</h4>
          <h3>Muitos Parabéns!</h3>
          <div className="mewmew-container">
            <img src="/images/mewmew.gif" alt="Mew Mew" className="mewmew-gif" />
          </div>
        </div>
        <div className="card2">
          <div className="card2-content">
            <h3 className={showContent ? 'visible' : ''}>Com Carinho,</h3>
            <div className={`message ${showMessage ? 'visible' : ''}`}>
              <p>
                Feliz aniversário! Sabes que és uma pessoa muito especial para mim.
                Desde que apareceste, os meus dias ficaram mais brilhantes e agradeço
                muito por te ter por perto.
              </p>
              <p>
                Espero que o teu dia seja tão incrível quanto tu! Que todos os teus
                sonhos se realizem e que nunca te falte esse sorriso lindo.
              </p>
              <p>
                Estou sempre aqui para ti, para conversar, para rir ou apenas para
                acompanhar o teu caminho.
              </p>
              <p className="final-message">
                Hoje o dia é todo teu! Aproveita cada segundo, Lilinha.
              </p>
            </div>
            <div className="decorative-hearts">
              <span className="heart-float">❤️</span>
              <span className="heart-float delay-1">💖</span>
              <span className="heart-float delay-2">💕</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
