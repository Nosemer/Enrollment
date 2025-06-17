import Input from "../ui/Input";
import Button from "../ui/buttons";

const ProfileForm = ({ values, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Edit Profile</h2>
      <Input
        label="Full Name"
        name="name"
        value={values.name}
        onChange={onChange}
      />
      <Input
        label="Email"
        name="email"
        value={values.email}
        onChange={onChange}
        type="email"
      />
      <Button type="submit" variant="primary">Save Changes</Button>
    </form>
  );
};

export default ProfileForm;
