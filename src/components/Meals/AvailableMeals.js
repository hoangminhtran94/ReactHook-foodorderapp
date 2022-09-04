import { useState, useEffect } from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItem";
import useHtpp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHtpp();

  const transformMeals = (mealsData) => {
    let meals = [];
    for (let key in mealsData) {
      meals.push({
        id: key,
        ...{ ...mealsData[key] },
      });
    }
    setMeals(meals);
  };

  useEffect(() => {
    fetchMeals(
      {
        url: "https://react-food-order-apps-default-rtdb.firebaseio.com/meals.json",
      },
      transformMeals
    );
  }, [fetchMeals]);

  return (
    <section className={classes.meals}>
      <Card className={error ? classes.error : ""}>
        {isLoading && <p className={classes.loading}>Loading....</p>}
        {error && <p className={classes["error-message"]}>{error}</p>}
        <ul>
          {meals.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
