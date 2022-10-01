import '../Styles/Components/login.css';
import React, {Component} from 'react';
import Joi from 'joi';

import {Button, IconButton, TextField} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

import httpConnection from "../Utils/httpConnection";

const {apiEndpoint} = require('../config/config.json');

class SignUpBox extends Component {

    state = {
        data: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        profileImage: null,
        errors: {}
    }

    handleFileChange = event => this.setState({profileImage: event.target.files[0]});

    schema = Joi.object({
        name: Joi.string().required().min(3).messages({
            "string.empty": "لطفا نام خود را وارد کنید",
            "string.min": "حداقل 3 کاراکتر برای نام وارد کنید",
        }),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).messages({
            "string.empty": "لطفا پست الکترونیک را وارد کنید",
            "string.email": "لطفا یک ایمیل معتبر وارد کنید",
        }),
        password: Joi.string().min(5).max(100).required().messages({
            "string.empty": "لطفا رمز عبور را وارد کنید",
            "string.min": "رمز عبور نباید کمتر از 5 کاراکتر باشد",
            "string.max": "رمز عبور نباید بیش از 100 کاراکتر باشد",
        }),
        passwordConfirm: Joi.string().required().messages({
            "string.empty": "لطفا رمز عبور را تکرار کنید",
        }),
    });

    validate = () => {
        const {error} = this.schema.validate(this.state.data, {abortEarly: false})
        if (!error) return null;

        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({name: key, value}) => {
        const obj = {[key]: value};
        const schema = Joi.object({[key]: this.schema.extract(key)});
        const {error} = schema.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;

        this.setState({data, errors});
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const {data, profileImage} = this.state;
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('userImage', profileImage);

        try {
            const request = await httpConnection.post(`${apiEndpoint}users/`, formData);
            localStorage.setItem("token", request.headers['x-auth-token']);
            window.location = '/';
        } catch (ex) {
            console.log(ex.response.message);
        }
    };

    theme = createTheme({
        direction: 'rtl',
    });
    cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    render() {
        const {data, errors} = this.state;

        return (
            <>
                <CacheProvider value={this.cacheRtl}>
                    <ThemeProvider theme={this.theme}>
                        <div dir="rtl">
                            <div className="login-root">
                                <div className="login-container">
                                    <div className="login-header">
                                        <div className="login-header-inner"><h4>ثبت نام</h4></div>
                                    </div>
                                    <div className="login-body">
                                        <div className="login-title">
                                            لطفا مشخصات لازم را وارد نمایید
                                        </div>
                                        <div>
                                            <TextField sx={{width: '100%', marginBlock: '5px'}}
                                                       inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                                       variant="outlined"
                                                       name="name" value={data.name} onChange={this.handleChange}
                                                       label={errors.name ? "خطا" : "نام و نام خانوادگی"}
                                                       error={errors.name} helperText={errors.name}/>
                                            <TextField sx={{width: '100%', marginBlock: '5px'}}
                                                       inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                                       variant="outlined"
                                                       name="email" value={data.email} onChange={this.handleChange}
                                                       label={errors.email ? "خطا" : "پست الکترونیک"}
                                                       error={errors.email} helperText={errors.email}/>
                                            <TextField sx={{width: '100%', marginBlock: '5px'}}
                                                       inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                                       variant="outlined"
                                                       name="password" value={data.password}
                                                       onChange={this.handleChange}
                                                       label={errors.password ? "خطا" : "رمز عبور"}
                                                       error={errors.password} helperText={errors.password}/>
                                            <TextField sx={{width: '100%', marginBlock: '5px'}}
                                                       inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                                       variant="outlined"
                                                       name="passwordConfirm" value={data.passwordConfirm}
                                                       onChange={this.handleChange}
                                                       label={errors.passwordConfirm ? "خطا" : "تکرار رمز عبور"}
                                                       error={errors.passwordConfirm}
                                                       helperText={errors.passwordConfirm}/>
                                            <div className="signup-upload-image">
                                                <span>آپلود عکس:</span>
                                                <IconButton color="primary" aria-label="upload picture"
                                                            component="label">
                                                    <input hidden accept="image/*" type="file"
                                                           onChange={this.handleFileChange}/>
                                                    <PhotoCamera/>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div>
                                            <Button style={{
                                                width: '100%',
                                                paddingBlock: 15,
                                                backgroundColor: '#0080FF',
                                                color: 'white',
                                                boxShadow: '0 10px 20px -10px #0080FF',
                                                fontFamily: '"B Yekan"'
                                            }} variant="contained" onClick={this.handleSubmit}>ثبت نام</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </CacheProvider>
            </>
        );
    }
}

export default SignUpBox;
