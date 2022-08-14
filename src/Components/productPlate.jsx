import '../Styles/Components/ProductPlate.css';
import React, {useState} from "react";

import {Button} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Counter from "../Components/counter";

function ProductPlate() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="product-plate-root">
                <div className="product-plate-container-outer">
                    <div className="product-plate-container-inner">
                        <span className="product-plate-left-side">
                        <img src={require('../Assets/product.jpg')} className="product-title-image" alt="product"/>
                        <div className="product-info-container">
                            <div>
                                <div className="product-title">Paper Mario the Origami King</div>
                                <div>Nintendo</div>
                            </div>
                            <div className="product-controls">
                                <div>تعداد:</div>
                                <div style={{width: "100%", display: 'flex', justifyContent: 'space-between'}}>
                                    <Counter value={count} onChange={setCount}/>
                                    <span className="product-info-price">1,300,000 تومان</span>
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
                                        endIcon={<ShoppingCartOutlinedIcon style={{minWidth: 30}}/>}>
                                    افزودن به سبدخرید
                                </Button>
                            </div>
                        </div>
                        </span>
                        <span className="product-plate-right-side">
                            <div className="product-exp">توضیحات</div>
                            ماجراجویی جدید ماریو که با کاغذ ساخته شده است در نینتندو سوییچ آشکار می شود.
این پادشاهی توسط یک تهدید اریگامی ویران شده است. به ماریو و شریک جدیدش، اولیویا بپیوندید تا در این ماجراجویی پر از کمدی، با سربازان شرور مبارزه کنند، منظره آسیب دیده را تعمیر کنند، و سعی کنند قلعه پرنسس هلو را از چنگ پادشاه اولی آزاد کنند.
در نبردهای استراتژیک و بر پایه حلقه مسلط شوید - دشمنان پراکنده را صف آرایی کنید و حمله خود را برای به حداکثر رساندن آسیب برنامه ریزی کنید با سیستم نبرد جدید و مبتنی بر حلقه که هم به مهارت های حل پازل و هم به مهارت سریع نیاز دارد.
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPlate;
