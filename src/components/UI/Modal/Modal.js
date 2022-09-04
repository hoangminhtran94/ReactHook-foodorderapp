import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={styles["backdrop"]} onClick={props.onCancel} />;
};
const ModalOverlay = (props) => {
  return (
    <Card className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </Card>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCancel={props.onCancel} />,
        document.getElementById("overlay-root")
      )}

      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default Modal;
