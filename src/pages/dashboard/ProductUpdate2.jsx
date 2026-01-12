import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { URL_PRODUCTS } from '../../utils/Endpoint';

const UpdateProduct = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`${URL_PRODUCTS}/${id}`)
      .then((res) => {
        const product = res.data;
        form.setFieldsValue({
          name: product?.name ?? "",
          price: product?.price ?? "",
        });

        if (product?.thumbnail) {
          setFileList([
            {
              uid: '-1',
              name: 'thumbnail.jpg',
              status: 'done',
              url: product.thumbnail,
            },
          ]);
        } else {
          setFileList([]);
        }
      })
      .catch((err) => {
        console.log(err?.response || err);
        message.error('Gagal mengambil detail produk');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, form]);

  const handleSubmit = async (values) => {
    if (!id) {
      message.error('ID produk tidak ditemukan');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('name', values.name);
    data.append('price', values.price);

    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      data.append('thumbnail', fileList[0].originFileObj);
    }

    try {
      await axios.patch(`${URL_PRODUCTS}/${id}`, data);
      message.success('Produk berhasil diupdate');
      form.resetFields();
      setFileList([]);
      navigate('/dashboard/products');
    } catch (error) {
      console.log(error?.response || error);
      message.error('Gagal update produk');
    } finally {
      setLoading(false);
    }
  };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div className="flex-shrink-0 px-4 py-3 sm:px-6">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Edit Produk</h1>
        </div>
  
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <Form
                form={form}
                layout='vertical'
                onFinish={handleSubmit}
                size="middle"
            >
                <Form.Item
                    name='name'
                    label='Nama Produk'
                    rules={[{ required: true, message: 'Masukkan nama produk!' }]}>
                    <Input placeholder='Masukkan nama produk' />
                </Form.Item>

                <Form.Item
                    name='price'
                    label='Harga'
                    rules={[{ required: true, message: 'Masukkan harga produk!' }]}>
                    <Input type='number' min="0" placeholder='Masukkan harga produk' prefix="Rp" />
                </Form.Item>

                <Form.Item
                    name='thumbnail'
                    label='Thumbnail'
                    valuePropName='fileList'
                    getValueFromEvent={({ fileList }) => fileList}
                >
                  <Upload
                      beforeUpload={() => false}
                      listType='picture'
                      fileList={fileList}
                      onChange={handleChange}
                      maxCount={1}>
                      <Button icon={<UploadOutlined />}>Ganti Thumbnail</Button>
                  </Upload>
                </Form.Item>

                <Form.Item className="mb-0 pt-2 lg:w-32">
                    <Button type='primary' htmlType='submit' loading={loading} block>
                        Update Produk
                    </Button>
                </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
};

export default UpdateProduct;


// ============================= KODE ASLI DI BAWAH INI ==============================
// import React, { use, useEffect, useState } from 'react';
// import { Form, Input, Button, Upload, message, Select } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { URL_PRODUCTS } from '../../utils/Endpoint';
// import { useNavigate, useParams } from 'react-router-dom';

// const { Option } = Select;

// const UpdateProduct = () => {
//     const [form] = Form.useForm();
//     const [loading, setLoading] = useState(false);
//     const [fileList, setFileList] = useState([]);
//     const params = useParams();

//     const { id } = params;
//     const [product, setProduct] = useState(null);

//     useEffect(() => {
//         axios
//             .get(`${URL_PRODUCTS}/${id}`)
//             .then((res) => {
//                 console.log(res);
//                 setProduct(res.data);
//                 form.setFieldsValue({
//                     name: res.data.name,
//                     price: res.data.price,
//                 });

//                 // mengatur thumnail saat ini
//                 if (res.data.thumbnail) {
//                     setFileList([
//                         {
//                             uid: '-1',
//                             name: 'thumbnail.jpg',
//                             status: 'done',
//                             url: res.data.thumbnail,
//                         },
//                     ]);
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }, []);

//     const navigate = useNavigate();

//     // untuk menampilkan submit form
//     const handleSumbit = async (values) => {
//         setLoading(true);

//         console.log('values', values);
//         const data = new FormData();
//         data.append('name', values.name);
//         data.append('price', values.price);

//         // tambahkan data baru bila diunggah
//         if (
//             fileList.length > 0 &&
//             fileList[0].originFileObj // hanya ada jika user memilih file baru
//         ) {
//             data.append('thumbnail', fileList[0].originFileObj);
//         }

//         try {
//             await axios.patch(`${URL_PRODUCTS}/${id}`, data);
//             message.success('Product added successfully');
//             form.resetFields();
//             setFileList([]);
//             navigate('/dashboard/products');
//         } catch (error) {
//         message.error('Failed to added product');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // fungsi untuk mengatur perubahan file
//     const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

//     return (
//         <div>
//             <h1>Edit Product</h1>
//             <Form
//                 form={form}
//                 layout='vertical'
//                 onFinish={handleSumbit}
//                 initialValues={{
//                     category: 'electronics',
//                 }}>
//                 <Form.Item
//                     name='name'
//                     label='Product Name'
//                     rules={[{ required: true, message: 'Please input product name!' }]}>
//                     <Input placeholder='Enter product name' />
//                 </Form.Item>

//                 <Form.Item
//                     name='price'
//                     label='Price'
//                     rules={[{ required: true, message: 'Please input product price!' }]}>
//                     <Input type='number' placeholder='Enter product price' />
//                 </Form.Item>

//                 <Form.Item
//                     name='thumbnail'
//                     label='Thumbnail'
//                     valuePropName='fileList'
//                     getValueFromEvent={({ fileList }) => fileList}
//                     rules={[{ required: false, message: 'Please upload product thumbnail!' }]}>
//                         <p>
//                             Current:{ ' ' }
//                             {product?.thumbnail ? (
//                             <a href={product.thumbnail} target="_blank" rel="noopener noreferrer">{product.thumbnail}</a>                            
//                         ) : (
//                                 'No thumbnail uploaded'
//                             )}
//                         </p>
//                         <Upload
//                             beforeUpload={() => false}
//                             listType='picture'
//                             valuePropName='fileList'
//                             fileList={fileList}
//                             onChange={handleChange}
//                             rules={[{ required: false, }]}
//                             maxCount={1}>
//                                 <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
//                         </Upload>
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type='primary' htmlType='submit' loading={loading}>
//                             Edit Product
//                         </Button>
//                     </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default UpdateProduct;