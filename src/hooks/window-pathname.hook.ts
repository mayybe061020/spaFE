import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useWindowPathname = () => {
  const router = useRouter();
  const [paths, setPaths] = useState<string[]>(
    splitPaths(window.location.pathname)
  );

  useEffect(() => {
    const paths: string[] = splitPaths(window.location.pathname);
    setPaths(paths);
  }, []);

  function splitPaths(pathName: string) {
    return pathName.split("/").filter((s) => !!s);
  }

  return { paths, nextPaths: router.asPath };
};

export default useWindowPathname;
