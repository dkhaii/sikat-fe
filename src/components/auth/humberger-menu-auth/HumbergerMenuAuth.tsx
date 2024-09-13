import { Link } from 'react-router-dom';
import './HumbergerMenuAuth.css';
import { useAuth } from '../../../common/services/Auth/AuthContext';

const HumbergerMenuAuth = () => {
  const { user } = useAuth();
  return (
    <div className="humbergermenuauth-container">
      <ul>
        <Link to={'/'}>
          <li>
            <a href="#">Home</a>
          </li>
        </Link>
        {user?.role === 1 ? (
          <Link to={'/employees'}>
            <li>
              <a href="#">Employees</a>
            </li>
          </Link>
        ) : null}
        <Link to={'/leave-plans'}>
          <li>
            <a href="#">Leave Plans</a>
          </li>
        </Link>
        {user?.role === 1 ? (
          <Link to={'/settings'}>
            <li>
              <a href="#">Settings</a>
            </li>
          </Link>
        ) : null}
      </ul>
    </div>
  );
};

export default HumbergerMenuAuth;
