import React from 'react';
import Banner from './Banner';
import PopularBooks from './PopularBooks';
import FeaturedCategoriesBooks from './FeaturedCategories/FeaturedCategoriesBooks';
import NewlyReleasedBooks from './NewlyReleasedBooks';

const Home = () => {
    return (
        <div>
            <Banner />
            <PopularBooks />
            <FeaturedCategoriesBooks />
            <NewlyReleasedBooks />
        </div>
    );
};

export default Home;