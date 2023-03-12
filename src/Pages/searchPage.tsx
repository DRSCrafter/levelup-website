import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import {useLocation} from "react-router-dom";

import ContentContainer from "../layout/contentContainer.js";
import ProductCard from "../Components/productCard.js";
import httpConnection from "../Utils/http";

import {Pagination} from "@mui/material";
import NotFound from "../layout/notFound.js";
import lodash from "lodash";
import Product from "../types/context/product";

function SearchPage() {
    const [products, setProducts] = useState([]);

    const location = useLocation();
    const {str} = queryString.parse(location.search);

    const [page, setPage] = React.useState(1);
    const handleTogglePage = (event: any, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [page]);

    const handlePagination = (items: Product[], pageNumber: number) => {
        const startIndex = (pageNumber - 1) * 12;
        return lodash(items).slice(startIndex).take(12).value();
    }

    const handleGetData = async () => (await httpConnection.get(`/products/search/${str}`)).data;

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

    useEffect(() => {
        handleGetData().then(res => setProducts(res));
    }, [str]);

    const sortedItems = products && handleAvailableFirst(products);
    const paginatedItems = handlePagination(sortedItems, page);

    return (
        <>
            <ContentContainer>
                <div className="products__list">
                    {products.length !== 0 ?
                        <>
                            <div className="products__grid">
                                {paginatedItems && paginatedItems.map(item => (
                                    <div className="products-grid-item" key={item._id}>
                                        <ProductCard info={item} shadow/>
                                    </div>
                                ))}
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