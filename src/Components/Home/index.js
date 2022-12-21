import styles from 'Components/Home/home.module.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from 'Components/Footer/';

const Home = (props) => {
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    switch (role) {
      case 'EMPLOYEE':
        props.history.push('/employee');
        break;
      case 'ADMIN':
        props.history.push('/admin');
        break;
      case 'SUPER_ADMIN':
        props.history.push('/super-admin');
        break;
    }
  }, [role]);

  return (
    <section>
      <header className={styles.headerConteiner}>
        <h2 className={styles.headerTitle}>TrackGenix</h2>
        <h2 className={styles.headerSubTitle}>By GigaTech Software Solutions</h2>
      </header>
      <body>
        <aside>
          <div>
            <div className={styles.asideBoxConteiner}>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/AsideIcon/home.png`}></img>
              <Link className={styles.link} to="/home">
                Home
              </Link>
            </div>
            <div className={styles.asideBoxConteiner}>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/AsideIcon/signIn.png`}></img>
              <Link className={styles.link} to="/login">
                Sign In
              </Link>
            </div>
            <div className={styles.asideBoxConteiner}>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/AsideIcon/signUp.png`}></img>
              <Link className={styles.link} to="/sign-up">
                Sign Up
              </Link>
            </div>
            <div className={styles.asideBoxConteiner}>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/AsideIcon/abaut.png`}></img>
              <div className={styles.link}>About</div>
            </div>
            <div className={styles.asideBoxConteiner}>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/AsideIcon/map.png`}></img>
              <div className={styles.link}>Map</div>
            </div>
            <div className={styles.asideBoxConteiner}>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/AsideIcon/more.png`}></img>
              <div className={styles.link}>More</div>
            </div>
          </div>
          <div className={styles.asideBottom}>
            <div className={styles.asideBottomText}>Contact us:</div>
            <div className={styles.asideBottomText}>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/AsideIcon/email.png`}></img>
              trackgenix@gmail.com
            </div>
            <div className={styles.asideBottomText}>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/AsideIcon/phone.png`}></img>
              18-12-2022
            </div>
          </div>
        </aside>
        <div className={styles.bodyConteiner}>
          <div className={styles.bodyImageConteiner}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/Home/mainImage/HomePage.png`}
              className={styles.bodyImage}
            ></img>
            <h2 className={styles.bodyImageText}>Keep track of your employees’ progress easily </h2>
            <div className={styles.textBox}>
              <h2>
                Our HR management software will allow you to have a traceability of your employees,
                manage teams easily and take your leadership to the next level.
              </h2>
            </div>
          </div>
          <div className={styles.firstArticle}>
            <h2 className={styles.firstArticleTitle}>Why Trackgenix?</h2>
            <div className={styles.firstArticleParagraph}>
              We seek to make the management of the different areas of the companies work in a much
              simpler and more efficient way. Our goal is to reduce and optimize considerably the
              costs associated with the fulfillment of the working day.
            </div>
            <div className={styles.firstArticleParagraph}>
              We work by streamlining your administrative processes and giving you management tools
              that dynamize your sales and improve your quality of service.
            </div>
            <div className={styles.firstArticleParagraph}>
              With this software you will no longer have to worry about compliance control, since it
              is a productivity enhancer that will allow you to focus on what is important:
            </div>
            <div className={styles.firstArticleParagraph}>DOING YOUR BUISNESS.</div>
          </div>
          <div className={styles.lastArticleConteiner}>
            <div className={styles.lastArticleBox}>
              <div>Hour long</div>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/mainImage/hourlog.png`}></img>
            </div>
            <div className={styles.lastArticleBox}>
              <div>Report</div>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/mainImage/report.png`}></img>
            </div>
            <div className={styles.lastArticleBox}>
              <div>Resources Management</div>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/mainImage/rm.png`}></img>
            </div>
            <div className={styles.lastArticleBox}>
              <div>MultipleRole</div>
              <img src={`${process.env.PUBLIC_URL}/assets/Home/mainImage/multipleRoles.png`}></img>
            </div>
          </div>
        </div>
      </body>
      <Footer />
    </section>
  );
};

export default Home;
