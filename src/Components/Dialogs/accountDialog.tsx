import '../../Styles/Components/Dialogs/accountDialog.scss';
import React, {useState} from 'react';

import {Button, Dialog, TextField, useMediaQuery} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import {CacheProvider, ThemeProvider} from "@emotion/react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountDialogProps from "../../types/components/dialog/accountDialog";

import textFieldStyles from '../../Styles/MUI/textField.style';
import buttonStyles from '../../Styles/MUI/button.style';

function AccountDialog({onClose, open, onCharge}: AccountDialogProps) {
    const isPC = useMediaQuery('(min-width: 1024px)');

    const handleClose = () => {
        onClose();
    };

    const [amount, setAmount] = useState('');
    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        setAmount(onlyNums);
    }

    const theme = createTheme({
        direction: 'rtl',
    });
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <>
            <Dialog onClose={handleClose} open={open} fullWidth={!isPC}>
                <div className="account__dialog">
                    <div className="account__dialog__header">
                        <span className="account__dialog__title">افزایش اعتبار</span>
                    </div>
                    <div className="account__body">
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <div dir="rtl">
                                    <span>مبلغ موردنظر (تومان):</span>
                                    <TextField
                                        sx={{width: '100%', marginBlock: '25px'}}
                                        inputProps={{style: textFieldStyles.input}} variant="outlined"
                                        name="name" value={amount} onChange={handleChangeAmount}
                                        label="مبلغ موردنظر را وارد نمایید"
                                    />
                                    <div className="account__dialog__button__section">
                                        <Button style={{
                                            ...buttonStyles.base,
                                            ...buttonStyles.dialogSecondary
                                        }} variant="text" onClick={onClose}>
                                            لغو
                                        </Button>
                                        <Button
                                            style={{
                                                ...buttonStyles.base,
                                                ...buttonStyles.dialogPrimary
                                            }}
                                            startIcon={<AccountBalanceWalletIcon style={{marginLeft: 20}}/>}
                                            variant="contained" onClick={() => onCharge(+amount)}
                                        >
                                            پرداخت
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

export default AccountDialog;