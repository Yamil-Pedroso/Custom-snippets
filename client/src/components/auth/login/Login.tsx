
import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComponentContext } from '../../../context/componentContext';


const Login: React.FC = () => {
    const { isSimulateAuthUser } = useComponentContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSimulateAuthUser) {
      console.log('User is authenticated');
    } else {
      console.log('User is not authenticated');
    }
  }, [isSimulateAuthUser]);

  return (
    <div>
      Login
      <button
        style={{
          marginTop: '1rem',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
         Yes
      </button>
    </div>
  )
}

export default Login
