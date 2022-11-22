import styles from 'Components/Shared/Header/Title/title.module.css';

const Title = ({ title }) => {
  return <div className={styles.route}>{title}</div>;
};

export default Title;
