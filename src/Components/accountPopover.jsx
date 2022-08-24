import '../Styles/Components/accountPopover.css';
import React, {useState} from 'react';
import IconPopOver from "./iconPopOver";

import {IconButton} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function AccountPopover() {
    const [popAnchorEl2, setPopAnchorEl2] = useState(null);

    const handlePopOver2 = (event) => {
        setPopAnchorEl2(event.currentTarget);
    }
    const handleClosePopOver2 = () => {
        setPopAnchorEl2(null);
    }

    const openCart = Boolean(popAnchorEl2);
    const shoppingCardID = openCart ? 'shopping-card-popover' : undefined;

    return (
        <>
            <IconButton className="navbar-icon-btn" aria-describedby={shoppingCardID} onClick={handlePopOver2}>
                <AccountBalanceWalletIcon htmlColor="#0080FF"/>
            </IconButton>
            <IconPopOver anchorEl={popAnchorEl2} onClose={handleClosePopOver2} open={openCart} id={shoppingCardID}>
            </IconPopOver>
        </>
    );
}

export default AccountPopover;