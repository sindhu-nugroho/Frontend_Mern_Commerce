import React, { useEffect, useState } from "react";
import {
    Card,
    Button,
    Input,
    Form,
    Col,
    Row,
    Divider,
    Alert,
    message
} from "antd";
import { ShoppingCartOutlined, CreditCardOutlined } from "@ant-design/icons";
import axios from "axios";
import { URL_PRODUCTS, URL_TRANSACTIONS } from "../utils/Endpoint";
import { useParams } from "react-router-dom";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [successInfo, setSuccessInfo] = useState(null);
    const [product, setProduct] = useState(null);
    const [form] = Form.useForm();

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) {
            setProduct(null);
            return;
        }

        let isActive = true;
        setLoadingProduct(true);

        axios
            .get(`${URL_PRODUCTS}/${id}`)
            .then((res) => {
                if (!isActive) return;
                setProduct(res?.data || null);
            })
            .catch((err) => {
                if (!isActive) return;
                console.error(err);
                message.error("Gagal mengambil detail produk");
                setProduct(null);
            })
            .finally(() => {
                if (!isActive) return;
                setLoadingProduct(false);
            });

        return () => {
            isActive = false;
        };
    }, [id]);

    const handleCheckout = (values) => {
        if (!product?._id) {
            message.error("Produk tidak ditemukan");
            return;
        }

        setLoading(true);
        setSuccessInfo(null);

        const data = {
            first_name: values.first_name,
            amount: product.price,
            product_id: product._id,
        };

        axios
            .post(URL_TRANSACTIONS, data)
            .then((res) => {
                const redirectUrl = res?.data?.midtrans_url;
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                    return;
                }

                setSuccessInfo({
                    name: values.first_name,
                    product: product.name,
                    total: product.price,
                });
                form.resetFields();
            })
            .catch((err) => {
                console.error(err);
                const msg = err?.response?.data?.message || err?.message || "Checkout gagal";
                message.error(msg);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-xl sm:text-2xl font-semibold mb-4">Checkout</h1>

            {successInfo && (
                <div className="mb-4 sm:mb-6 px-0 sm:px-0">
                    <Alert
                        type="success"
                        message="Checkout berhasil"
                        description={
                            <>
                                <div>Nama: <strong>{successInfo.name}</strong></div>
                                <div>Produk: <strong>{successInfo.product}</strong></div>
                                <div>Total: <strong>Rp {successInfo.total.toLocaleString('id-ID')}</strong></div>
                            </>
                        }
                        showIcon
                    />
                </div>
            )}

            <Row gutter={[16, 16]}>
                <Col xs={24} md={16}>
                    <Card
                        title="Product Details"
                        style={{ width: "100%" }}
                        extra={<ShoppingCartOutlined />}>
                        <p><strong>Product Name:</strong> {loadingProduct ? "Loading..." : (product?.name || "-")}</p>
                        <p><strong>Price:</strong> Rp {(product?.price ?? 0).toLocaleString('id-ID')}</p>
                        <Divider />
                        <p><strong>Total Amount:</strong> Rp {(product?.price ?? 0).toLocaleString('id-ID')}</p>
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card
                        title="Shipping & Payment"
                        style={{ width: "100%" }}
                        extra={<CreditCardOutlined />}>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={handleCheckout}>
                            <Form.Item
                                name="first_name"
                                label="Your Name"
                                rules={[{ required: true, message: "Please enter your name" }]} >
                                <Input placeholder="Enter your name" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType='submit'
                                    block
                                    size="large"
                                    loading={loading}>
                                    Complete Checkout
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Checkout;

// ***********************************************KODE ASLI**********************************************************
// import React, { useEffect, useState } from "react";
// import {
//     Card, 
//     Button,
//     Input,
//     Form,
//     Col,
//     Row,
//     Divider,
//     Select,
// } from "antd";
// import {
//     ShoppingCartOutlined,
//     CreditCardOutlined,
// } from "@ant-design/icons";
// import axios from "axios";
// import { URL_PRODUCTS, URL_TRANSACTIONS } from "../utils/Endpoint";
// import { useNavigate, useParams, Link } from "react-router-dom";

// const { Option } = Select;

// const Checkout = () => {
//     const [loading, setLoading] = useState(false);
//     const [products, setProducts] = useState(null);
//     const [midtransUrl, setMidtransUrl] = useState("");
//     const [form] = Form.useForm();
//     const params = useParams();
//     const { id } = params;
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios
//             .get(`${URL_PRODUCTS}/${id}`)
//             .then((res) => {
//                 console.log("res", res.data);
//                 setProducts(res.data);
//                 setMidtransUrl(res.data.midtransUrl);
//             })
//             .catch((err) => {
//                 console.error("err", err.response);
//             });
//         }, []);

//         // Function to handle form submission
//         const handleCheckout = (values) => {
//             setLoading(true);
//             console.log("values", values);
//             console.log("midtransUrl", midtransUrl);

//             const data = {
//                 first_name: values.first_name,
//                 amount: products.price,
//             };
//             axios
//                 .post(URL_TRANSACTIONS, data)
//                 .then((res) => {
//                     console.log("res", res.data);
//                     if (res.data.midtrans_url) {
//                         window.location.href = res.data.midtrans_url;
//                     }
//                 })
//                 .catch((err) => {
//                     console.error("err", err.response);
//                 })
//         };

//         return (
//             <div style={{ padding: "20px" }}>
//                 <h1>Checkout</h1>
//                 <Row gutter={16}>
//                     {/* Card Produk */}
//                     <Col span={18}>
//                         <Card
//                             title="Product Details"
//                             variant={false}
//                             style={{ width: "100%" }}
//                             extra={<ShoppingCartOutlined />}>
//                             <p>
//                                 <strong>Product Name:</strong> {products?.name}
//                             </p>
//                             <p>
//                                 <strong>Price:</strong> ${products?.price}
//                             </p>
//                             <Divider />
//                             <p>
//                                 <strong>Total Amount:</strong> Rp {products?.price}
//                             </p>
//                         </Card>
//                     </Col>

//                     {/* Card Pembayaran */}
//                     <Col span={6}>
//                         <Card
//                             title="Shipping & Payment"
//                             variant={false}
//                             style={{ width: "100%" }}
//                             extra={<CreditCardOutlined />}>
//                                 <Form
//                                     form={form}
//                                     layout='vertical'
//                                     onFinish={handleCheckout}
//                                     initialValues={{
//                                         paymentMethod: "credit-card",
//                                     }}>
//                                         <Form.Item
//                                             name="first_name"
//                                             label="Your Name"
//                                             rules={[
//                                                 {
//                                                     required: true,
//                                                     message: "Please enter your name",
//                                                 },
//                                             ]}>
//                                             <Input placeholder="Enter your name" />
//                                         </Form.Item>
                                    
//                                         <Form.Item>
//                                             <Button
//                                                 type="primary"
//                                                 htmlType='submit'
//                                                 block
//                                                 loading={loading}>
//                                                 Complete Checkout
//                                             </Button>
//                                         </Form.Item>
//                                 </Form>
//                         </Card>
//                     </Col>
//                 </Row>
//             </div>
//         );
//     };

//     export default Checkout

