import { Button, FileButton, Group, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { linkImage } from "../utilities/image.helper";

type BtnUploaderProps = {
  btnTitle: string;
  render?: (file: File | null) => JSX.Element;
  onChange?: (file: File) => void;
  // allowed MIME type(s).
  accept?: string;
  /**
   * Render the button before or after the preview section.
   * By default, it is Before.
   */
  btnPosition?: "after" | "before";
  // if true, when the user cancels the file browser,
  // it will set the state to null and notify to `onChange`.
  resetOnCancel?: boolean;
};

const BtnSingleUploader = ({
  btnTitle,
  render,
  onChange,
  accept,
  btnPosition,
  resetOnCancel,
}: BtnUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    onChange && file && onChange(file);
  }, [file]);

  return (
    <>
      {btnPosition !== "after" ? (
        <Group position="left">
          <FileButton
            onChange={(e) => {
              if (resetOnCancel === true) {
                setFile(e);
                return;
              }
              // only set when file is not null.
              if (e) {
                setFile(e);
              }
            }}
            accept={accept}
          >
            {(props) => (
              <Button fullWidth id={"file"} {...props}>
                {btnTitle}
              </Button>
            )}
          </FileButton>
        </Group>
      ) : (
        <></>
      )}
      {(render && render(file)) ??
        (file && (
          <>
            <Text size="xs" align="left">
              Picked file: {file.name}
            </Text>
            <Image
              width={160}
              height={160}
              radius="md"
              src={linkImage(file)}
              alt="Random unsplash image"
              className="mt-2 select-none rounded-lg border object-cover shadow-xl"
            />
          </>
        ))}

      {btnPosition === "after" ? (
        <Group position="left">
          <FileButton onChange={setFile} accept={accept}>
            {(props) => (
              <Button id={"file"} {...props}>
                {btnTitle}
              </Button>
            )}
          </FileButton>
        </Group>
      ) : (
        <></>
      )}
    </>
  );
};

export default BtnSingleUploader;
