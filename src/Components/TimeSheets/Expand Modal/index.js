import styles from './expandmodal.module.css';

function Modal(props) {
  if (!props.openModal) {
    return null;
  }
  console.log(props.data);

  switch (props.element) {
    case 'Task':
      return (
        <div className={styles.container}>
          <div className={styles.modal}>
            <h2 className={styles.title}>{props.element}</h2>
            <p>Description: {props.data.description}</p>
            <button className={styles.closebutton} onClick={props.closeModal}>
              x
            </button>
          </div>
        </div>
      );
    case 'Project':
      return (
        <div className={styles.container}>
          <div className={styles.modal}>
            <h2 className={styles.title}>{props.element}</h2>
            <p>Name: {props.data.name}</p>
            <p>Description: {props.data.description}</p>
            <p>Start Date: {props.data.startDate}</p>
            <p>End Date: {props.data.endDate}</p>
            <p>Client Name: {props.data.clientName}</p>
            {props.data.employees.map((employee) => {
              return <p key={employee.employee._id}>Employee: {employee.employee}</p>;
            })}
            <button className={styles.closebutton} onClick={props.closeModal}>
              x
            </button>
          </div>
        </div>
      );
    case 'Employee':
      return (
        <div className={styles.container}>
          <div className={styles.modal}>
            <h2 className={styles.title}>{props.element}</h2>
            <p>Name: {props.data.name}</p>
            <p>Last Name: {props.data.lastName}</p>
            <p>Phone: {props.data.phone}</p>
            <p>Email: {props.data.email}</p>
            <p>Password: {props.data.password}</p>
            <button className={styles.closebutton} onClick={props.closeModal}>
              x
            </button>
          </div>
        </div>
      );
  }
}

export default Modal;
