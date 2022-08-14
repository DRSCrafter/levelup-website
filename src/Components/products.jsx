import '../Styles/Components/products.css';
import React from "react";
import {Pagination} from "@mui/material";

import SideFilter from "../Components/sideFilter";
import SearchBar from "../Components/searchBar";
import CheckBox from "../Components/checkBox";
import RadioBox from "../Components/radioBox";
import RadioButton from "../Components/radioButton";
import ProductCard from "../Components/productCard";

function Products() {
    const [selectedValue, setSelectedValue] = React.useState('');
    const [selectedFilter, setSelectedFilter] = React.useState('');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleSelect = (value) => {
        setSelectedFilter(value);
    };

    const [page, setPage] = React.useState(1);
    const handleTogglePage = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <div className="products-root">
                <div className="products-items-container">
                    <div className="products-top-filter-root">
                        <div className="products-top-filter-container">
                            <span className="products-top-filter-title">مرتب سازی بر اساس:</span>
                            <RadioButton value={'جدیدترین'} selectedValue={selectedFilter}
                                         onSelect={handleSelect}>جدیدترین</RadioButton>
                            <RadioButton value={'محبوب ترین'} selectedValue={selectedFilter} onSelect={handleSelect}>محبوب
                                ترین</RadioButton>
                            <RadioButton value={'ارزان ترین'} selectedValue={selectedFilter} onSelect={handleSelect}>ارزان
                                ترین</RadioButton>
                            <RadioButton value={'گران ترین'} selectedValue={selectedFilter} onSelect={handleSelect}>گران
                                ترین</RadioButton>
                        </div>
                    </div>
                    <div className="products-grid">
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                        <div className="products-grid-item"><ProductCard shadow/></div>
                    </div>
                    <div className="products-pagination">
                        <Pagination count={10} page={page} onChange={handleTogglePage}/>
                    </div>
                </div>
                <div className="products-side-container">
                    <SearchBar placeholder="نام محصول را جستجو کنید" isSideBar/>
                    <SideFilter label="برند ها">
                        <CheckBox label="سونی"/>
                        <CheckBox label="سونی"/>
                        <CheckBox label="سونی"/>
                        <CheckBox label="سونی"/>
                        <CheckBox label="سونی"/>
                        <CheckBox label="سونی"/>
                        <CheckBox label="سونی"/>
                        <CheckBox label="سونی"/>
                        <CheckBox label="سونی"/>
                    </SideFilter>
                    <SideFilter label="موجودی">
                        <RadioBox label="همه" onChange={handleChange} selectedValue={selectedValue} value="1"/>
                        <RadioBox label="موجود" onChange={handleChange} selectedValue={selectedValue} value="2"/>
                    </SideFilter>
                </div>
            </div>
        </>
    );
}

export default Products;
