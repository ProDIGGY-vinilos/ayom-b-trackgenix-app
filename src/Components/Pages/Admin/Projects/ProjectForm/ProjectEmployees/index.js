import React from 'react';
import styles from 'Components/Projects/Form/FormEmployees/formemployee.module.css';
import InputField from 'Components/Shared/Input/input';
import Select from 'Components/Shared/Select';
import { useFieldArray } from 'react-hook-form';

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
            <Select
              options={employees}
              field="lastName"
              name={`employees[${index}].employee`}
              label="Employees"
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
            <div>
              <InputField
                name={`employees[${index}].rate`}
                type="number"
                placeholder="Rate"
                label="Rate"
                register={register}
                error={errors.employees?.rate?.message}
              />
            </div>
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        );
      })}
      <button type="button" onClick={() => append({})}>
        Append
      </button>
    </>
  );
};

export default FormEmployee;
