import React, { useEffect, useState } from "react";
import { Table, Button, Image } from "antd";
import axios from "axios";
import {URL_PRODUCTS} from "../../utils/Endpoint";
import { data, Link } from "react-router-dom";
import { use } from "react";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(URL_PRODUCTS)
            .then((res) => {
                console.log("res", res.data);
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => { 
                console.log(err.response);
                setLoading(false);
            });
    }, []);
    

    // kolom untuk tabel
    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            render: (_, record) => {
                console.log("recor", record);
                return <Image src={record?.thumbnail} width={100} loading='lazy' />
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button>
                        <Link to={`/dashboard/products/${record?._id}`}>Update</Link>
                    </Button>
                    <Button
                        type='primary'
                        danger
                        onClick={() => {
                            console.log('id', record?._id);
                            axios
                                .delete(`${URL_PRODUCT}/${record?._id}`)
                                .then((res) => {
                                    console.log(res);
                                    window.location.reload();
                                })
                                .catch((err) => console.log("err", err.response));
                        }}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h1>List Product</h1>
            <Link to='/dashboard/products/create'>
                <Button type='primary'>Tambah</Button>
            </Link>
        </div>
    )
}

export default Product;