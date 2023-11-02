import CustomButton from "@/components/ui/custom_button/custom_button";
import BannerForm from "./form/banner_form/banner_form";
import PackageForm from "./form/banner_form/package_form/package_form";
import { signOut } from "next-auth/react";

const AdminPanel = ({ homeData }) => {
  return (
    <div>
      <CustomButton
        clickHandler={() => {
          signOut();
        }}
      >
        Logout
      </CustomButton>
      <br />
      <br />
      <BannerForm bannerImages={homeData?.bannerImages} />
      <PackageForm packages={homeData?.packages} />
    </div>
  );
};

export default AdminPanel;
