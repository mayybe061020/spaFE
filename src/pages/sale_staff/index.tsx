import { AppPageInterface } from "../../interfaces/app-page.interface";
import { USER_ROLE } from "../../const/user-role.const";
import { useRouter } from "next/router";

const SaleStaff: AppPageInterface = () => {
  const router = useRouter();
  void router.replace(`${USER_ROLE.sale_staff}/schedule`);
  return <>loading...</>;
};

SaleStaff.guarded = USER_ROLE.sale_staff;

export default SaleStaff;
