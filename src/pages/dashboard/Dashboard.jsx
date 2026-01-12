import React from "react";

const Dashboard = () => {
    return (
    <div className="h-full flex flex-col bg-gray-50">
        <div className="flex-shrink-0 px-4 py-3 sm:px-6">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <div className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                        Selamat Datang!
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Di sini, kita dapat mengelola aplikasi Ecommerce dengan mudah
                    </p>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Dashboard;
