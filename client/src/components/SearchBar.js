// components/SearchBar.js
import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash'; // For debouncing
import PropTypes from 'prop-types'; // For prop type validation

const SearchBar = ({ placeholder = "Search...", onSearch, delay = 300 }) => {
    const [query, setQuery] = useState(''); // State to manage the search query

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((searchQuery) => {
            if (onSearch) {
                onSearch(searchQuery); // Trigger the onSearch callback
            }
        }, delay),
        [onSearch, delay] // Recreate debounced function if onSearch or delay changes
    );

    // Handle input change
    const handleInputChange = (e) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery); // Update the query state
        debouncedSearch(searchQuery); // Trigger debounced search
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
                className="search-input"
                aria-label="Search" // Accessibility improvement
            />
        </div>
    );
};

// Prop type validation
SearchBar.propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    delay: PropTypes.number,
};

export default SearchBar;