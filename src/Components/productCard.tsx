import '../Styles/Components/productCard.scss';
import React, {useContext} from 'react';
import UserContext from "../Context/userContext";

import {Button, IconButton, useMediaQuery} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {useNavigate} from "react-router-dom";
import {Buy, Like} from "../Utils/productHandling";
import {LazyLoadImage} from "react-lazy-load-image-component";
import ProductCardProps from "../types/components/productCard";
import placeholder from '../Assets/itemholder.jpg';

import buttonStyles from '../Styles/MUI/button.style';

function ProductCard({info, shadow = false}: ProductCardProps) {
    const {_id, name, price, thumbnailImage, stock} = info;
    const {user, handleUpdateUser, isLoggedIn} = useContext(UserContext);

    const matches = useMediaQuery('(min-width: 1024px)');
    const navigate = useNavigate();

    const isAvailable = stock !== 0;

    const handleClick = () => {
        if (isAvailable)
            navigate(`/products/${_id}`);
    }

    const handleBuy = (event: React.FormEvent) => {
        event.stopPropagation();

        if (isLoggedIn)
            Buy(user, handleUpdateUser, info);
        else
            navigate('/signup');
    }

    const handleLike = (event: React.FormEvent) => {
        event.stopPropagation();

        if (isLoggedIn)
            Like(user, handleUpdateUser, _id);
        else
            navigate('/signup');
    }

    return (
        <>
            <div className={`card__root ${shadow ? 'card__shadow' : ''}`} onClick={handleClick}>
                <div className="card__root">
                    <LazyLoadImage
                        src={thumbnailImage}
                        placeholderSrc={placeholder}
                        className="product__image"
                        alt="product"
                    />
                    <div className="product__info">
                        <div className="product__name">{name}</div>
                        <div className={`product__price ${!isAvailable ? "text--danger" : ''}`}>
                            {isAvailable ? `${price} تومان` : 'ناموجود'}
                        </div>
                        <div className="product__commands">
                            <Checkbox
                                style={{color: "#FF5D5D"}} icon={<FavoriteBorder htmlColor="#FF5D5D"/>}
                                checkedIcon={<Favorite htmlColor="#FF5D5D"/>}
                                checked={user?.likes?.includes(_id)}
                                onClick={handleLike}/>
                            {matches ?
                                <Button
                                    style={{
                                        ...buttonStyles.base,
                                        ...buttonStyles.cardButton
                                    }}
                                    variant="outlined"
                                    endIcon={<ShoppingCartOutlinedIcon style={{minWidth: 30}}/>}
                                    onClick={handleBuy}
                                    disabled={!isAvailable}>خرید</Button> :
                                <IconButton style={{color: "#0080FF"}} onClick={handleBuy}>
                                    <ShoppingCartOutlinedIcon htmlColor="#0080FF"/>
                                </IconButton>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;