import AdminPanel from "@/components/screens/admin/admin_panel/admin_panel";

const {
  default: CustomContainer,
} = require("@/components/ui/custom_container/custom_container");

const Admin = () => {
  return (
    <CustomContainer>
      <AdminPanel />
    </CustomContainer>
  );
};

export default Admin;
