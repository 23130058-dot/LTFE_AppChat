import { useState } from 'react';
import { Alert, Button, IconButton, InputAdornment } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import { authApi } from '../../services/authApi';

type Values = { password: string; confirmPassword: string };
const schema = Yup.object({
    password: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp').required('Vui lòng xác nhận mật khẩu'),
});
export default function NewPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState('');
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const methods = useForm<Values>({ resolver: yupResolver(schema) as never, defaultValues: { password: '', confirmPassword: '' } });
    const onSubmit = async ({ password }: Values) => {
        const token = params.get('token');
        if (!token) { setApiError('Liên kết đặt lại mật khẩu không hợp lệ hoặc thiếu mã xác thực.'); return; }
        setApiError('');
        try {
            await authApi.resetPassword({ token, password });
            setSuccess('Đặt lại mật khẩu thành công. Đang chuyển đến trang đăng nhập...');
            window.setTimeout(() => navigate('/auth/login'), 1200);
        } catch (error) {
            setApiError(error instanceof Error ? error.message : 'Không thể đặt lại mật khẩu. Vui lòng thử lại.');
        }
    };
    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <div style={{ display: 'grid', gap: 16 }} >
                {apiError && <Alert severity="error">{apiError}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                <RHFTextField<Values> name="password" label="Mật khẩu mới" type={showPassword ? 'text' : 'password'} autoComplete="new-password"
                                      slotProps={{ input: { endAdornment: <InputAdornment position="end"><IconButton aria-label="Hiện hoặc ẩn mật khẩu" onClick={() => setShowPassword((v) => !v)} edge="end">{showPassword ? <Eye /> : <EyeSlash />}</IconButton></InputAdornment> } }} />
                <RHFTextField<Values> name="confirmPassword" label="Xác nhận mật khẩu" type={showPassword ? 'text' : 'password'} autoComplete="new-password" />
                <Button fullWidth size="large" type="submit" variant="contained" disabled={methods.formState.isSubmitting}>{methods.formState.isSubmitting ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'}</Button>
            </div>
        </FormProvider>
    );
}
