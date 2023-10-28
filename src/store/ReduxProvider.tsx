"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";

type Props = {
  children: ReactNode;
};

const ReduxProvider = (props: Props) => {
  const { children } = props;

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
