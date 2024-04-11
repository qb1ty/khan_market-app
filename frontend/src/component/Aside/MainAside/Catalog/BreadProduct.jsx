import React, { useState, useEffect } from "react";
import { useAlert } from "../../../../examples/Alert/AlertComponent";
import axios from "axios";
import Exp from "../../Assistant/search";
import ProductDOM from "./ProdcutsDOM/ProductDOM";
import ModalDescriptionWindow, { modalDescriptionWindow } from "../../Assistant/Registration/Modal/ModalDescription";


export default function Bread() {
    const [products, setProducts] = useState([])
    const search = useAlert()
    const url = 'http://192.168.41.246:8000/catalog/category/flour/product/?format=json'

    useEffect(() => {
        Exp(search.searchItem, setProducts, url)
    }, [search.searchItem])

    const appendProductBasket = (event) => {
        const id = +event.target.dataset.id
        const btn = event.target.dataset.btn
        const commodity = products.find(product => product.id === id)
        if (btn === "add_basket") {
            axios
                .post(`http://192.168.203.246:8000/cart/add/`, {
                    "user": JSON.parse(localStorage.getItem("username_json")),
                    "product": commodity.slug,
                    "quantity": 1
                })
                .then(response => {
                    console.log(response.data)
                })
        }
    }

    return (
        <>
            <div>
                <div className="products_list_main_block">
                    <div className="produts_list_block">
                        <ProductDOM products={products} appendProductBasket={appendProductBasket} modalDescriptionWindow={modalDescriptionWindow}/>
                    </div>
                </div>
            </div>
            <ModalDescriptionWindow />
        </>
    )
}