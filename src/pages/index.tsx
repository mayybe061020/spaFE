import { AppPageInterface } from "../interfaces/app-page.interface";
import { IconArrowLeft } from "@tabler/icons";

const Home: AppPageInterface = () => {
  return (
    <div
      className={
        "flex min-h-full w-full select-none flex-col items-center justify-center space-y-2 text-gray-800"
      }
    >
      <h1 className={"text-center"}>Xin Chào!</h1>
      <div className="flex items-center space-x-2 text-gray-500">
        <IconArrowLeft />
        <span className={"mb-1 leading-none"}>Truy cập thư mục làm việc</span>
      </div>
    </div>
  );
};

export default Home;
