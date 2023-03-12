import '../../Styles/Components/Popovers/popover.scss';
import React from 'react';
import {Popover} from "@mui/material";
import PopoverProps from '../../types/components/popovers/popover';

function MUIPopover({anchorEl, open, onClose, id, children}: PopoverProps) {
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

export default MUIPopover;