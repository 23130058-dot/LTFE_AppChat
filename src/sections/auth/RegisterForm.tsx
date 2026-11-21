import { useState } from 'react';
import {
    Alert,
    Button,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Link
} from '@mui/material';
import '../../styles/login.scss';
import { Eye, EyeSlash } from 'phosphor-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { authApi } from '../../services/authApi';

type RegisterFormValues = {
    name: string;
    username: string;
    phone: string;
    email: string;
    gender: string;
    birthDate: string;
    password: string;
    confirmPassword: string;
};

const schema = Yup.object({
    name: Yup.string()
        .trim()
        .min(2, 'Tên phải có ít nhất 2 ký tự')
        .required('Vui lòng nhập tên'),

    username: Yup.string()
        .trim()
        .matches(
            /^[A-Za-z0-9_]+$/,
            'Tên người dùng chỉ gồm chữ, số và dấu gạch dưới',
        )
        .min(3, 'Tên người dùng phải có ít nhất 3 ký tự')
        .required('Vui lòng nhập tên người dùng'),

    phone: Yup.string()
        .trim()
        .matches(
            /^(0|\+84)[0-9]{9,10}$/,
            'Số điện thoại không hợp lệ',
        )
        .required('Vui lòng nhập số điện thoại'),

    email: Yup.string()
        .trim()
        .email('Email không hợp lệ')
        .required('Vui lòng nhập email'),

    gender: Yup.string().required('Vui lòng chọn giới tính'),

    birthDate: Yup.string().required('Vui lòng chọn ngày sinh'),

    password: Yup.string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Vui lòng nhập mật khẩu'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
});

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            username: '',
            phone: '',
            email: '',
            gender: '',
            birthDate: '',
            password: '',
            confirmPassword: '',
        },
    });

    const gender = watch('gender');

    const onSubmit = async (values: RegisterFormValues) => {
        setApiError('');
        setSuccess('');

        try {
            // API WebSocket REGISTER chỉ nhận:
            // user = tên người dùng
            // pass = mật khẩu
            await authApi.register({
                user: values.username.trim(),
                pass: values.password,
            });

            setSuccess('Đăng ký thành công. Bạn có thể đăng nhập.');

            window.setTimeout(() => {
                navigate('/auth/login');
            }, 1200);
        } catch (error) {
            setApiError(
                error instanceof Error
                    ? error.message
                    : 'Đăng ký thất bại. Vui lòng thử lại.',
            );
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                {apiError && <Alert severity="error">{apiError}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <TextField
                    fullWidth
                    label="Tên"
                    placeholder="Nguyễn Văn A"
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    autoComplete="name"
                />

                <div className="register-two-columns">
                    <TextField
                        fullWidth
                        label="Tên người dùng"
                        placeholder="nguyenvana"
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        autoComplete="username"
                    />

                    <TextField
                        fullWidth
                        label="Số điện thoại"
                        placeholder="0901234567"
                        {...register('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        autoComplete="tel"
                        inputMode="tel"
                    />
                </div>

                <TextField
                    fullWidth
                    label="Email"
                    placeholder="email@example.com"
                    type="email"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    autoComplete="email"
                />

                <div className="register-two-columns">
                    <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel id="register-gender-label">
                            Giới tính
                        </InputLabel>

                        <Select
                            labelId="register-gender-label"
                            label="Giới tính"
                            value={gender}
                            onChange={(event) =>
                                setValue(
                                    'gender',
                                    event.target.value,
                                    { shouldValidate: true },
                                )
                            }
                        >
                            <MenuItem value="">Chọn giới tính</MenuItem>
                            <MenuItem value="male">Nam</MenuItem>
                            <MenuItem value="female">Nữ</MenuItem>
                            <MenuItem value="other">Khác</MenuItem>
                        </Select>

                        <FormHelperText>
                            {errors.gender?.message}
                        </FormHelperText>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Ngày sinh"
                        type="date"
                        {...register('birthDate')}
                        error={!!errors.birthDate}
                        helperText={errors.birthDate?.message}
                        InputLabelProps={{ shrink: true }}
                    />
                </div>

                <TextField
                    fullWidth
                    label="Mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete="new-password"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((value) => !value)
                                        }
                                        sx={{ minWidth: 0, p: 0.5 }}
                                    >
                                        {showPassword ? (
                                            <EyeSlash size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </Button>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <TextField
                    fullWidth
                    label="Xác nhận mật khẩu"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    autoComplete="new-password"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (value) => !value,
                                            )
                                        }
                                        sx={{ minWidth: 0, p: 0.5 }}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeSlash size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </Button>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <div className="register-login">
                    Đã có tài khoản?{' '}
                    <Link component={RouterLink} to="/auth/login">
                        Đăng nhập
                    </Link>
                </div>

                <Button fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting} sx={{ mt: 0.5, py: 1.35 }}>
                    {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                </Button>
            </div>
        </form>
    );
}
