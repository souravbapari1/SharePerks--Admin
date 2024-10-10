"use client";
import { PopupProvider } from "@/context/popupContext";
import { store } from "@/redux/store";
import { Bounce, ToastContainer } from "material-react-toastify";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

function ClientProvider({ children }: { children?: ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <PopupProvider>{children}</PopupProvider>
      </Provider>
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
    </>
  );
}

export default ClientProvider;
