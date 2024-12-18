import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Youtube } from 'lucide-react';
import styles from './Mealinfo.module.css';

function MealInfo() {
  const { mealId } = useParams();
  const [info, setInfo] = useState(null);

  const getMealInfo = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const jsonData = await response.json();
    
    if (jsonData.meals) {
      setInfo(jsonData.meals[0]);
    }
  };

  useEffect(() => {
    getMealInfo();
  }, [mealId]);

  return (
    <div className={styles.container}>
      {info ? (
        <div className={styles.content}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.imageContainer}>
              <img 
                src={info.strMealThumb} 
                alt={info.strMeal}
                className={styles.image}
              />
            </div>
            <div className={styles.imageOverlay} />
            <h1 className={styles.title}>
              {info.strMeal}
            </h1>
          </div>

          {/* Content Section */}
          <div className={styles.details}>
            {/* YouTube Link */}
            <a
              href={info.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.youtubeButton}
            >
              <Youtube className={styles.youtubeIcon} />
              Watch on YouTube
            </a>

            {/* Instructions */}
            <div className={styles.instructions}>
              <h2 className={styles.instructionsTitle}>Instructions</h2>
              {info.strInstructions.split('\n').map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Navigation */}
            <div className={styles.navigation}>
              <Link to="/" className={styles.backLink}>
                ← Back to all meals
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <div className={styles.loadingText}>Loading meal information...</div>
        </div>
      )}
    </div>
  );
}

export default MealInfo;