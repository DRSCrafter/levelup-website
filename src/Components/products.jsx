import '../Styles/Components/products.css';
import React, {useContext, useEffect, useState} from "react";
import {Pagination, Slider} from "@mui/material";

import SideFilter from "../Components/sideFilter";
import SearchBar from "../Components/searchBar";
import CheckBox from "../Components/checkBox";
import RadioBox from "../Components/radioBox";
import RadioButton from "../Components/radioButton";
import ProductCard from "../Components/productCard";
import httpConnection from "../Utils/httpConnection";
import UserContext from "../Context/userContext";
import toast from "react-hot-toast";

function Products({
                      items,
                      onCheckboxChange,
                      radioValue,
                      onRadioChange,
                      pageValue,
                      onPageChange,
                      filterValue,
                      onFilterChange,
                      maxPrice,
                      onSubmitString
                  }) {
    const [string, setString] = useState('');

    const handleChangeString = event => {
        setString(event.target.value);
    }

    const [range, setRange] = useState(-1);
    const [price, setPrice] = useState(maxPrice);

    const handleRange = event => setRange(event.target.value);

    const handlePriceChange = (event, newValue) => {
        setPrice(newValue);
    }

    const [scrollPos, setScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        setScrollPos(document.body.getBoundingClientRect().top);
        setVisible(document.body.getBoundingClientRect().top > scrollPos);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const {user, handleUpdateUser} = useContext(UserContext);

    const handleBuy = async (info, quantity = 1) => {
        let shoppingCart = [...user.shoppingCart];
        let backupCart = [...user.shoppingCart];
        try {
            let orderIndex = -1;
            const order = {
                productID: info._id,
                name: info.name,
                quantity: quantity,
                totalPrice: info.price * quantity
            };

            const orderIDList = shoppingCart.map(item => item.productID);
            const itemExists = orderIDList.findIndex(productID => productID == info._id) !== -1;

            if (!itemExists) {
                shoppingCart.push(order);
            } else {
                orderIndex = shoppingCart.findIndex(item => item.productID === info._id);
                shoppingCart[orderIndex].quantity = shoppingCart[orderIndex].quantity + quantity;
                shoppingCart[orderIndex].totalPrice = shoppingCart[orderIndex].totalPrice + info.price * quantity;
            }
            handleUpdateUser('shoppingCart', shoppingCart);

            await httpConnection.post('http://localhost:3001/api/users/' + user._id + '/order', JSON.stringify({
                ...order,
                itemExists: itemExists
            }), {
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            });

            toast.success("به سبد اضافه شد");
        } catch (ex) {
            handleUpdateUser('shoppingCart', backupCart);
            toast.error(ex.response.message);
        }
    };

    const handleLike = async (id) => {
        let likes = [...user.likes];

        if (user.likes.includes(id)) {
            const dislike = JSON.stringify({userID: user._id, isIncrement: false});
            try {
                console.log(likes);
                likes = likes.filter(productID => productID !== id);
                console.log(likes);
                await httpConnection.put(`http://localhost:3001/api/products/${id}/like`, dislike, {
                    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
                });
                console.log('disliked');
            } catch (ex) {
                likes.push(id);
                console.log(ex.response.message);
            }
        } else {
            try {
                likes.push(id);
                const like = JSON.stringify({userID: user._id, isIncrement: true});
                await httpConnection.put(`http://localhost:3001/api/products/${id}/like`, like, {
                    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
                });
                console.log('liked');
            } catch (ex) {
                likes = likes.filter(productID => productID !== id);
                console.log(ex.response.message);
            }
        }

        handleUpdateUser('likes', likes);
    }

    const filteredItems = items.length !== 0 && range !== -1 ? items.filter(item => item.price <= price) : items;

    return (
        <>
            <div className="products-root">
                <div className="products-items-container">
                    <div className="products-top-filter-root">
                        <div className="products-top-filter-container">
                            <span className="products-top-filter-title">مرتب سازی بر اساس:</span>
                            <RadioButton value={'dateCreated'} selectedValue={filterValue}
                                         onSelect={onFilterChange}>
                                جدیدترین
                            </RadioButton>
                            <RadioButton value={'likes'} selectedValue={filterValue} onSelect={onFilterChange}>
                                محبوب ترین
                            </RadioButton>
                            <RadioButton value={'-price'} selectedValue={filterValue} onSelect={onFilterChange}>
                                ارزان ترین
                            </RadioButton>
                            <RadioButton value={'price'} selectedValue={filterValue} onSelect={onFilterChange}>
                                گران ترین
                            </RadioButton>
                        </div>
                    </div>
                    <div className="products-grid">
                        {filteredItems.map(item => (
                            <div className="products-grid-item" key={item.name}>
                                <ProductCard info={item} onBuy={handleBuy} onLike={handleLike} shadow/>
                            </div>
                        ))}
                    </div>
                    <div className="products-pagination">
                        <Pagination count={10} page={pageValue} onChange={onPageChange}/>
                    </div>
                </div>
                <div className={`products-side-container ${!visible ? 'side-up' : ''}`}>
                    <SearchBar placeholder="نام محصول را جستجو کنید" isSideBar value={string}
                               onChange={handleChangeString} onSubmit={() => onSubmitString(string)}/>
                    <SideFilter label="برند ها">
                        <CheckBox label="Nintendo" onChanged={onCheckboxChange}/>
                        <CheckBox label="Microsoft" onChanged={onCheckboxChange}/>
                        <CheckBox label="Sony" onChanged={onCheckboxChange}/>
                        <CheckBox label="CD Projekt" onChanged={onCheckboxChange}/>
                    </SideFilter>
                    <SideFilter label="موجودی">
                        <RadioBox label="همه" onChange={onRadioChange} selectedValue={radioValue} value={"0"}/>
                        <RadioBox label="موجود" onChange={onRadioChange} selectedValue={radioValue} value={"1"}/>
                    </SideFilter>
                    <SideFilter label="محدوده قیمت" overFlowVisible>
                        <div style={{padding: 20}}>
                            <Slider step={100000} min={0} max={maxPrice} valueLabelDisplay="auto" marks value={range}
                                    onChange={handleRange} onChangeCommitted={handlePriceChange}/>
                        </div>
                    </SideFilter>
                </div>
            </div>
        </>
    );
}

export default Products;
