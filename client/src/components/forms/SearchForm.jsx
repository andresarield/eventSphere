import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = {
            keyword,
            category,
            date: date || undefined,
            location,
        };
        onSearch(params);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search for events..."
                aria-label="Keyword"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category (e.g., music, sports)"
                aria-label="Category"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
                aria-label="Date"
            />
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                aria-label="Location"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;