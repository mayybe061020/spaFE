import { Children, Fragment, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { Anchor, Breadcrumbs } from "@mantine/core";

type BreadCrumbsInfo = {
  title: string;
  href: string;
};

/**
 * TODO: think an effective...
 * @param children
 * @constructor
 */
const BreadcrumbsLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const childrenArray = Children.toArray(children);

  const childrenWithSeparate = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span>/</span>
        </Fragment>
      );
    }
    return child;
  });

  const exampleBreadCrumbs: BreadCrumbsInfo[] = [
    { title: "Quản lý Chi Nhánh", href: "/admin/manage-branch" },
    { title: "Thông tin chi tiết", href: "/admin/manage-branch/123" },
  ];

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex h-16 flex-col bg-gray-200 p-2 shadow">
        {/*<Breadcrumbs className="font-semibold">*/}
        {/*  {exampleBreadCrumbs.map((bc) => (*/}
        {/*    <Anchor href={bc.href} key={bc.href}>*/}
        {/*      {bc.title}*/}
        {/*    </Anchor>*/}
        {/*  ))}*/}
        {/*</Breadcrumbs>*/}
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default BreadcrumbsLayout;
