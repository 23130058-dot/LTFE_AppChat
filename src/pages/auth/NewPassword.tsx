import { Link, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import { Link as RouterLink } from 'react-router-dom';
import NewPasswordForm from '../../sections/auth/NewPasswordForm';

const NewPassword = () => {
    return (
        <>
            <div style={{ width: '100%', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                <Typography variant="h3" sx={{ mb: 2 }}>Set a new password</Typography>
                <Typography sx={{ color: "text.secondary", mb: 4 }}>Please set your new password.</Typography>
                <NewPasswordForm />
                <Link component={RouterLink} to="/auth/login" color="inherit" variant="subtitle2" sx={{ mt: 3, mx: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CaretLeft /> Return to sign in
                </Link>
            </div>
        </>
    )
}

export default NewPassword