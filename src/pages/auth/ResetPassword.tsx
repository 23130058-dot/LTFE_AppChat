import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ResetPasswordForm from '../../sections/auth/ResetPasswordForm';

const ResetPassword = () => {
    return (
        <>
            <div style={{ width: '100%', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                <Typography variant="h3" sx={{ mb: 2 }}>Quên mật khẩu?</Typography>
                <Typography sx={{ color: "text.secondary", mb: 4 }}>
                    Hãy nhập địa chỉ email liên kết với tài khoản của bạn để yêu cầu đặt lại mật khẩu.
                </Typography>
                <ResetPasswordForm />
                <Link component={RouterLink} to="/auth/login" color="inherit" variant="subtitle2" sx={{ mt: 3, mx: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CaretLeft /> Quay lai đăng nhập
                </Link>
            </div>
        </>
    )
}

export default ResetPassword