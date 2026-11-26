export type ProfileGender = 'male' | 'female' | 'other';

export interface StoredProfile {
    name: string;
    username: string;
    phone: string;
    email: string;
    gender: ProfileGender;
    birthDate: string;
    bio: string;
}

const PROFILE_PREFIX = 'appchat_profile_';
const CURRENT_USER_KEY = 'appchat_current_user';

function normalizeUsername(username: string): string {
    return username.trim().toLowerCase();
}

function profileKey(username: string): string {
    return `${PROFILE_PREFIX}${normalizeUsername(username)}`;
}

export function saveRegisteredProfile(profile: StoredProfile): void {
    localStorage.setItem(profileKey(profile.username), JSON.stringify(profile));
}

export function getProfile(username: string): StoredProfile | null {
    const raw = localStorage.getItem(profileKey(username));
    if (!raw) return null;

    try {
        return JSON.parse(raw) as StoredProfile;
    } catch {
        localStorage.removeItem(profileKey(username));
        return null;
    }
}

export function setCurrentUser(username: string): void {
    localStorage.setItem(CURRENT_USER_KEY, normalizeUsername(username));
}

export function getCurrentUser(): string {
    return localStorage.getItem(CURRENT_USER_KEY) || '';
}

export function getCurrentProfile(): StoredProfile | null {
    const username = getCurrentUser();
    return username ? getProfile(username) : null;
}

export function saveCurrentProfile(profile: StoredProfile): void {
    saveRegisteredProfile(profile);
    setCurrentUser(profile.username);
}

export function clearCurrentUser(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
}
