import React from "react";
import styles from "../../../styles/customDivider.module.scss";

export const CustomDivider = () => {
  return (
    <div
      className={`${styles.divider} ${styles.div_transparent} ${styles.div_dot} `}
    >
      <span className={`${styles.div_dot_two}`}></span>
    </div>
  );
};
