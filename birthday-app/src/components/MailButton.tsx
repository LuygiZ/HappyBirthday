import './MailButton.css';

interface MailButtonProps {
  onClick: () => void;
}

const MailButton = ({ onClick }: MailButtonProps) => {
  return (
    <div className="btn-container">
      <button id="btn-letter" onClick={onClick}>
        <div className="mail">
          Clica Aqui, Lilinha
          <i className="fa-regular fa-envelope"></i>
        </div>
      </button>
    </div>
  );
};

export default MailButton;
