import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FeatureCategories from './FeatureCategories';
import FeatureBook from './FeatureBook';
import { Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Loading from '../../Shared/Loading';

const FeaturedCategories = () => {
    const [featuredBooks, setFeaturedBooks] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/books`).then(res=> {setFeaturedBooks(res.data)
            setLoading(false)})
    },[])

    const categories = [...new Set(featuredBooks.map(book => book.book_category))]

    const filteredBooks = selectedCategory ?  selectedCategory!=="All"?  featuredBooks.filter(book => book.book_category === selectedCategory)
    : featuredBooks
    : featuredBooks

    if(loading) return <Loading />
    return (
        <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 py-10 text-textDark"
    >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-primary">
        <Sparkles className="text-secondary" /> Featured Category
      </h2>
            <div className="container mx-auto p-4 place-items-center my-8 space-y-3">
                <FeatureCategories categories={categories} onSelectCategory={setSelectedCategory} />
                {filteredBooks.length ? <FeatureBook filteredBooks={filteredBooks} /> : 
                <div className='py-3'>
                    <p className='text-red-500 font-bold text-2xl text-center'>No Books Found in this Category.</p>
                </div>
                }
            </div>
        </motion.div>
         
    );
};

export default FeaturedCategories;