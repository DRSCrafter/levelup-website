import '../Styles/Components/ProductPlate.css';
import React, {useContext, useState} from "react";

import {Button} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Counter from "../Components/counter";
import {Buy} from "../Utils/productHandling";
import UserContext from "../Context/userContext";

const {apiEndpoint} = require('../config/config.json');

function ProductPlate({product}) {
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
                <div className="product-plate-container-outer">
                    <div className="product-plate-container-inner">
                        <span className="product-plate-left-side">
                        <img src={product && `${apiEndpoint}/${product.productImage}`}
                             className="product-title-image" alt="product"/>
                        <div className="product-info-container">
                            <div>
                                <div className="product-title">{product && product.name}</div>
                                <div>{product.company && product.company.name}</div>
                            </div>
                            <div className="product-controls">
                                <div>تعداد:</div>
                                <div style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}>
                                    <Counter value={count} onChange={setCount} maxValue={product && product.stock}/>
                                    <span
                                        className={`product-info-price ${!isAvailable || !isLoggedIn ? 'text-danger' : ''}`}>
                                        {isLoggedIn ?
                                            (product && isAvailable ?
                                                `${product.price} تومان`
                                                : "کالا موجود نمی باشد") :
                                            'لطفا با حساب کاربری وارد شوید'
                                        }
                                    </span>
                                </div>
                                <Button style={{
                                    color: 'white',
                                    width: '100%',
                                    fontFamily: '"B Yekan", sans-serif',
                                    marginTop: 10,
                                    boxSizing: 'border-box',
                                    padding: 10
                                }}
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
                        <span className="product-plate-right-side">
                            <div className="product-exp">توضیحات</div>
                            {product && product.description}
                        </span>
                    </div>
                    <div className="product-details-root">
                        <div className="product-details-header-outer">
                            <span className="product-details-header-inner">جزئیات</span>
                        </div>
                        <div className="product-details-container">
                            {product.details && Object.keys(product.details).map(key => (
                                <div className="product-details">
                                    <span>{key}</span>
                                    <span>{product.details[key]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPlate;
