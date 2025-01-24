"use client";
import { PopupProvider } from "@/context/popupContext";
import { store } from "@/redux/store";
import { Bounce, ToastContainer } from "material-react-toastify";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
const queryClient = new QueryClient();
function ClientProvider({ children }: { children?: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Provider store={store}>
            <PopupProvider>{children}</PopupProvider>
          </Provider>
        </SessionProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default ClientProvider;
