import './Modal.css';
import ReactDOM from 'react-dom';

const Backdrop = ({ closeModal }) => {
  return <div onClick={closeModal} className="modal-backdrop"></div>;
};

const overlay = document.getElementById('overlay');

const Modal = ({ children, closeModal }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop closeModal={closeModal} />, overlay)}
      {ReactDOM.createPortal(<div className="modal">{children}</div>, overlay)}
    </>
  );
};
export { Modal };
