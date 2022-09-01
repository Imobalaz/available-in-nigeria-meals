import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Kebab",
//     description: "A turkish specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const res = await fetch(
        "https://post-http-request-6476f-default-rtdb.firebaseio.com/meals.json"
      );

      if (!res.ok) {
        throw new Error("Unable to connect to database");
      }
      const data = await res.json();

      const loadedMeals = [];
      for (const meal in data) {
        loadedMeals.push({
          id: meal,
          name: data[meal].name,
          description: data[meal].description,
          price: data[meal].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error=> {
      setIsLoading(false);
      setError(error.message)
    });
  }, []);

  if (isLoading) {
    return (
      <Card>
        <section>Loading</section>
      </Card>
    );
  }

  if (error) {
    return <Card>{error}</Card>;
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        name={meal.name}
        price={meal.price}
        id={meal.id}
        description={meal.description}
        key={meal.id}
      />
    );
  });

  return (
    <section>
      <Card>
        <ul className={classes.meals}>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
