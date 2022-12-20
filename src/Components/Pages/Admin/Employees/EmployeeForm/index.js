import React from 'react';
import { getOneEmployee, putEmployee } from 'redux/employees/thunks';
import { schema } from 'Components/Employees/validation';
import ProfileForm from 'Components/Shared/ProfileForm';

const EmployeeForm = () => {
  // const dispatch = useDispatch();
  // const { error, message } = useSelector((state) => state.employees);
  // const employeeId = useParams().id;
  // const employee = useSelector((state) =>
  //   state.employees.list.find((employee) => employee._id === employeeId)
  // );
  // const token = sessionStorage.getItem('token');

  // const [typeModal, setTypeModal] = useState('');
  // const [textModal, setTextModal] = useState('');
  // const [showModal, setShowModal] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset
  // } = useForm({
  //   mode: 'onChange',
  //   resolver: joiResolver(schema)
  // });

  // const openModal = () => {
  //   setShowModal(true);
  //   dispatch(clearError());
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  //   dispatch(clearError());
  // };

  // useEffect(() => {
  //   if (error) {
  //     setTypeModal('Error');
  //     setTextModal(error);
  //     openModal();
  //   } else if (message) {
  //     setTypeModal('Success');
  //     setTextModal(message);
  //     openModal();
  //   }
  // }, [error, message]);

  // const employeeData = {
  //   name: employee?.name,
  //   lastName: employee?.lastName,
  //   email: employee?.email,
  //   phone: employee?.phone,
  //   password: employee?.password
  // };

  // useEffect(() => {
  //   dispatch(clearError());
  //   if (employeeId) {
  //     reset(employeeData);
  //     return;
  //   }
  // }, []);

  // const onSubmit = (data) => {
  //   if (employeeId) {
  //     dispatch(putEmployee(employeeId, data, token));
  //   } else {
  //     dispatch(postEmployee('', data));
  //   }
  //   setTypeModal('Success');
  // };

  return (
    <ProfileForm
      schema={schema}
      entity="employees"
      post={undefined}
      put={putEmployee}
      getOne={getOneEmployee}
      textEdit="Edit Employee"
      textNew="New Employee"
      type="employee"
      href="/admin/employees"
    />
    // <>
    //   <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
    //     <h3 className={styles.titleForm}>Create Employee</h3>
    //     <Button href="/admin/employees" style="roundedSecondary" disabled={false} text="X" />
    //     <div className={styles.formControl}>
    //       <InputField
    //         label="Name"
    //         name="name"
    //         type="text"
    //         placeholder="name"
    //         register={register}
    //         error={errors.name?.message}
    //       />
    //     </div>
    //     <div className={styles.formControl}>
    //       <InputField
    //         label="Last Name"
    //         name="lastName"
    //         type="text"
    //         placeholder="last name"
    //         register={register}
    //         error={errors.lastName?.message}
    //       />
    //     </div>
    //     <div className={styles.formControl}>
    //       <InputField
    //         label="Email"
    //         name="email"
    //         type="mail"
    //         placeholder="email"
    //         register={register}
    //         error={errors.email?.message}
    //       />
    //     </div>
    //     <div className={styles.formControl}>
    //       <InputField
    //         label="Phone Number"
    //         name="phone"
    //         type="number"
    //         placeholder="phone"
    //         register={register}
    //         error={errors.phone?.message}
    //       />
    //     </div>
    //     <div className={styles.formControl}>
    //       <InputField
    //         label="Password"
    //         name="password"
    //         type="password"
    //         placeholder="password"
    //         register={register}
    //         error={errors.password?.message}
    //       />
    //     </div>
    //     <div>
    //       <MessageModal
    //         type={typeModal}
    //         isOpen={showModal}
    //         message={textModal}
    //         handleClose={closeModal}
    //         goBack={'/admin/employees'}
    //       />
    //     </div>
    //     <Button
    //       onClick={handleSubmit(onSubmit)}
    //       style="squaredPrimary"
    //       disabled={false}
    //       text="Save"
    //     />
    //   </form>
    // </>
  );
};

export default EmployeeForm;
