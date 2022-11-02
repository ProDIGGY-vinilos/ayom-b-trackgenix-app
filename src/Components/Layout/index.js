import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import SuperAdmins from '../SuperAdmins/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import Projects from '../Projects';
import ProjectForm from '../Projects/Form/index';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';

function Layout() {
  let currentScreen = <Home />;
  const path = window.location.pathname.split('/')[1];
  switch (path) {
    case 'admins':
      currentScreen = <Admins />;
      break;
    case 'admin-form':
      currentScreen = <Admins />;
      break;
    case 'super-admins':
      currentScreen = <SuperAdmins />;
      break;
    case 'super-admin-form':
      currentScreen = <SuperAdmins />;
      break;
    case 'employees':
      currentScreen = <Employees />;
      break;
    case 'employee-form':
      currentScreen = <Employees />;
      break;
    case 'projects':
      currentScreen = <Projects />;
      break;
    case 'project-form':
      currentScreen = <ProjectForm />;
      break;
    case 'time-sheets':
      currentScreen = <TimeSheets />;
      break;
    case 'time-sheet-form':
      currentScreen = <TimeSheets />;
      break;
    case 'tasks':
      currentScreen = <Tasks />;
      break;
    case 'task-form':
      currentScreen = <Tasks />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;
