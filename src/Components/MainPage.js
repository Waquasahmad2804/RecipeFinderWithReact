import React, { useState } from "react";
import MealCards from './MealCards';
import styles from './MainPage.module.css';

function MainPage() {
    const [data, setData] = useState();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchApi = async () => {
        if (!search.trim()) return;
        
        setLoading(true);
        try {
            const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
            const jsonData = await get.json();
            setData(jsonData.meals);
        } catch (error) {
            console.error('Error fetching meals:', error);
        } finally {
            setLoading(false);
        }
    };

    const inputHandler = (e) => {
        setSearch(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchApi();
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.searchSection}>
                <h1 className={styles.title}>Discover Delicious Recipes</h1>
                <p className={styles.subtitle}>Search from thousands of tasty meals</p>
                
                <div className={styles.searchBar}>
                    <input 
                        type="text"
                        placeholder="Search for a dish..."
                        onChange={inputHandler}
                        onKeyPress={handleKeyPress}
                        value={search}
                        className={styles.searchInput}
                    />
                    <button 
                        onClick={fetchApi}
                        className={styles.searchButton}
                        disabled={loading}
                    >
                        {loading ? (
                            'Searching...'
                        ) : (
                            <>
                                <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}></i>
                                Search
                            </>
                        )}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>Searching for delicious meals...</div>
            ) : data === null ? (
                <div className={styles.noResults}>No meals found. Try another search!</div>
            ) : (
                <MealCards detail={data} />
            )}
        </div>
    );
}

export default MainPage;