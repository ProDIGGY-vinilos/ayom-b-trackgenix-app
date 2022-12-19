import { getOneAdmin, postAdmin, putAdmin } from 'redux/admins/thunks';
import { schema } from 'Components/Admins/validations';
import ProfileForm from 'Components/Shared/ProfileForm';

function Form() {
  return (
    <ProfileForm
      schem={schema}
      entity="admins"
      post={postAdmin}
      put={putAdmin}
      getById={getOneAdmin}
      textEdit="Edit Admin"
      textNew="New Admin"
      textEditSuccess="Admin edited successfully"
      textNewSuccess="Admin created successfully"
      type="admin"
      href="/admin/admins"
    />
  );
}

export default Form;
