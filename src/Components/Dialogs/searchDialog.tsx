import React, {useState} from 'react';

import {CacheProvider, ThemeProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import {createTheme} from "@mui/material/styles";
import {Button, Dialog, TextField} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {useNavigate} from "react-router-dom";

import DialogProps from '../../types/components/dialog/dialog';

function SearchDialog({onClose, open}: DialogProps) {
    const [searchStr, setSearchStr] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/search?str=${searchStr}`);
        onClose();
    };
    const handleSetString = (event: React.ChangeEvent<HTMLInputElement>) => setSearchStr(event.target.value);

    const theme = createTheme({
        direction: 'rtl',
    });
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],

    });

    return (
        <>
            <Dialog onClose={onClose} open={open} fullWidth>
                <div className="account-dialog-root">
                    <div className="account-dialog-header">
                        <span className="account-dialog-title">جستجو</span>
                    </div>
                    <div className="account-dialog-body">
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <div dir="rtl">
                                    <TextField
                                        sx={{width: '100%', marginBlock: '25px'}}
                                        inputProps={{style: {fontFamily: 'Segoe UI Light'}}} variant="outlined"
                                        name="name" value={searchStr} onChange={handleSetString}
                                        label="چی میخوای به خودم بگو"
                                    />
                                    <div className="account-dialog-btn-section">
                                        <Button style={{
                                            width: '25%',
                                            fontFamily: '"Yekan"',
                                            color: '#707070'
                                        }} variant="text" onClick={onClose}>
                                            لغو
                                        </Button>
                                        <Button style={{
                                            width: '70%',
                                            backgroundColor: '#98CCFF',
                                            color: '#0080FF',
                                            fontFamily: '"Yekan"',
                                        }} startIcon={<AccountBalanceWalletIcon style={{marginLeft: 20}}/>}
                                                variant="contained" onClick={handleSearch}>
                                            جستجو
                                        </Button>
                                    </div>
                                </div>
                            </ThemeProvider>
                        </CacheProvider>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default SearchDialog;