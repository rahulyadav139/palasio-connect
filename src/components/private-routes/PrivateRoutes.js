import { AuthPage } from '../../pages';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const { isAuth } = useSelector(state => state.auth);

  return (
    <>{isAuth ? <Outlet /> : <Navigate to="/" element={<AuthPage />} />}</>
  );
};
export { PrivateRoutes };
