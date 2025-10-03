import React from "react";

const Dashboard = () => {
    return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Welcome Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Selamat Datang!
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Di sini, kita dapat mengelola aplikasi dengan Ecommerce mudah
                </p>
            </div>

        </div>
    </div>
    );
};

export default Dashboard;