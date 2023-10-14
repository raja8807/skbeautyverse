import BannerForm from "./form/banner_form/banner_form";
import PackageForm from "./form/banner_form/package_form/package_form";

const AdminPanel = ({homeData}) => {
  return (
    <div>
      <BannerForm bannerImages={homeData?.bannerImages}/>
      <PackageForm packages={homeData?.packages}/>
    </div>
  );
};

export default AdminPanel;
