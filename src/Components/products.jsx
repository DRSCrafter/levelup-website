import '../Styles/Components/products.css';
import React, {useEffect, useState} from "react";

import {Buy, Like} from "../Utils/productHandling";
import SideFilter from "../Components/sideFilter";
import SearchBar from "../Components/searchBar";
import CheckBox from "../Components/checkBox";
import RadioBox from "../Components/radioBox";
import RadioButton from "../Components/radioButton";
import ProductCard from "../Components/productCard";

import {Fab, Pagination, Slider, useMediaQuery} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterDialog from "./filterDialog";
import NotFound from "./notFound";
import {handlePagination} from "../Utils/paginationHandling";

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

    const isPC = useMediaQuery('(min-width: 1024px)');

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

    const handleAvailableFirst = (list) => {
        const result = [];
        for (let item of list) {
            if (item.stock !== 0)
                result.push(item);
        }
        for (let item of list) {
            if (item.stock === 0)
                result.push(item);
        }
        return result;
    }

    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);

    const filteredItems = items.length !== 0 && range !== -1 ? items.filter(item => item.price <= price) : items;
    const sortedItems = handleAvailableFirst(filteredItems);
    const paginatedItems = handlePagination(sortedItems, pageValue, 12);

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
                    {paginatedItems && paginatedItems.length !== 0 ?
                        <>
                            <div className="products-grid">
                                {
                                    paginatedItems.map(item => (
                                        <div className="products-grid-item" key={item.name}>
                                            <ProductCard info={item} onBuy={Buy} onLike={Like} shadow/>
                                        </div>
                                    ))
                                }
                            </div>
                            {(paginatedItems / 12) >= 1 ?
                                <div className="products-pagination">
                                    <Pagination count={paginatedItems / 12} page={pageValue} onChange={onPageChange}/>
                                </div> : <></>}
                        </> :
                        <NotFound/>
                    }
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
            {!isPC ?
                <Fab color="primary" style={{position: 'fixed', bottom: '20px', right: '20px'}} aria-label="add"
                     onClick={handleOpenFilter}>
                    <FilterAltIcon/>
                </Fab> : <></>}
            <FilterDialog onClose={handleCloseFilter} open={openFilter} onSubmitString={onSubmitString}
                          onRadioChange={onRadioChange} radioValue={radioValue} onCheckboxChange={onCheckboxChange}
                          maxPrice={maxPrice} onPriceChange={handlePriceChange} onRangeChange={handleRange}
                          onStringChange={handleChangeString} range={range} string={string}/>
        </>
    );
}

export default Products;
