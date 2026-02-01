import { useEffect, useState } from 'react';
import './MailBox.css';

interface MailBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const MailBox = ({ isOpen, onClose }: MailBoxProps) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Abre a carta após um pequeno delay
      const openTimer = setTimeout(() => setIsCardOpen(true), 500);
      // Mostra o conteúdo após a carta abrir completamente
      const contentTimer = setTimeout(() => setShowContent(true), 2000);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(contentTimer);
      };
    } else {
      setIsCardOpen(false);
      setShowContent(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => setIsCardOpen(false), 100);
    setTimeout(() => onClose(), 600);
  };

  return (
    <div className={`letter-overlay ${isOpen ? 'active' : ''}`}>
      <button className="letter-close" onClick={handleClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div className={`letter-container ${isCardOpen ? 'opened' : ''}`}>
        {/* Página interior esquerda */}
        <div className="letter-page letter-left">
          <div className="page-content left-content">
            <div className="letter-decoration">
              <img src="/images/mewmew.gif" alt="Mew Mew" className="mewmew-letter" />
            </div>
            <div className="heart-decoration">
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-heart small"></i>
              <i className="fa-solid fa-heart smaller"></i>
            </div>
          </div>
        </div>

        {/* Página interior direita */}
        <div className="letter-page letter-right">
          <div className={`page-content right-content ${showContent ? 'visible' : ''}`}>
            <h2 className="letter-greeting">Com Carinho,</h2>
            <div className="letter-text">
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
              <p className="letter-signature">
                Hoje o dia é todo teu! Aproveita cada segundo, Lilinha.
              </p>
            </div>
            <div className="letter-hearts">
              <span>💕</span>
            </div>
          </div>
        </div>

        {/* Capa frontal (dobra para a esquerda) */}
        <div className="letter-cover">
          <div className="cover-front">
            <div className="cover-image">
              <img src="/images/her.png" alt="Lilinha" />
            </div>
            <h3 className="cover-recipient">Para: Lilinha</h3>
            <h2 className="cover-title">Muitos Parabéns!</h2>
            <div className="cover-decoration">
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>
          <div className="cover-back"></div>
        </div>
      </div>
    </div>
  );
};

export default MailBox;
