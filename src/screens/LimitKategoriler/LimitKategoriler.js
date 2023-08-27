import React from "react";
import Header from "components/utils/Headers";
import LimitKategoriFetch from "./LimitKategoriFetch";

const LimitKategoriler = () => {
  return (
    <div className=" h-screen justify-center">
      <Header
        variant={"h2"}
        title={"Limit Kategoriler"}
        fontSize="2rem"
        margin="1rem 0 0 1rem"
      />
      <LimitKategoriFetch height={"80vh"} />
    </div>
  );
};

export default LimitKategoriler;
