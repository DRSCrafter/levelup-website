import React, {useEffect, useRef, useState} from "react";
import Products from "../Components/products";
import Footer from "../Components/Footer";
import {useParams} from "react-router-dom";
import ContentContainer from "../Components/ContentContainer";
import {getProducts} from "../Utils/productHandling";

function ProductsPage() {
    const [string, setString] = useState("");
    const [companies, setCompanies] = useState([]);
    const [isAvailable, setIsAvailable] = useState('');

    const [selectedSort, setSelectedSort] = React.useState('');
    const [items, setItems] = useState([]);

    const {category} = useParams();

    const prices = useRef(0);
    const maxPrice = useRef(0);

    useEffect(() => {
        getProducts(string, companies, isAvailable, category).then(res => {
            setItems(res);
            prices.current = res.map(item => item.price);
            maxPrice.current = res.length !== 0 ? Math.max.apply(Math, prices.current) : 0;
        });
    }, [string, companies, isAvailable])

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

    const [page, setPage] = React.useState(1);
    const handleTogglePage = (event, value) => {
        setPage(value);
    };

    const handleSubmitString = str => setString(str);

    return (
        <>
            <ContentContainer>
                <Products items={items} onCheckboxChange={handleCheckboxChange} pageValue={page}
                          onPageChange={handleTogglePage} radioValue={isAvailable} onRadioChange={handleChange}
                          filterValue={selectedSort} onFilterChange={handleSelect} onSubmitString={handleSubmitString}
                          maxPrice={maxPrice.current}/>
                <Footer/>
            </ContentContainer>
        </>
    );
}

export default ProductsPage;
