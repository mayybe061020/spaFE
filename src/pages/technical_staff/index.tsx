import { AppPageInterface } from "../../interfaces/app-page.interface";
import { USER_ROLE } from "../../const/user-role.const";
import { useRouter } from "next/router";

const TechnicalStaff: AppPageInterface = () => {
  const router = useRouter();

  void router.replace(`/${USER_ROLE.technical_staff}/schedule`);
  return <>loading...</>;
};

TechnicalStaff.guarded = USER_ROLE.technical_staff;

export default TechnicalStaff;
