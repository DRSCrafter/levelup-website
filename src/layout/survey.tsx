import '../Styles/layout/survey.scss';
import React from "react";

import {IconButton} from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';

function Survey() {
    return (
        <>
            <div className="small__form">
                <div className="small__form__content">
                    <span className="small__form__text">نظر شما درباره این پروژه چیست؟</span>
                    <span className="small__form__input__root">
                        <IconButton className="small__form__button">
                            <TelegramIcon htmlColor="#0080FF"/>
                        </IconButton>
                        <input className="small__form__input" placeholder="لطفا نظر خود را وارد نمایید"/>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Survey;
