
import React from 'react';
import { Entrypoint } from './src';


if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

const App = () => {
  return <Entrypoint />
};

export default App;
