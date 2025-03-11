import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      login(username);
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <TextField label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Button onClick={handleLogin}>Entrar</Button>
    </div>
  );
};

export default Login;
