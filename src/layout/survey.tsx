import '../Styles/layout/survey.css';
import React from "react";

import {IconButton} from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';

function Survey() {
    return (
        <>
            <div className="small-form-root">
                <div className="small-form-container">
                    <span className="small-form-text">نظر شما درباره این پروژه چیست؟</span>
                    <span className="small-form-input-container">
                        <IconButton className="small-form-submit-btn">
                            <TelegramIcon htmlColor="#0080FF"/>
                        </IconButton>
                        <input className="small-form-input" placeholder="لطفا نظر خود را وارد نمایید"/>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Survey;
