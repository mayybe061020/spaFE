import className from "./../styles/UnAuthorizedPage.module.scss";
import { AppPageInterface } from "../interfaces/app-page.interface";
import { USER_ROLE } from "../const/user-role.const";
import { useAuthUser } from "../store/auth-user.state";
import Link from "next/link";

/**
 * cool template from:
 * https://codepen.io/akashrajendra/pen/JKKRvQ
 * @constructor
 */
const PageUnauthenticated: AppPageInterface = () => {
  const authState = useAuthUser();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4 text-gray-600 transition-all">
      <h1 className={className.title}>
        Bạn không có quyền truy cập trang này!
      </h1>

      <small className={"select-none text-gray-500"}>(error 401)</small>

      <Link
        className={
          "rounded border border-blue-400 p-4 text-xl font-semibold text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
        }
        href={authState.user ? "/" : "/login"}
      >
        {authState.user ? "Back to Home" : "To Login"}
      </Link>
    </div>
  );
};

PageUnauthenticated.guarded = USER_ROLE.authenticated;
PageUnauthenticated.useLayout = (p) => p;

export default PageUnauthenticated;
