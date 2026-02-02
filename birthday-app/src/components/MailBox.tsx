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
    if (!isOpen) {
      setIsCardOpen(false);
      setShowContent(false);
    }
  }, [isOpen]);

  const handleOpenCard = () => {
    if (!isCardOpen) {
      setIsCardOpen(true);
      // O conteúdo da página direita aparece após metade da animação
      setTimeout(() => setShowContent(true), 600);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowContent(false);
    setIsCardOpen(false);
    setTimeout(() => onClose(), 800);
  };

  if (!isOpen) return null;

  return (
    <div className={`letter-overlay ${isOpen ? 'active' : ''}`}>
      <button className="letter-close" onClick={handleClose} aria-label="Fechar">
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div 
        className={`book-wrapper ${isCardOpen ? 'is-opened' : ''}`} 
        onClick={handleOpenCard}
      >

        {/* Divisória Central (Sombra da Dobra) */}
        <div className="book-spine"></div>

        {/* LADO ESQUERDO: Capa que roda 180º */}
        <div className="book-leaf-left">
          {/* Frente Rosa */}
          <div className="leaf-front-pink">
            <div className="cover-circle">
              <img src="/images/her.png" alt="Lilinha" />
            </div>
            <h3 className="to-text">Para: Lilinha</h3>
            <h2 className="title-text">Muitos Parabéns!</h2>
            {!isCardOpen && <p className="tap-hint">Clica para abrir ✨</p>}
          </div>

          {/* Verso Branco (Página Interior Esquerda) */}
          <div className="leaf-back-white">
            <img src="/images/mewmew.gif" alt="Mew Mew" className="gif-inside" />
            <div className="hearts-deco">
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-heart"></i>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: Página Fixa (Interior Direita) */}
        <div className="book-base-right">
          <div className={`text-content ${showContent ? 'is-visible' : ''}`}>
            <h2 className="greeting-title">Para Uma Pessoa Deveras Especial,</h2>
            <div className="message-text">
              <p>Feliz aniversário sweetie! Obrigado por tudo, pelas memórias, pelo carinho, afeto e sobretudo pelas tuas tentativas de me rebaixar🙂‍↕️</p>
              <p>Tenho muito orgulho em ti! A vida são bué de cenas e ainda bem que eu tive a sorte de tu seres uma parte da minha vida.</p>
              <p>Espero que o teu dia seja tão incrível e lindo quanto tu!</p>
              <p className="final-signature">Aproveita cada segundo, Lilinha, pois hoje o dia é teu! Arrasaaaa! 💕</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailBox;