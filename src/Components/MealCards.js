import { NavLink } from "react-router-dom";
import styles from './MealCards.module.css';

function MealCards({ detail }) {
    return (
        <div className={styles.meals}>
            {detail?.map((currentItem) => (
                <div key={currentItem.idMeal} className={styles.card}>
                    <div className={styles.imageContainer}>
                        <img
                            src={currentItem.strMealThumb}
                            alt={currentItem.strMeal}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{currentItem.strMeal}</h2>
                        <NavLink
                            to={`/${currentItem.idMeal}`}
                            className={styles.button}
                        >
                            Recipe
                        </NavLink>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MealCards;