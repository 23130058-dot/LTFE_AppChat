import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faLock, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getCurrentProfile, getCurrentUser, saveCurrentProfile } from '../../services/profileStorage';
import './SettingsPageStyle.scss';

type Gender = 'male' | 'female' | 'other';

interface ProfileForm {
    displayName: string;
    username: string;
    email: string;
    phone: string;
    gender: Gender;
    birthday: string;
    bio: string;
}

const BIO_MAX_LENGTH = 150;

function loadProfile(): ProfileForm {
    const profile = getCurrentProfile();
    const username = getCurrentUser();

    if (profile) {
        return {
            displayName: profile.name || '',
            username: profile.username || username,
            email: profile.email || '',
            phone: profile.phone || '',
            gender: profile.gender || 'male',
            birthday: profile.birthDate || '',
            bio: profile.bio || '',
        };
    }

    return {
        displayName: '',
        username,
        email: '',
        phone: '',
        gender: 'male',
        birthday: '',
        bio: '',
    };
}

function SettingsPage() {
    const initialProfile = loadProfile();
    const [savedProfile, setSavedProfile] = useState<ProfileForm>(initialProfile);
    const [form, setForm] = useState<ProfileForm>(initialProfile);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isDirty = JSON.stringify(form) !== JSON.stringify(savedProfile);

    useEffect(() => {
        const profile = loadProfile();
        setSavedProfile(profile);
        setForm(profile);
    }, []);

    useEffect(() => {
        return () => {
            if (avatarUrl) URL.revokeObjectURL(avatarUrl);
        };
    }, [avatarUrl]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarUrl(URL.createObjectURL(file));
    };

    const handleReset = () => setForm(savedProfile);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        saveCurrentProfile({
            name: form.displayName,
            username: form.username,
            email: form.email,
            phone: form.phone,
            gender: form.gender,
            birthDate: form.birthday,
            bio: form.bio,
        });

        setSavedProfile(form);
    };

    const initials = form.displayName
        .split(' ')
        .filter(Boolean)
        .slice(-2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();

    return (
        <div className="settings">
            <div className="settings__container">
                <h1 className="settings__title">Cài đặt tài khoản</h1>

                <form className="settings__card" onSubmit={handleSubmit}>
                    <div className="settings__profile-header">
                        <div className="settings__avatar-wrapper">
                            <div className="settings__avatar">
                                {avatarUrl ? <img src={avatarUrl} alt="Ảnh đại diện" /> : initials || 'U'}
                            </div>

                            <button
                                type="button"
                                className="settings__avatar-edit"
                                onClick={() => fileInputRef.current?.click()}
                                title="Đổi ảnh đại diện"
                                aria-label="Đổi ảnh đại diện"
                            >
                                <FontAwesomeIcon icon={faCamera} />
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleAvatarChange}
                            />
                        </div>

                        <div className="settings__profile-info">
                            <p className="settings__profile-name">{form.displayName || 'Chưa đặt tên'}</p>
                            <p className="settings__profile-username">@{form.username}</p>
                        </div>
                    </div>

                    <div className="settings__form-grid">
                        <div className="settings__field settings__field--full">
                            <label htmlFor="displayName">Tên hiển thị</label>
                            <input id="displayName" name="displayName" value={form.displayName} onChange={handleChange} required />
                        </div>

                        <div className="settings__field">
                            <label htmlFor="username">Tên người dùng</label>
                            <input id="username" name="username" value={form.username} onChange={handleChange} required />
                        </div>

                        <div className="settings__field">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
                        </div>

                        <div className="settings__field settings__field--full">
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                        </div>

                        <div className="settings__field">
                            <label htmlFor="gender">Giới tính</label>
                            <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>

                        <div className="settings__field">
                            <label htmlFor="birthday">Ngày sinh</label>
                            <input id="birthday" name="birthday" type="date" value={form.birthday} onChange={handleChange} />
                        </div>

                        <div className="settings__field settings__field--full">
                            <label htmlFor="bio">Giới thiệu</label>
                            <textarea id="bio" name="bio" rows={3} maxLength={BIO_MAX_LENGTH} placeholder="Viết vài dòng về bạn..." value={form.bio} onChange={handleChange} />
                            <span className="settings__counter">{form.bio.length}/{BIO_MAX_LENGTH}</span>
                        </div>
                    </div>

                    <div className="settings__actions">
                        <button type="button" className="settings__btn settings__btn--secondary" onClick={handleReset} disabled={!isDirty}>Hủy</button>
                        <button type="submit" className="settings__btn settings__btn--primary" disabled={!isDirty}>Lưu thay đổi</button>
                    </div>
                </form>

                <section className="settings__card">
                    <h2 className="settings__card-title">Bảo mật</h2>
                    <button type="button" className="settings__row">
                        <span className="settings__row-icon"><FontAwesomeIcon icon={faLock} /></span>
                        <span className="settings__row-text">
                            <strong>Đổi mật khẩu</strong>
                            <small>Nên dùng mật khẩu mạnh và không trùng với tài khoản khác</small>
                        </span>
                        <FontAwesomeIcon icon={faChevronRight} className="settings__row-arrow" />
                    </button>
                </section>
            </div>
        </div>
    );
}

export default SettingsPage;
