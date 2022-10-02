import '../../Styles/Components/iconPopOver.css';
import React from 'react';
import {Popover} from "@mui/material";

function IconPopover({anchorEl, onClose, id, open, children}) {

    return (
        <>
            <Popover
                className="popover-root"
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {children}
            </Popover>
        </>
    );
}

export default IconPopover;