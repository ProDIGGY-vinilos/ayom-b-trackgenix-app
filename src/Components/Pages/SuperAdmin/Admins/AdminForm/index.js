import { postAdmin, putAdmin, getOneAdmin } from 'redux/admins/thunks';
import { schema } from 'Components/Admins/validations';
import ProfileForm from 'Components/Shared/ProfileForm';

function Form() {
  return (
    <ProfileForm
      schema={schema}
      entity="admins"
      post={postAdmin}
      put={putAdmin}
      getOne={getOneAdmin}
      textNew="New Admin"
      type="admin"
      href="/super-admin/admins"
    />
  );
}

export default Form;
