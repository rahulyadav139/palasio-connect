import './Toast.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastActions } from '../../store/toast-slice';

const Toast = props => {
  const { type, status, message } = useSelector(state => state.toast);
  const dispatch = useDispatch();

  const toastIconClasses =
    type === 'danger'
      ? 'fas fa-exclamation-circle'
      : type === 'success'
      ? 'fas fa-check-circle'
      : 'fas fa-bell';

  useEffect(() => {
    let timer;

    if (status) {
      timer = setTimeout(() => {
        dispatch(ToastActions.resetToast());
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [status, dispatch]);

  return (
    <div className={`toast ${type}`}>
      <span className="icon small white">
        <i className={toastIconClasses}></i>
      </span>
      {` ${message}`}
    </div>
  );
};
export { Toast };
