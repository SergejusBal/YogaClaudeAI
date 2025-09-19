import styles from "./Confirm.module.css";
import { useConfirm } from "../Providers/ConfirmProvider";

function ConfirmModal() {
  const { isVisible, message, handleConfirm, handleCancel } = useConfirm();

  if (!isVisible) return null;

  return (
    <div className={styles["popup"]}>
      <div className={styles["popup-content"]}>
        <p>{message}</p>
        <div className={styles["buttonDiv"]}>
            <button className={styles["action-button-red"]} onClick={handleCancel}>Cancel</button>
            <button className={styles["action-button"]} onClick={handleConfirm}>Yes</button>          
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;


