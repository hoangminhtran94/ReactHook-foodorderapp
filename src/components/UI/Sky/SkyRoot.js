import Sky from "react-sky";
import ReactDOM from "react-dom";
import classes from "./SkyRoot.module.css";

const SkyView = () => {
  return (
    <div className={classes["sky-wrapper"]}>
      <Sky
        images={{
          /* FORMAT AS FOLLOWS */
          0: "https://cdn-icons-png.flaticon.com/512/616/616430.png",
        }}
        how={
          80
        } /* You have to pass a number so Sky will render that amount of images chosen randomly from the object you passed in the previous step */
        time={40} /* time of the animation. Dfaults at 20s */
        size={"100px"} /* size of the rendered images. Defaults at 150px */
        background={
          "palettedvioletred"
        } /* color of background. Defaults to none */
      />
    </div>
  );
};

const SkyRoot = (props) => {
  return (
    // .createPortal(<SkyView />, document.getElementById("sky-root"))
    <>
      {ReactDOM.createPortal(<SkyView />, document.getElementById("sky-root"))}
    </>
  );
};
export default SkyRoot;
