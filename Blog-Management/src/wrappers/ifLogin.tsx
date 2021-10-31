import React from 'react';
import { useStore } from "@/.umi/plugin-dva/exports";

import { Redirect } from 'umi'

export default (props: any) => {
  const store = useStore().getState();
  if (store.user.isLogin) {
    return <>{ props.children }</>;
  } else {
    return <Redirect to="/login" />;
  }
}