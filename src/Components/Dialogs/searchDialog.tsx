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

import textFieldStyles from '../../Styles/MUI/textField.style';
import buttonStyles from '../../Styles/MUI/button.style';

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
                <div className="account__dialog">
                    <div className="account__dialog__header">
                        <span className="account__dialog__title">جستجو</span>
                    </div>
                    <div className="account__body">
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <div dir="rtl">
                                    <TextField
                                        sx={textFieldStyles.searchDialog}
                                        inputProps={{style: textFieldStyles.input}} variant="outlined"
                                        name="name" value={searchStr} onChange={handleSetString}
                                        label="چی میخوای به خودم بگو"
                                    />
                                    <div className="account__dialog__button__section">
                                        <Button style={{
                                            ...buttonStyles.base,
                                            ...buttonStyles.dialogSecondary
                                        }} variant="text" onClick={onClose}>
                                            لغو
                                        </Button>
                                        <Button style={{
                                            ...buttonStyles.base,
                                            ...buttonStyles.dialogPrimary
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