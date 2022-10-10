import '../Styles/Pages/loginPage.css';
import React, {Component} from 'react';
import Joi from 'joi';

import {IconButton, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {PhotoCamera} from "@mui/icons-material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

import httpConnection from "../Utils/httpConnection";

import signupFields from "../Data/signupFields";

class SignupPage extends Component {

    state = {
        data: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },
        profileImage: null,
        errors: {},
        loading: false
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
        this.setState({loading: true});

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        const {data, profileImage} = this.state;
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        if (profileImage)
            formData.append('userImage', profileImage);

        const request = await httpConnection.post('/users/', formData);
        localStorage.setItem("token", request.headers['x-auth-token']);
        this.setState({loading: false});
        window.location = '/';
    };

    theme = createTheme({
        direction: 'rtl',
    });
    cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    render() {
        const {data, errors, loading} = this.state;

        return (
            <>
                <CacheProvider value={this.cacheRtl}>
                    <ThemeProvider theme={this.theme}>
                        <div dir="rtl">
                            <div className="login-root">
                                <form className="login-container" onSubmit={this.handleSubmit}>
                                    <div className="login-header">
                                        <div className="login-header-inner"><h4>ثبت نام</h4></div>
                                    </div>
                                    <div className="login-body">
                                        <div className="login-title">
                                            لطفا مشخصات لازم را وارد نمایید
                                        </div>
                                        <div>
                                            {signupFields.map(field => (
                                                <TextField sx={{width: '100%', marginBlock: '5px'}}
                                                           inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                                           variant="outlined"
                                                           name={field.tag} value={data[field.tag]}
                                                           onChange={this.handleChange}
                                                           label={errors[field.tag] ? "خطا" : field.label}
                                                           error={errors[field.tag]} helperText={errors[field.tag]}/>
                                            ))}
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
                                            <LoadingButton
                                                loading={loading}
                                                style={{
                                                    width: '100%',
                                                    paddingBlock: 15,
                                                    color: `${loading ? 'rgba(0,0,0,0)' : 'white'}`,
                                                    boxShadow: `0 10px 20px -10px ${loading ? 'gray' : '#0080FF'}`,
                                                    fontFamily: '"Yekan"'
                                                }} variant="contained"
                                                type="submit">
                                                ثبت نام
                                            </LoadingButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ThemeProvider>
                </CacheProvider>
            </>
        );
    }
}

export default SignupPage;
