import React, { useState, useEffect } from "react";
import { ShoppingCartOutlined, DashboardOutlined } from "@ant-design/icons";
import { message } from "antd";
import axios from "axios";
import { URL_PRODUCTS } from "../utils/Endpoint";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let isActive = true;
        setLoading(true);

        axios
            .get(URL_PRODUCTS)
            .then((res) => {
                if (!isActive) return;
                const data = Array.isArray(res?.data) ? res.data : [];
                setProducts(data);
            })
            .catch((err) => {
                if (!isActive) return;
                console.error(err);
                message.error("Gagal mengambil data produk");
                setProducts([]);
            })
            .finally(() => {
                if (!isActive) return;
                setLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-gray-900 shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">
                            Commerce Store
                        </h1>
                        <div className="flex items-center gap-2">
                            <button 
                                className="sm:hidden inline-flex items-center p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                                aria-label="Dashboard"
                                onClick={() => navigate('/dashboard')}
                            >
                                <DashboardOutlined />
                            </button>

                            <button
                                className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200" 
                                onClick={() => navigate('/dashboard')}
                            >
                                <DashboardOutlined className="mr-2" />
                                Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}        
            <div className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Produk Terbaru
                        </h2>
                        <p className="text-gray-600">
                            Temukan produk berkualitas dengan harga terbaik
                        </p>
                    </div>

                    {!loading && products.length === 0 ? ( 
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 mb-6 opacity-50">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" 
                                    alt="No Product" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Tidak ada produk yang tersedia
                            </h3>
                            <p className="text-gray-600 text-center max-w-md">
                                Silakan kembali lagi nanti atau hubungi admin untuk info lebih lanjut.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                    <div className="overflow-hidden">
                                        <img 
                                            src={product.thumbnail} 
                                            alt={product.name}
                                            className="w-full h-56 sm:h-56 md:h-56 object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    
                                    <div className="p-4">
                                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-lg sm:text-2xl font-bold text-blue-600">
                                                Rp {product.price?.toLocaleString('id-ID') || '0'}
                                            </span>
                                        </div>

                                        <button 
                                            onClick={() => navigate(`/checkout/${product._id}`)}
                                            className="w-full inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2
                                            bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                                        >
                                            <ShoppingCartOutlined className="mr-2" />
                                            <span className="truncate">Checkout Sekarang</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400 text-xs sm:text-sm">
                        © 2025 EduCommerce Store. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;




// ******************************KODE ASLI******************************
// import React, { useState, useEffect } from "react";
// import { message } from "antd";
// import { ShoppingCartOutlined, DashboardOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { URL_PRODUCTS } from "../utils/Endpoint";
// import { Link } from "react-router-dom";

// const Home = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         axios
//             .get(URL_PRODUCTS)
//             .then((res) => {
//                 console.log("res", res.data);
//                 setProducts(res.data);
//             })
//             .catch((err) => {
//                 console.log(err)
//                 message.error("Gagal mengambil data produk");
//             })
//     }, [])

//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col">
//             {/* Header */}
//             <div className="bg-gray-900 shadow-sm border-b">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center py-4">
//                         <h1 className="text-3xl font-bold text-white">
//                             Commerce Store
//                         </h1>
//                         <Link 
//                             to="/dashboard" 
//                             className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
//                         >
//                             <DashboardOutlined className="mr-2" />
//                             Dashboard
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-grow">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                     <div className="mb-8">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                             Produk Terbaru
//                         </h2>
//                         <p className="text-gray-600">
//                             Temukan produk berkualitas dengan harga terbaik
//                         </p>
//                     </div>

//                     {products.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center py-20">
//                             <div className="w-32 h-32 mb-6 opacity-50">
//                                 <img 
//                                     src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" 
//                                     alt="No Product" 
//                                     className="w-full h-full object-contain"
//                                 />
//                             </div>
//                             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                                 Tidak ada produk yang tersedia
//                             </h3>
//                             <p className="text-gray-600 text-center max-w-md">
//                                 Silakan kembali lagi nanti atau hubungi admin untuk info lebih lanjut.
//                             </p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                             {products.map((product) => (
//                                 <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//                                     <div className="aspect-w-16 aspect-h-12 overflow-hidden">
//                                         <img 
//                                             src={product.thumbnail} 
//                                             alt={product.name}
//                                             className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
//                                         />
//                                     </div>
                                    
//                                     <div className="p-4">
//                                         <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
//                                             {product.name}
//                                         </h3>
                                        
//                                         <div className="flex items-center justify-between mb-4">
//                                             <span className="text-2xl font-bold text-blue-600">
//                                                 Rp {product.price?.toLocaleString('id-ID') || '0'}
//                                             </span>
//                                         </div>

//                                         <Link 
//                                             to={`/checkout/${product._id}`}
//                                             className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
//                                         >
//                                             <ShoppingCartOutlined className="mr-2" />
//                                             Checkout Sekarang
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Footer */}
//             <footer className="bg-gray-900 text-white py-6 mt-auto">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//                     <p className="text-gray-400 text-sm">
//                         © 2025 EduCommerce Store. All rights reserved.
//                     </p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default Home;