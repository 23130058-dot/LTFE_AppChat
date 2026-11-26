import { useState } from 'react';
import { Alert, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import { requestAuth } from '../../services/appChatSocket';

type ForgotPasswordInput = {
    email: string;
};

const schema = Yup.object({
    email: Yup.string()
        .trim()
        .email('Email không hợp lệ')
        .required('Vui lòng nhập email'),
});

export default function ResetPasswordForm() {
    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState('');

    const methods = useForm<ForgotPasswordInput>({
        resolver: yupResolver(schema) as never,
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (values: ForgotPasswordInput) => {
        setApiError('');
        setSuccess('');

        try {
            // Form này chỉ nhận email để yêu cầu đặt lại mật khẩu.
            // Vì vậy dùng event FORGOT_PASSWORD.
            await requestAuth('FORGOT_PASSWORD', {
                email: values.email.trim(),
            });

            setSuccess(
                'Nếu email tồn tại, hướng dẫn đặt lại mật khẩu sẽ được gửi đến hộp thư của bạn.',
            );
        } catch (error) {
            setApiError(
                error instanceof Error
                    ? error.message
                    : 'Không thể gửi yêu cầu. Vui lòng thử lại.',
            );
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <div style={{ display: 'grid', gap: 16 }}>
                {apiError && <Alert severity="error">{apiError}</Alert>}

                {success && <Alert severity="success">{success}</Alert>}

                <RHFTextField<ForgotPasswordInput>
                    name="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                />

                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={methods.formState.isSubmitting}
                >
                    {methods.formState.isSubmitting
                        ? 'Đang gửi...'
                        : 'Gửi yêu cầu'}
                </Button>
            </div>
        </FormProvider>
    );
}