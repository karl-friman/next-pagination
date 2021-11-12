import styles from '../styles/Spinner.module.css';
function Spinner() {
  return (
    <>
      <div className='container '>
        <div className={`spinner ${styles.loader}`}>Loading...</div>
      </div>
    </>
  );
}

export default Spinner;
