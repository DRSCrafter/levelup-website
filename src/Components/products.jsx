import '../Styles/Components/products.css';
import React, {useEffect, useState} from "react";
import lodash from 'lodash';

import SideFilter from "../Components/sideFilter";
import SearchBar from "../Components/searchBar";
import CheckBox from "../Components/checkBox";
import RadioBox from "../Components/radioBox";
import RadioButton from "../Components/radioButton";
import ProductCard from "../Components/productCard";

import {Fab, Pagination, Slider, useMediaQuery} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterDialog from "./Dialogs/filterDialog";
import NotFound from "../layout/notFound";
import sortChoices from "../Data/sortChoices";

function Products(props) {
    const {
        items,
        onCheckboxChange,
        radioValue,
        onRadioChange,
        filterValue,
        onFilterChange,
        maxPrice,
        onSubmitString,
        companies
    } = props;

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

    const [page, setPage] = React.useState(1);
    const handleTogglePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [page]);

    const handlePagination = (items, pageNumber) => {
        const startIndex = (pageNumber - 1) * 12;
        return lodash(items).slice(startIndex).take(12).value();
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
    const paginatedItems = handlePagination(sortedItems, page);

    return (
        <>
            <div className="products-root">
                <div className="products-items-container">
                    <div className="products-top-filter-root">
                        <div className="products-top-filter-container">
                            <span className="products-top-filter-title">مرتب سازی بر اساس:</span>
                            {sortChoices.map(choice => (
                                <RadioButton value={choice.value} selectedValue={filterValue} onSelect={onFilterChange}>
                                    {choice.label}
                                </RadioButton>
                            ))}
                        </div>
                    </div>
                    {paginatedItems ?
                        <>
                            <div className="products-grid">
                                {
                                    paginatedItems.map(item => (
                                        <div className="products-grid-item" key={item._id}>
                                            <ProductCard info={item} shadow/>
                                        </div>
                                    ))
                                }
                            </div>
                            {Math.ceil(sortedItems.length / 12) > 1 ?
                                <div className="products-pagination">
                                    <Pagination
                                        count={Math.ceil(sortedItems.length / 12)}
                                        page={page}
                                        onChange={handleTogglePage}
                                    />
                                </div>
                                :
                                <></>
                            }
                        </> :
                        <NotFound/>
                    }
                </div>
                <div className={`products-side-container ${!visible ? 'side-up' : ''}`}>
                    <SearchBar
                        placeholder="نام محصول را جستجو کنید"
                        isSideBar
                        value={string}
                        onChange={handleChangeString}
                        onSubmit={() => onSubmitString(string)}
                    />
                    <SideFilter label="برند ها">
                        {companies.map(company => (
                            <CheckBox label={company} onChanged={onCheckboxChange}/>
                        ))}
                    </SideFilter>
                    <SideFilter label="موجودی">
                        <RadioBox label="همه" onChange={onRadioChange} selectedValue={radioValue} value={"0"}/>
                        <RadioBox label="موجود" onChange={onRadioChange} selectedValue={radioValue} value={"1"}/>
                    </SideFilter>
                    <SideFilter label="محدوده قیمت" overFlowVisible>
                        <div style={{padding: 20}}>
                            <Slider
                                step={100000}
                                min={0}
                                max={maxPrice}
                                valueLabelDisplay="auto"
                                value={range}
                                onChange={handleRange}
                                onChangeCommitted={handlePriceChange}
                            />
                        </div>
                    </SideFilter>
                </div>
            </div>
            {!isPC ?
                <Fab
                    color="primary"
                    style={{position: 'fixed', bottom: '20px', right: '20px'}}
                    aria-label="add"
                    onClick={handleOpenFilter}
                >
                    <FilterAltIcon/>
                </Fab> : <></>}
            <FilterDialog onClose={handleCloseFilter} open={openFilter} onSubmitString={onSubmitString}
                          onRadioChange={onRadioChange} radioValue={radioValue} onCheckboxChange={onCheckboxChange}
                          maxPrice={maxPrice} onPriceChange={handlePriceChange} onRangeChange={handleRange}
                          onStringChange={handleChangeString} range={range} string={string}
            />
        </>
    );
}

export default Products;
