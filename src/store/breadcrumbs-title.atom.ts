import { atom, useAtom } from "jotai";

const breadcrumbsTitleAtom = atom("");

const useBreadcrumbsTitle = () => {
  const [title, setTitle] = useAtom(breadcrumbsTitleAtom);

  function _setTitle(t: string) {
    setTitle(t);
  }

  function reset() {
    setTitle("");
  }

  return [title, _setTitle, reset];
};

export default useBreadcrumbsTitle;
