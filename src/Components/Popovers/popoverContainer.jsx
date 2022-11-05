import '../../Styles/Components/Popovers/popoverContainer.css';
import React from 'react';
import {Popover} from "@mui/material";

function PopoverContainer({anchorEl, onClose, id, open, children}) {

    return (
        <>
            <Popover
                className="popover-root"
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                sx={{overflow: 'visible!important'}}
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

export default PopoverContainer;