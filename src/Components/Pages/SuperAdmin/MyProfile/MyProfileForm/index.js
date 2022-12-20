import { putSuperAdmin, getOneSuperAdmin } from 'redux/superAdmins/thunks';
import { schema } from 'Components/Admins/validations';
import ProfileForm from 'Components/Shared/ProfileForm';

function Form() {
  return (
    <ProfileForm
      schema={schema}
      entity="superAdmins"
      put={putSuperAdmin}
      getOne={getOneSuperAdmin}
      textEdit="Edit Super Admin"
      textEditSuccess="Super Admin edited successfully"
      type="admin"
      href="/super-admin/profile"
    />
  );
}

export default Form;
