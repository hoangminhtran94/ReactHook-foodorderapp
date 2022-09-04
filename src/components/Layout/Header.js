import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1> React Meal</h1>
        <HeaderCartButton onSelectCart={props.onSelectCart} />
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of foods!" />
      </div>
    </>
  );
};

export default Header;
