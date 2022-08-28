import '../Styles/Components/login.css';
import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";

import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import httpConnection from "../Utils/httpConnection";
import {useNavigate} from "react-router-dom";
import {Login} from "../Utils/userHandling";

function LoginBox() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNavigation = () => navigate('../signup');

    const handleChangeEmail = event => setEmail(event.target.value);
    const handleChangePassword = event => setPassword(event.target.value);

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
                        <div className="login-root">
                            <div className="login-container">
                                <div className="login-header">
                                    <div className="login-header-inner"><h4>ورود یا ثبت نام</h4></div>
                                </div>
                                <div className="login-body">
                                    <div className="login-title">
                                        لطفا ایمیل و رمز عبور خود را وارد نمایید
                                    </div>
                                    <div>
                                        <TextField sx={{width: '100%', marginBlock: '5px'}}
                                                   inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                                   variant="outlined" label="ایمیل"
                                                   value={email} onChange={handleChangeEmail}/>
                                        <TextField sx={{width: '100%', marginBlock: '5px'}}
                                                   inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                                   variant="outlined" label="رمز عبور"
                                                   value={password} onChange={handleChangePassword}/>
                                    </div>
                                    <div>
                                        <Button style={{
                                            width: '100%',
                                            paddingBlock: 15,
                                            backgroundColor: '#0080FF',
                                            color: 'white',
                                            boxShadow: '0 10px 20px -10px #0080FF',
                                            fontFamily: '"B Yekan"'
                                        }} variant="contained" onClick={(event) => Login(event, email, password)}>ورود</Button>
                                        <Button style={{
                                            width: '100%',
                                            paddingBlock: 15,
                                            color: '#0080FF',
                                            fontFamily: '"B Yekan"',
                                            marginTop: 10
                                        }} variant="text" onClick={handleNavigation}>ثبت نام</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </CacheProvider>
        </>
    );
}

export default LoginBox;
