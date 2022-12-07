import { ChangeEvent, useState } from "react";
import { ACCEPTED_IMAGE_TYPES } from "../const/file.const";

type fnRender = (fileSrc?: string) => JSX.Element;

type coreProps = {
  className?: string;
  mime?: string;
};

type props = coreProps & {
  defaultSrc?: string;
  render: fnRender;
  onChange?: (file: File | null) => void;
  multiple?: false;
};

const ImageUpload = ({
  onChange,
  defaultSrc,
  mime,
  className,
  multiple,
  render,
}: props) => {
  const [fileSrc, setFileSrc] = useState<string | undefined>(defaultSrc);

  function selectedFile(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    e.preventDefault();
    const file = (e.target.files ?? [])[0] as File | undefined;
    onChange && onChange(file ?? null);

    if (file) {
      setFileSrc(URL.createObjectURL(file));
    }
  }

  return (
    <label className={className}>
      {render(fileSrc)}
      <input
        multiple={multiple}
        onChange={(e) => selectedFile(e)}
        type="file"
        hidden
        accept={mime ?? ACCEPTED_IMAGE_TYPES.join(",")}
      />
    </label>
  );
};

export default ImageUpload;
