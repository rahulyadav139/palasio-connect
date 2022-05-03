import './Modal.css';
import ReactDOM from 'react-dom';

const Backdrop = ({ onCloseModal }) => {
  return <div onClick={onCloseModal} className="modal-backdrop"></div>;
};

const overlay = document.getElementById('overlay');

const Modal = ({ children, onCloseModal }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onCloseModal={onCloseModal} />, overlay)}
      {ReactDOM.createPortal(<div className="modal">{children}</div>, overlay)}
    </>
  );
};
export { Modal };
