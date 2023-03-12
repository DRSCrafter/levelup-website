import '../Styles/Pages/loginPage.scss';
import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";

import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {useNavigate} from "react-router-dom";
import {Login} from "../Utils/userHandling";
import LoadingButton from "@mui/lab/LoadingButton";

import buttonStyles from '../Styles/MUI/button.style';
import textFieldStyles from '../Styles/MUI/textField.style';

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNavigation = () => navigate('../signup');

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleLogin = (e: React.FormEvent) => Login(e, email, password, setLoading);

    const theme = createTheme({
        direction: 'rtl',
    });
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <div dir="rtl">
                        <div className="login">
                            <form className="login__content" onSubmit={handleLogin}>
                                <div className="login__header">
                                    <div className="login__header--inner"><h4>ورود یا ثبت نام</h4></div>
                                </div>
                                <div className="login__body">
                                    <div className="login__title">
                                        لطفا ایمیل و رمز عبور خود را وارد نمایید
                                    </div>
                                    <div>
                                        <TextField
                                            sx={textFieldStyles.formField}
                                            inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                            variant="outlined" label="ایمیل"
                                            value={email} onChange={handleChangeEmail}
                                        />
                                        <TextField
                                            sx={textFieldStyles.formField}
                                            inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                            variant="outlined" label="رمز عبور"
                                            value={password} onChange={handleChangePassword}
                                        />
                                    </div>
                                    <div>
                                        <LoadingButton
                                            loading={loading}
                                            variant="contained"
                                            style={{
                                                ...buttonStyles.base,
                                                ...buttonStyles.formPrimaryButton(loading)
                                            }}
                                            type="submit"
                                        >
                                            ورود
                                        </LoadingButton>
                                        <Button
                                            variant="text"
                                            style={{
                                                ...buttonStyles.base,
                                                ...buttonStyles.formSecondaryButton
                                            }}
                                            onClick={handleNavigation}
                                        >
                                            ثبت نام
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </ThemeProvider>
            </CacheProvider>
        </>
    );
}

export default LoginPage;
