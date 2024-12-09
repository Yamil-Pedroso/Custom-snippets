import { useNavigate } from 'react-router-dom';

interface IRegisterProps {
   isPushedButton?: boolean;
  }

const Register: React.FC<IRegisterProps> = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '3rem',
      }}
    >Register
      <button
        style={{
          marginTop: '1rem',
          cursor: 'pointer',
        }}
        onClick={() =>  navigate('/login')}
      >
        Yes
      </button>
    </div>
  )
}

export default Register
