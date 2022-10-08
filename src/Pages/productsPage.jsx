import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";

import Products from "../Components/products";
import Footer from "../layout/footer";
import ContentContainer from "../layout/contentContainer";
import {getProducts} from "../Utils/productHandling";
import httpConnection from "../Utils/httpConnection";
import {useLoadingContext} from "react-router-loading";

const {apiEndpoint} = require('../config/config.json');

function ProductsPage() {
    const [searchStr, setSearchStr] = useState("");
    const [companies, setCompanies] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [radio, setRadio] = useState('0');

    const [selectedSort, setSelectedSort] = React.useState('name');
    const [items, setItems] = useState([]);

    const {category} = useParams();

    const loadingContext = useLoadingContext();

    const prices = useRef(0);
    const maxPrice = useRef(0);

    useEffect(() => {
        getProducts(searchStr, companies, radio, category, selectedSort).then(res => {
            setItems(res);
            prices.current = res.map(item => item.price);
            maxPrice.current = res.length !== 0 ? Math.max.apply(Math, prices.current) : 0;
            loadingContext.done();
        });
    }, [searchStr, companies, radio, selectedSort, category])

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

    const handleChangeRadio = (e) => {
        setRadio(e.target.value);
    };

    const handleSelect = (value) => {
        setSelectedSort(value);
    };

    const handleSubmitString = str => setSearchStr(str);

    return (
        <>
            <ContentContainer>
                <Products items={items} onCheckboxChange={handleCheckboxChange} radioValue={radio}
                          onRadioChange={handleChangeRadio}
                          filterValue={selectedSort} onFilterChange={handleSelect} onSubmitString={handleSubmitString}
                          maxPrice={maxPrice.current} companies={companyList}/>
                <Footer/>
            </ContentContainer>
        </>
    );
}

export default ProductsPage;
