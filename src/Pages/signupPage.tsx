import '../Styles/Pages/loginPage.scss';
import '../Styles/Pages/signupPage.scss';
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

import httpConnection from "../Utils/http";

import signupFields from "../Data/signupFields.js";
import {IIndexable} from "../types/global";

import textFieldStyles from '../Styles/MUI/textField.style';
import buttonStyles from '../Styles/MUI/button.style';

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

    handleFileChange = (event: React.ChangeEvent<any>) => this.setState({profileImage: event.target.files[0]});

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

        const errors: IIndexable = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    validateProperty = ({name: key, value}: { name: string, value: string | number }) => {
        const obj = {[key]: value};
        const schema = Joi.object({[key]: this.schema.extract(key)});
        const {error} = schema.validate(obj);
        return error ? error.details[0].message : null;
    };

    handleChange = ({currentTarget: input}: React.ChangeEvent<HTMLInputElement>) => {
        const errors: IIndexable = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data: IIndexable = {...this.state.data};
        data[input.name] = input.value;

        this.setState({data, errors});
    };

    handleSubmit = async (e: React.FormEvent) => {
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
        (window as Window).location = '/';
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
                            <div className="login">
                                <form className="login__content" onSubmit={this.handleSubmit}>
                                    <div className="login__header">
                                        <div className="login__header--inner"><h4>ثبت نام</h4></div>
                                    </div>
                                    <div className="login__body">
                                        <div className="login__title">
                                            لطفا مشخصات لازم را وارد نمایید
                                        </div>
                                        <div>
                                            {signupFields.map(field => (
                                                <TextField
                                                    sx={textFieldStyles.formField}
                                                    inputProps={{style: {fontFamily: 'Segoe UI Light'}}}
                                                    variant="outlined"
                                                    name={field.tag} value={(data as IIndexable)[field.tag]}
                                                    onChange={this.handleChange}
                                                    label={(errors as IIndexable)[field.tag] ? "خطا" : field.label}
                                                    error={(errors as IIndexable)[field.tag]}
                                                    helperText={(errors as IIndexable)[field.tag]}
                                                />
                                            ))}
                                            <div className="signup-upload-image">
                                                <span>آپلود عکس:</span>
                                                <IconButton
                                                    color="primary"
                                                    component="label"
                                                >
                                                    <input hidden accept="image/*" type="file"
                                                           onChange={this.handleFileChange}/>
                                                    <PhotoCamera/>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div>
                                            <LoadingButton
                                                loading={loading}
                                                variant="contained"
                                                style={{
                                                    ...buttonStyles.base,
                                                    ...buttonStyles.formPrimaryButton(loading)
                                                }}
                                                type="submit"
                                            >
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
