import { useState } from 'react';
import { Alert, Button, IconButton, InputAdornment, Link } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import { authApi, type LoginInput } from '../../services/authApi';

const schema = Yup.object({
    user: Yup.string().trim().required('Vui lòng nhập tên người dùng'),
    pass: Yup.string().required('Vui lòng nhập mật khẩu'),
});

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    const methods = useForm<LoginInput>({
        resolver: yupResolver(schema) as never,
        defaultValues: { user: '', pass: '' },
    });

    const onSubmit = async (values: LoginInput) => {
        setApiError('');
        try {
            await authApi.login({ user: values.user.trim(), pass: values.pass });
            navigate('/app', { replace: true });
        } catch (error) {
            setApiError(error instanceof Error ? error.message : 'Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <div style={{ display: 'grid', gap: 16 }} >
                {apiError && <Alert severity="error">{apiError}</Alert>}
                <RHFTextField<LoginInput>
                    name="user"
                    label="Tên người dùng"
                    autoComplete="username"
                    autoFocus
                />
                <RHFTextField<LoginInput>
                    name="pass"
                    label="Mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Hiện hoặc ẩn mật khẩu"
                                        onClick={() => setShowPassword((value) => !value)}
                                        edge="end"
                                    >
                                        {showPassword ? <Eye /> : <EyeSlash />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Link component={RouterLink} to="/auth/reset-password">Quên mật khẩu?</Link>
                </div>
                <Button fullWidth size="large" type="submit" variant="contained" disabled={methods.formState.isSubmitting}>
                    {methods.formState.isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
            </div>
        </FormProvider>
    );
}
