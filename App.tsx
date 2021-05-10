import React, { useEffect, useRef } from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Toast, { ToastProvider } from "react-native-fast-toast";
import { TabNavigator } from "./navigation/tab-navigation";

export default function App() {
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    toast = toastRef.current;
  }, []);
  return (
    <ToastProvider placement="bottom">
      <TabNavigator />
      <Toast placement="bottom" ref={toastRef} offset={80} />
    </ToastProvider>
  );
}
