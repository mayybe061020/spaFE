import className from "../styles/NotFoundPage.module.scss";
import { AppPageInterface } from "../interfaces/app-page.interface";
import { USER_ROLE } from "../const/user-role.const";
import Link from "next/link";
import { Button } from "@mantine/core";

/**
 * Copy from this cool template:
 * https://codepen.io/uzcho_/pen/eYZLMdg
 * @constructor
 */
const NotFoundPage: AppPageInterface = () => {
  return (
    <div
      className={
        "min-w-screen flex min-h-screen flex-col items-center justify-center"
      }
    >
      <div className={className.number404}>404</div>
      <div className={className.text}>
        <span>Ooops...</span>
        <br />
        không tìm thấy trang
      </div>
      <Link href={"/"} passHref>
        <Button component={"a"} className={"mt-8"} variant={"outline"}>
          Quay lại trang chủ
        </Button>
      </Link>
    </div>
  );
};

NotFoundPage.guarded = USER_ROLE.all;
NotFoundPage.useLayout = (p) => p;

export default NotFoundPage;
