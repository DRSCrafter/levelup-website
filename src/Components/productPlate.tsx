import React, {useContext, useState} from "react";

import {Button} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Counter from "./counter.js";
import {Buy} from "../Utils/productHandling";
import UserContext from "../Context/userContext";
import Product from "../types/context/product";

import buttonStyles from '../Styles/MUI/button.style';

function ProductPlate({product}: { product: Product }) {
    const [count, setCount] = useState(0);

    const {user, handleUpdateUser, isLoggedIn} = useContext(UserContext);

    const handleBuy = async () => {
        const backup = count;
        try {
            setCount(0);
            await Buy(user, handleUpdateUser, product, count);
        } catch (ex) {
            setCount(backup);
        }
    }

    const isAvailable = product.stock !== 0;

    return (
        <>
            <div className="product-plate-root">
                <div className="product__plate--outer">
                    <div className="product__plate--inner">
                        <span className="product__plate__side--left">
                        <img src={product && product.productImage}
                             className="product__plate__image" alt="product"/>
                        <div className="product__plate__content">
                            <div>
                                <div className="product-__title">{product?.name}</div>
                                <div>{product?.company}</div>
                            </div>
                            <div className="product__controls">
                                <div>تعداد:</div>
                                <div style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}>
                                    <Counter value={count} onChange={setCount} maxValue={product?.stock}/>
                                    <span
                                        className={`product__plate__price ${!isAvailable || !isLoggedIn ? 'text--danger' : ''}`}>
                                        {isLoggedIn ?
                                            (product && isAvailable ?
                                                `${product.price} تومان`
                                                : "کالا موجود نمی باشد") :
                                            'لطفا با حساب کاربری وارد شوید'
                                        }
                                    </span>
                                </div>
                                <Button style={{
                                    ...buttonStyles.base,
                                    ...buttonStyles.productButton
                                } as React.CSSProperties}
                                        variant="contained"
                                        endIcon={<ShoppingCartOutlinedIcon style={{minWidth: 30}}/>}
                                        onClick={handleBuy}
                                        disabled={count === 0 || !isLoggedIn}
                                >
                                    افزودن به سبدخرید
                                </Button>
                            </div>
                        </div>
                        </span>
                        <span className="product__plate__side--right">
                            <div className="product__exp">توضیحات</div>
                            {product && product.description}
                        </span>
                    </div>
                    {product.details &&
                        <div className="product__plate__details">
                            <div className="product__header--outer">
                                <span className="product__header--inner">جزئیات</span>
                            </div>
                            <div className="product__details__container">
                                {product.details && Object.keys(product.details).map(key => (
                                    <div className="product__details">
                                        <span>{key}</span>
                                        <span>{product.details[key]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default ProductPlate;
