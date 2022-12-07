import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SidebarLayout from "../components/layout/sidebar.layout";
import { USER_ROLE } from "../const/user-role.const";
import { AppPageInterface } from "../interfaces/app-page.interface";
import { Provider } from "jotai";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import BreadcrumbsLayout from "../components/layout/breadcrumbs.layout";
import { useAuthUser } from "../store/auth-user.state";
import { useRouter } from "next/router";
import { needRedirectedOnRole } from "../utilities/guard.helper";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiHostRequestInterceptor } from "../utilities/axios.helper";
import { URL_ENDPOINT } from "../const/_const";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { IErrorResponse } from "../interfaces/api.interface";

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: (err) => {
        const error = err as IErrorResponse;
        if (error.status === 401) {
          alert("Phiên làm việc đã hết hạn, hãy đăng nhập lại.");
        }
      },
    },
  },
});

/**
 * Add hostname to every api request with axios.
 */
ApiHostRequestInterceptor(axios, `${URL_ENDPOINT}`, {
  UTC_OFFSET: -(new Date().getTimezoneOffset() / 60),
  TIMEZONE: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const [clientPassedGuard, setClientPassedGuard] = useState(false);
  const authState = useAuthUser((s) => s.user);
  const router = useRouter();
  // safe parse the Component to correct type
  const RenderPage = Component as AppPageInterface;
  const pageLayout =
    RenderPage.useLayout ??
    ((p: JSX.Element) => (
      <SidebarLayout role={USER_ROLE.anonymous}>
        <BreadcrumbsLayout>{p}</BreadcrumbsLayout>
      </SidebarLayout>
    ));

  // Default all routes are guarded.
  const isGuarded: USER_ROLE | USER_ROLE[] =
    RenderPage.guarded ?? USER_ROLE.authenticated;
  useEffect(() => {
    setClientPassedGuard(!needRedirectedOnRole(router, isGuarded, authState));
  }, [isGuarded, authState]);

  /**
   * Allow Mantine to run after TailwindCSS load (prevent override the component CSS)
   */
  const appendCache = createEmotionCache({ key: "mantine", prepend: false });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <MantineProvider
            emotionCache={appendCache}
            withGlobalStyles
            withNormalizeCSS
          >
            <ModalsProvider>
              <NotificationsProvider autoClose={4000}>
                {clientPassedGuard ? (
                  pageLayout(<Component {...pageProps} />)
                ) : (
                  <></>
                )}
              </NotificationsProvider>
            </ModalsProvider>
          </MantineProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
