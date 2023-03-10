import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";

import Products from "../Components/products.js";
import Footer from "../layout/footer.js";
import ContentContainer from "../layout/contentContainer.js";
import {getProducts} from "../Utils/productHandling";
import httpConnection from "../Utils/http";
import {useLoadingContext} from "react-router-loading";
import Product from "../types/context/product";

function ProductsPage() {
    const [searchStr, setSearchStr] = useState("");
    const [companies, setCompanies] = useState<string[]>([]);
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
            prices.current = res.map((item: Product) => item.price);
            maxPrice.current = res.length !== 0 ? Math.max.apply(Math, (prices.current as unknown as number[])) : 0;
            loadingContext.done();
        });
    }, [searchStr, companies, radio, selectedSort, category])

    const handleGetCategories = async () => (await httpConnection.get(`/companies/${category}`)).data;
    useEffect(() => {
        handleGetCategories().then(res => setCompanyList(res));
    }, [category])

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newArray = [...companies, event.target.value];
        if (companies.includes(event.target.value))
            newArray = newArray.filter(day => day !== event.target.value);
        setCompanies(newArray);
    };

    const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadio(e.target.value);
    };

    const handleSelect = (value: string) => setSelectedSort(value);

    const handleSubmitString = (str: string) => setSearchStr(str);

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
