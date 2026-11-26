import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ResetPasswordForm from '../../sections/auth/ResetPasswordForm';

const ResetPassword = () => {
    return (
        <>
            <div style={{ width: '100%', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                <Typography variant="h3" sx={{ mb: 2 }}>Forgot your password?</Typography>
                <Typography sx={{ color: "text.secondary", mb: 4 }}>
                    Enter the email address associated with your account to request a password reset.
                </Typography>
                <ResetPasswordForm />
                <Link component={RouterLink} to="/auth/login" color="inherit" variant="subtitle2" sx={{ mt: 3, mx: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CaretLeft /> Return to sign in
                </Link>
            </div>
        </>
    )
}

export default ResetPassword