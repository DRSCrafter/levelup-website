import '../Styles/Components/products.scss';
import React, {useEffect, useState} from "react";
import lodash from 'lodash';

import SideFilter from "../Components/sideFilter";
import SearchBar from "../Components/searchBar";
import CheckBox from "./checkBox.js";
import RadioBox from "../Components/radioBox";
import RadioButton from "../Components/radioButton";
import ProductCard from "./productCard.js";

import {Fab, Pagination, Slider, useMediaQuery} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterDialog from "./Dialogs/filterDialog.js";
import NotFound from "../layout/notFound";
import sortChoices from "../Data/sortChoices";
import ProductsProps from "../types/components/products";
import Product from "../types/context/product";

function Products({
                      items,
                      onCheckboxChange,
                      radioValue,
                      onRadioChange,
                      filterValue,
                      onFilterChange,
                      maxPrice,
                      onSubmitString,
                      companies
                  }: ProductsProps) {

    const [string, setString] = useState('');

    const handleChangeString = (event: React.ChangeEvent<HTMLInputElement>) => setString(event.target.value);

    const isPC = useMediaQuery('(min-width: 1024px)');

    const [range, setRange] = useState(-1);
    const [price, setPrice] = useState(maxPrice);

    const handleRange = (event: Event) => setRange(+(event.target as any)!.value);

    const handlePriceChange = (event: any, newValue: any) => setPrice(newValue);

    const [page, setPage] = React.useState(1);
    const handleTogglePage = (event: any, value: any) => setPage(value);

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [page]);

    const handlePagination = (items: Product[], pageNumber: number) => {
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

    const handleAvailableFirst = (list: Product[]) => {
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
            <div className="products">
                <div className="products__list">
                    <div className="products__filter__root">
                        <div className="products__filter">
                            <span className="products__filter__title">مرتب سازی بر اساس:</span>
                            {sortChoices.map(choice => (
                                <RadioButton value={choice.value} selectedValue={filterValue} onSelect={onFilterChange}>
                                    {choice.label}
                                </RadioButton>
                            ))}
                        </div>
                    </div>
                    {paginatedItems ?
                        <>
                            <div className="products__grid">
                                {
                                    paginatedItems.map(item => (
                                        <div className="products__grid__item" key={item._id}>
                                            <ProductCard info={item} shadow/>
                                        </div>
                                    ))
                                }
                            </div>
                            {Math.ceil(sortedItems.length / 12) > 1 ?
                                <div className="products__pagination">
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
                <div className={`products__side ${!visible ? 'side--up' : ''}`}>
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
                    style={styles.fab as React.CSSProperties}
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

const styles = {
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px'
    }
}

export default Products;
