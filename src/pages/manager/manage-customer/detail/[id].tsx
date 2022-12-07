import { AppPageInterface } from "../../../../interfaces/app-page.interface";
import { USER_ROLE } from "../../../../const/user-role.const";
import CustomerDetail from "../../../_shared/customer/customer-detail";
import { useRouter } from "next/router";
import useWindowPathname from "../../../../hooks/window-pathname.hook";
import { useCustomerDetailQuery } from "../../../../query/model-detail";

const ManageCustomerDetail: AppPageInterface = () => {
  const router = useRouter();
  const { paths } = useWindowPathname();
  const { previousUrl, page } = router.query;

  const id = Number(paths.at(-1));

  // TODO integrate API get user by id
  const { data, isLoading } = useCustomerDetailQuery(id);

  if (isNaN(id) || id <= 0 || (!isLoading && !data)) {
    void router.replace("/404");
    return <>redirecting</>;
  }

  function navigatePreviousPage(previousUrl?: string, page?: number): void {
    const mainPath = previousUrl ?? `/${USER_ROLE.manager}/manage-customer`;
    void router.push({
      pathname: mainPath,
      query: page
        ? {
            page: String(page),
          }
        : undefined,
    });
  }

  return (
    <>
      {data && (
        <CustomerDetail
          data={data}
          mode={"view"}
          onBackBtnClicked={() =>
            navigatePreviousPage(
              previousUrl as string,
              page ? Number(page as string) : undefined
            )
          }
        />
      )}
    </>
  );
};

ManageCustomerDetail.guarded = USER_ROLE.manager;

export default ManageCustomerDetail;
