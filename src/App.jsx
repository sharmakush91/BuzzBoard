import { Header } from "./components/Header/Header";
import { Postlist } from "./features/posts/Postlist";
import React from "react";

function App() {
  return (
    <div>
      <Header />
      <Postlist />
    </div>
  );
}

export default App;
