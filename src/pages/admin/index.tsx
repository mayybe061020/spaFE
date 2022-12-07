import { AppPageInterface } from "../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../const/user-role.const";

const Admin: AppPageInterface = () => {
  const router = useRouter();
  void router.replace(`/${USER_ROLE.admin}/manage-branches`);
  return <>loading...</>;
};

export default Admin;
