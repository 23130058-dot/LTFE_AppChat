import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import AuthSocial from '../../sections/auth/AuthSocial';
import LoginForm from '../../sections/auth/LoginForm';

const Login = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: "relative", width: "100%", maxWidth: 480, mx: "auto" }}>
                <Typography variant="h4">Đăng nhập</Typography>
                <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">Chưa có tài khoản?</Typography>
                    <Link component={RouterLink} to="/auth/register" variant="subtitle2">Tạo tài khoản</Link>
                </Stack>
                <LoginForm />
                <AuthSocial />
            </Stack>
            );
        </>
    )
}

export default Login