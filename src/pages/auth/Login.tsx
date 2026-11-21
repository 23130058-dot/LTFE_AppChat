import { Stack, Typography } from '@mui/material';
import AuthSocial from '../../sections/auth/AuthSocial';
import LoginForm from '../../sections/auth/LoginForm';

const Login = () => {
    return (
        <Stack
            spacing={2}
            sx={{ mb: 5, position: 'relative', width: '100%', maxWidth: 480, mx: 'auto' }}>
            <Typography variant="h4">Đăng nhập</Typography>
            <LoginForm />
            <AuthSocial />
        </Stack>
    );
};

export default Login;
