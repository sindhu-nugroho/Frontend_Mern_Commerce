import React from "react";

const Dashboard = () => {
    return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800">Dashboard Admin</h1>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Selamat Datang!
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Di sini, kita dapat mengelola aplikasi Ecommerce dengan mudah
                </p>
            </div>
        </div>
    </div>
    );
};

export default Dashboard;
