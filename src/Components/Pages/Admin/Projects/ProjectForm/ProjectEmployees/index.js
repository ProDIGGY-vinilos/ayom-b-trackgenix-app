import React from 'react';
import styles from 'Components/Projects/Form/FormEmployees/formemployee.module.css';
import InputField from 'Components/Shared/Input/input';
import Select from 'Components/Shared/Select';
import { useFieldArray } from 'react-hook-form';
import Button from 'Components/Shared/Button/Button';

const FormEmployee = ({ register, control, errors, employees }) => {
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className={styles.employees}>
            <div className={styles.selects}>
              <Select
                options={employees}
                field="lastName"
                name={`employees[${index}].employee`}
                label="Employee"
                register={register}
                error={errors.employees?.employee?.message}
              />
              <Select
                options={roles}
                field="role"
                name={`employees[${index}].role`}
                label="Role"
                register={register}
                error={errors.employees?.role?.message}
              />
            </div>
            <div>
              <InputField
                name={`employees[${index}].rate`}
                type="number"
                placeholder="Rate"
                label="Rate"
                register={register}
                error={errors.employees?.[index]?.rate.message}
              />
            </div>
            <div className={styles.button}>
              <Button style="squaredPrimary" text="Remove" onClick={() => remove(index)} />
            </div>
          </div>
        );
      })}
      <Button onClick={() => append({})} text="Add employee" style="squaredPrimary2" />
    </>
  );
};

export default FormEmployee;
