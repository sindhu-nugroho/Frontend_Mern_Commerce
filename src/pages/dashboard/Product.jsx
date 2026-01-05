import React, { useState } from "react";
import { Table, Button, Image, Popconfirm, message } from "antd";

const INITIAL_PRODUCTS = [
  {
      _id: "1",
      name: "Barbatos Lupus Rex 1/100 Model Kit",
      price: 1500000,
      thumbnail: "https://tamashiiweb.com/images/item/item_0000014284_Ti1gOkD5_05.jpg"
  },
  {
      _id: "2",
      name: "Semen Gresik 50kg",
      price: 250000,
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm-XS_koiBivYQ8kcU7w7MThMnQvINvtml3g&s"
  },
  {
      _id: "3",
      name: "HSR Velg",
      price: 300000,
      thumbnail: "https://hsrwheel.com/lama/wp-content/uploads/2022/04/HSR-RAI-S2.webp"
  },
  {
      _id: "4",
      name: "Mili Mini Album Hue",
      price: 180000,
      thumbnail: "https://images.squarespace-cdn.com/content/v1/52143a7ae4b0f9bd8308dc73/1490880415032-XLH2RGJBN0JO8ZA411FS/image-asset.png?format=1500w"
  }
];

const Product = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [loading] = useState(false);

  const handleAdd = () => {
    message.info("Tombol ini nantinya akan digunakan untuk menambahkan sebuah produk baru");
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
    message.success("Produk berhasil dihapus! (dummy)");
  };

  const handleUpdate = (record) => {
    message.info(`Fitur update dummy untuk: ${record.name}`);
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      width: 100,
      responsive: ["md"],
      render: (_, record) => (
        <Image
          src={record.thumbnail}
          width={60}
          height={45}
          style={{ objectFit: "cover", borderRadius: 4 }}
          loading="lazy"
          alt={record.name}
          preview={false}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      render: (t) => <span className="font-medium">{t}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (p) => <span className="text-blue-600 font-semibold
      whitespace-nowrap">Rp {p.toLocaleString("id-ID")}</span>,
    },
    {
      title: "Options",
      key: "options",
      width: 140,
      render: (_, record) => (
        <div className="flex gap-1 flex-wrap">
          <Button size="small" onClick={() => handleUpdate(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Hapus produk ini?"
            okText="Ya"
            cancelText="Batal"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger type="primary" size="small">
              Hapus
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex-shrink-0 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">List Product</h1>
          <Button type="primary" onClick={handleAdd} size="middle">
            + Tambah Produk
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        <div className="bg-white rounded-lg shadow-sm">
          <Table
            dataSource={products}
            columns={columns}
            rowKey="_id"
            loading={loading}
            pagination={{ pageSize: 5, size: "small" }}
            size="small"
            scroll={{ x: 400 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;



// *******************KODE ASLI*******************
// import React, { useEffect, useState } from "react";
// import { Table, Button, Image, Popconfirm, message } from "antd";
// import axios from "axios";
// import {URL_PRODUCTS} from "../../utils/Endpoint";
// import { data, Link } from "react-router-dom";
// import { use } from "react";

// const Product = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`${URL_PRODUCTS}/${id}`);
//             message.success('product deleted succesfully');
//             setProducts(products.filter((item) => item._id !== id));
//         } catch (err) {
//             message.error("Failed to delete product");
//         }
//     }

//     useEffect(() => {
//         setLoading(true);
//         axios
//             .get(URL_PRODUCTS)
//             .then((res) => {
//                 console.log("res", res.data);
//                 setProducts(res.data);
//                 setLoading(false);
//             })
//             .catch((err) => { 
//                 console.log(err.response);
//                 setLoading(false);
//             });
//     }, []);
    

//     const columns = [
//         {
//             title: 'Thumbnail',
//             dataIndex: 'thumbnail',
//             render: (_, record) => {
//                 console.log("recor", record);
//                 return <Image src={record?.thumbnail} width={100} loading='lazy' />
//             },
//         },
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//         },
//         {
//             title: 'Price',
//             dataIndex: 'price',
//             key: 'price',
//         },
//         {
//             title: 'Update',
//             key: 'update',
//             render: (_, record) => (
//                 <>
//                     <Button>
//                         <Link to={`/dashboard/products/${record?._id}`}>Update</Link>
//                     </Button>
//                 </>
//             ),
//         },
//         {
//             title: 'Delete',
//             key: 'delete',
//             render: (_, record) => (
//                 <Popconfirm
//                     title="Are you sure to delete this product"
//                     onConfirm={() => handleDelete(record._id)}
//                     okText='Yes'
//                     cancelText='No'
//                 >
//                     <Button danger type='primary'>Delete</Button>
//                 </Popconfirm>
//             )
//         }
//     ];

//     return (
//         <div>
//             <h1>List Product</h1>
//             <Table
//                 dataSource={products}    
//                 columns={columns}
//                 rowKey="_id"
//                 loading={loading}
//             />
//             <Link to='/dashboard/products/create'>
//                 <Button type='primary'>Tambah</Button>
//             </Link>
//         </div>
//     )
// }

// export default Product;