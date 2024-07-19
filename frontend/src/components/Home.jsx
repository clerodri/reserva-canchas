import React from "react";

import { Header } from "./core/Header";
import Filters from "./home/Filters";
import Canchas from "./home/Canchas";

function Home() {
  return (
    <>
      <div className={`flex sm:p-0 md:px-10 md:py-4 `}>
        <div className="flex flex-col">
          <Header />
          <Filters />
          <Canchas />
        </div>
      </div>
    </>
  );
}

export default Home;
