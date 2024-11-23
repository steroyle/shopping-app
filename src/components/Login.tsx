// import {useNavigate} from 'react-router-dom';
// import {useAuth} from '../contexts/AuthContext';
// import {useEffect} from 'react';

// const Login = () => {
//   const {user, login} = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   const handleLogin = async () => {
//     try {
//       await login();
//     } catch (error) {
//       console.error('Error logging in: ', error);
//     }
//   };

//   return <button onClick={handleLogin}>Login with Google</button>;
// };

// export default Login;
