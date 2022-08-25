import React, {useEffect, useRef, useState} from "react";
import Products from "../Components/products";
import Footer from "../Components/Footer";
import httpConnection from "../Utils/httpConnection";
import {useParams} from "react-router-dom";
import ContentContainer from "../Components/ContentContainer";

function ProductsPage() {
    const [string, setString] = useState("");
    const [companies, setCompanies] = useState([]);
    const [isAvailable, setIsAvailable] = useState('');

    const [selectedSort, setSelectedSort] = React.useState('');
    const [items, setItems] = useState([]);

    const {category} = useParams();

    const getData = async () => {
        const reqBody = JSON.stringify({
            name: string,
            companies: companies,
            isAvailable: isAvailable,
            type: category
        });
        const resBody = await httpConnection.put('http://localhost:3001/api/products/filter/', reqBody, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
        return resBody.data;
    };

    const prices = useRef(0);
    const maxPrice = useRef(0);

    useEffect(() => {
        getData().then(res => {
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
