import React, { useMemo } from "react";
import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from "react-router-dom";

const AUTH_STORAGE_KEY = "auth";

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const selectedKey = useMemo(() => {
        const path = location.pathname;
        if (path.startsWith("/dashboard/products")) return "products";
        if (path.startsWith("/dashboard/addproduct")) return "addproduct";
        if (path.startsWith("/dashboard")) return "dashboard";
        return "dashboard";
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        navigate("/", { replace: true });
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            trigger={null}
            breakpoint="lg"
            collapsedWidth={0}
            width={220}
        >
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
                <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="products" icon={<SettingOutlined />}>
                    <Link to="/dashboard/products">Products</Link>
                </Menu.Item>
                <Menu.Item key="addproduct" icon={<SettingOutlined />}>
                    <Link to="/dashboard/addproduct">Add Product</Link>
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
        </Sider>
    );
} 

export default Sidebar;
