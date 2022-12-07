import { AppPageInterface } from "../interfaces/app-page.interface";

/**
 * HTML logo version.
 * @param h
 * @param fontSize
 * @constructor
 */
const Logo: AppPageInterface<{
  h?: string | number;
  fontSize?: string;
}> = ({ h, fontSize }) => {
  return (
    <div
      style={{
        height: h ?? "2rem",
      }}
      className={`flex select-none items-center leading-none ${
        fontSize ?? "text-base"
      }`}
    >
      <div className="grid aspect-square h-[87.5%] place-items-center rounded-[4px] bg-pink-500 uppercase leading-none text-white">
        S
      </div>
      <span className="ml-1 font-semibold uppercase leading-none">SPA</span>
    </div>
  );
};

export default Logo;
