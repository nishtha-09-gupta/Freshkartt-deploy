import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { UploadCloud } from 'lucide-react';

const AddProduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');

    const { axios } = useAppContext();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            files.forEach(file => formData.append('images', file));

            const { data } = await axios.post('/api/product/add', formData);

            if (data.success) {
                toast.success(data.message);
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex-1 h-[95vh] overflow-y-scroll no-scrollbar flex flex-col justify-start bg-bg p-6 md:p-10">
            <form onSubmit={onSubmitHandler} className="max-w-lg mx-auto space-y-6 bg-card p-6 rounded-2xl shadow-md">
                
                <div>
                    <p className="text-base font-medium text-text-dark">Product Images</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                                <input
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                    onChange={(e) => {
                                        const updatedFiles = [...files];
                                        updatedFiles[index] = e.target.files[0];
                                        setFiles(updatedFiles);
                                    }}
                                />
                                <div className="w-24 h-24 border-2 border-gray-soft rounded-xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
                                    {files[index] ? (
                                        <img
                                            src={URL.createObjectURL(files[index])}
                                            alt="uploadPreview"
                                            className="object-cover w-full h-full rounded-xl"
                                        />
                                    ) : (
                                        <UploadCloud className="text-gray-400 w-6 h-6" />
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

             
                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium text-text-dark" htmlFor="product-name">Product Name</label>
                    <input
                        type="text"
                        id="product-name"
                        placeholder="Type here"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none py-2.5 px-3 rounded-xl border border-gray-soft focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

              
                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium text-text-dark" htmlFor="product-description">Product Description</label>
                    <textarea
                        id="product-description"
                        rows={4}
                        placeholder="Type here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="outline-none py-2.5 px-3 rounded-xl border border-gray-soft resize-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                
                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium text-text-dark" htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none py-2.5 px-3 rounded-xl border border-gray-soft focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>

               
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 min-w-[120px]">
                        <label className="text-base font-medium text-text-dark" htmlFor="product-price">Product Price</label>
                        <input
                            type="number"
                            id="product-price"
                            placeholder="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="outline-none py-2.5 px-3 rounded-xl border border-gray-soft focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 min-w-[120px]">
                        <label className="text-base font-medium text-text-dark" htmlFor="offer-price">Offer Price</label>
                        <input
                            type="number"
                            id="offer-price"
                            placeholder="0"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            className="outline-none py-2.5 px-3 rounded-xl border border-gray-soft focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                </div>

                
                <button
                    type="submit"
                    className="w-full py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-2xl transition"
                >
                    ADD PRODUCT
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
