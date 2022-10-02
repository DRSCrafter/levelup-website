import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";

import Products from "../Components/products";
import Footer from "../Components/Footer";
import ContentContainer from "../Components/ContentContainer";
import {getProducts} from "../Utils/productHandling";
import httpConnection from "../Utils/httpConnection";

const {apiEndpoint} = require('../config/config.json');

function ProductsPage() {
    const [string, setString] = useState("");
    const [companies, setCompanies] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [isAvailable, setIsAvailable] = useState('0');

    const [selectedSort, setSelectedSort] = React.useState('name');
    const [items, setItems] = useState([]);

    const {category} = useParams();

    const prices = useRef(0);
    const maxPrice = useRef(0);

    useEffect(() => {
        getProducts(string, companies, isAvailable, category, selectedSort).then(res => {
            setItems(res);
            prices.current = res.map(item => item.price);
            maxPrice.current = res.length !== 0 ? Math.max.apply(Math, prices.current) : 0;
        });
    }, [string, companies, isAvailable, selectedSort, category])

    const handleGetCategories = async () => {
        const {data} = await httpConnection.get(`${apiEndpoint}/api/companies/${category}`);
        setCompanyList(data);
    }
    useEffect(() => {
        handleGetCategories();
    }, [category])

    const handleCheckboxChange = event => {
        let newArray = [...companies, event.target.value];
        if (companies.includes(event.target.value)) {
            newArray = newArray.filter(day => day !== event.target.value);
        }
        setCompanies(newArray);
    };

    const handleChange = (e) => {
        setIsAvailable(e.target.value);
    };

    const handleSelect = (value) => {
        setSelectedSort(value);
    };

    const handleSubmitString = str => setString(str);

    return (
        <>
            <ContentContainer>
                <Products items={items} onCheckboxChange={handleCheckboxChange} radioValue={isAvailable}
                          onRadioChange={handleChange}
                          filterValue={selectedSort} onFilterChange={handleSelect} onSubmitString={handleSubmitString}
                          maxPrice={maxPrice.current} companies={companyList}/>
                <Footer/>
            </ContentContainer>
        </>
    );
}

export default ProductsPage;
