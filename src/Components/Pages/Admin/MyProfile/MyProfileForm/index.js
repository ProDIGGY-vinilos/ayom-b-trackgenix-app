import { getOneAdmin, putAdmin } from 'redux/admins/thunks';
import { schema } from 'Components/Admins/validations';
import ProfileForm from 'Components/Shared/ProfileForm';

function Form() {
  return (
    <ProfileForm
      schema={schema}
      entity="admins"
      post={undefined}
      put={putAdmin}
      getOne={getOneAdmin}
      textEdit="Edit Admin"
      textNew="New Admin"
      type="admin"
      href="/admin/profile"
    />
  );
}

export default Form;
