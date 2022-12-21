import styles from 'Components/Footer/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <div className={styles.appName}>
          <div>
            <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
              <img
                className={styles.socialIcon}
                src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
              />
            </a>
            <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
              <img
                className={styles.socialIcon}
                src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
              />
            </a>
            <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
              <img
                className={styles.socialIcon}
                src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
              />
            </a>
          </div>
          Copyright © 2022 GigaTech Software Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
