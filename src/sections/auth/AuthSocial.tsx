import { Divider, IconButton } from '@mui/material';
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react';

export default function AuthSocial() {
    return <div>
        <Divider sx={{ my: 2.5, typography: 'overline', color: 'text.disabled', '&::before, &::after': { borderTopStyle: 'dashed' } }}>HOẶC</Divider>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }} >
            <IconButton aria-label="Google"><GoogleLogo color="#DF3E30" /></IconButton>
            <IconButton aria-label="GitHub" color="inherit"><GithubLogo /></IconButton>
            <IconButton aria-label="Twitter"><TwitterLogo color="#1C9CEA" /></IconButton>
        </div>
    </div>;
}
