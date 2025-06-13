import React from 'react';
import Banner from './Banner';
import PopularBooks from './PopularBooks';
import FeaturedCategoriesBooks from './FeaturedCategories/FeaturedCategoriesBooks';
import NewlyReleasedBooks from './NewlyReleasedBooks';
import QASection from './QASection';

const Home = () => {
    return (
        <div>
            <Banner />
            <PopularBooks />
            <FeaturedCategoriesBooks />
            <NewlyReleasedBooks />
            <QASection></QASection>
        </div>
    );
};

export default Home;