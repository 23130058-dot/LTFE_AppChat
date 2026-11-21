import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RegisterForm from '../../sections/auth/RegisterForm';
import AuthSocial from '../../sections/auth/AuthSocial';

const Register = () => {
    return (
        <div style={{ width: '100%', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Tạo tài khoản</Typography>

            <RegisterForm />
            <Typography component="div" sx={{ color: "text.secondary", mt: 3, typography: "caption", textAlign: "center" }}>
                Bằng việc đăng ký, bạn đồng ý với các điều khoản sử dụng và chính sách bảo mật.
            </Typography>
            <AuthSocial />
        </div>
    )
}

export default Register