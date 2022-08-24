import '../Styles/Components/login.css';
import React from 'react';
import {Button} from "@mui/material";

function LoginBox() {

    return (
        <>
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
                            <input className="login-input" placeholder="ایمیل"/>
                            <input className="login-input" placeholder="رمز عبور"/>
                        </div>
                        <div>
                            <Button style={{
                                width: '100%',
                                paddingBlock: 15,
                                backgroundColor: '#0080FF',
                                color: 'white',
                                boxShadow: '0 10px 20px -10px #0080FF',
                                fontFamily: '"B Yekan"'
                            }} variant="contained">ورود</Button>
                            <Button style={{
                                width: '100%',
                                paddingBlock: 15,
                                color: '#0080FF',
                                fontFamily: '"B Yekan"',
                                marginTop: 10
                            }} variant="text">ثبت نام</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginBox;
