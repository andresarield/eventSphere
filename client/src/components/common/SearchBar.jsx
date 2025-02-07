import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import '../../assets/styles/SearchBar.css';

const SearchBar = ({ placeholder = "Search...", onSearch, delay = 300, loading = false }) => { // Componente de barra de búsqueda.
    const [query, setQuery] = useState(''); // Estado del pedido de búsqueda.

    const debouncedSearch = useCallback( // Función de búsqueda con retraso.
        debounce((searchQuery) => { // Utiliza la función de debounce de Lodash.
            if (onSearch) { // Verifica si la función de búsqueda está definida.
                onSearch(searchQuery); // Activa el callback onSearch con la consulta de búsqueda.
            }
        }, delay),
        [onSearch, delay]
    );

    const handleInputChange = (e) => { // Maneja el cambio en el campo de búsqueda.
        const searchQuery = e.target.value.trim(); // Obtiene el valor del campo de búsqueda.
        setQuery(searchQuery); // Actualiza el estado del pedido.
        if (searcQuery) {
            debouncedSearch(searchQuery); // Sólo se activa la búsqueda si el pedido de búsqueda no está vacío.
        } else {
            onSearch(''); // Opcionalmente podés activar una búsqueda vacía.
        }
    };

    // Limpia el campo de búsqueda.
    const clearInput = () => {
        setQuery(''); // Borra el estado de la búsqueda
        onSearch(''); // Opcionalmente podés activar una búsqueda vacía.
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
                className="search-input"
                aria-label="Search"
                disabled={loading} // Deshabilita el campo de búsqueda si está cargando.
            />
            {query && (
                <button onClick={clearInput} className="clear-button" aria-label="Clear search">
                    ×
                </button>
            )}
            {loading && <span className="loading-indicator">Loading...</span>}
        </div>
    );
};

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    delay: PropTypes.number,
};

export default SearchBar;