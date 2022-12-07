import { AppPageInterface } from "../../interfaces/app-page.interface";
import { useRouter } from "next/router";
import { USER_ROLE } from "../../const/user-role.const";

const Manager: AppPageInterface = () => {
  const router = useRouter();
  void router.replace(`${USER_ROLE.manager}/manage-branches`);
  return <>loading...</>;
};

// navigate the user to manage-branches

export default Manager;
