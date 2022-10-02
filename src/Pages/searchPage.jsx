import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import {useLocation} from "react-router-dom";

import ContentContainer from "../Components/ContentContainer";
import ProductCard from "../Components/productCard";
import httpConnection from "../Utils/httpConnection";

import {Pagination} from "@mui/material";
import NotFound from "../Components/notFound";
import lodash from "lodash";

const {apiEndpoint} = require('../config/config.json');

function SearchPage() {
    const [products, setProducts] = useState([]);

    const location = useLocation();
    const {str} = queryString.parse(location.search);

    const [page, setPage] = React.useState(1);
    const handleTogglePage = (event, value) => {
        setPage(value);
    };

    const handlePagination = (items, pageNumber) => {
        const startIndex = (pageNumber - 1) * 12;
        return lodash(items).slice(startIndex).take(12).value();
    }

    const handleGetData = async () => {
        const response = await httpConnection.get(`${apiEndpoint}/api/products/search/${str}`);
        setProducts(response.data);
    }

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

    useEffect(() => {
        handleGetData();
        setProducts(products);
    }, [])

    const sortedItems = products && handleAvailableFirst(products);
    const paginatedItems = handlePagination(sortedItems, page);

    return (
        <>
            <ContentContainer>
                <div className="products-items-container">
                    {products.length !== 0 ?
                        <>
                            <div className="products-grid">
                                {paginatedItems && paginatedItems.map(item => (
                                    <div className="products-grid-item" key={item.name}>
                                        <ProductCard info={item} shadow/>
                                    </div>
                                ))}
                            </div>
                            {paginatedItems && (paginatedItems / 12) >= 1 ?
                                <div className="products-pagination">
                                    <Pagination count={paginatedItems / 12} page={page} onChange={handleTogglePage}/>
                                </div> : <></>}
                        </> :
                        <>
                            <NotFound/>
                        </>
                    }
                </div>
            </ContentContainer>
        </>
    );
}

export default SearchPage;