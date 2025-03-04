import styles from "./styles.module.scss";

const NeumorphicInputBox = () => {
  return (
    <div className={`${styles.container} h-auto pb-40`}>
      <h2 className="heading mb-10 pt-10">Neumorphic Input Box</h2>
      <input type="text" className={styles.input} placeholder="Enter text" />
    </div>
  );
};
export default NeumorphicInputBox;
