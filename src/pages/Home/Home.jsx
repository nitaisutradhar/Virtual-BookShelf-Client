import React from 'react';
import Banner from './Banner';
import PopularBooks from './PopularBooks';
import FeaturedCategoriesBooks from './FeaturedCategories/FeaturedCategoriesBooks';

const Home = () => {
    return (
        <div>
            <Banner />
            <PopularBooks />
            <FeaturedCategoriesBooks />
        </div>
    );
};

export default Home;