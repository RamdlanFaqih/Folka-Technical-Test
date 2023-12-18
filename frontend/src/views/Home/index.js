import React from "react";
import { CardProduct } from "../../component/CardProduct/CardProduct";

export const Home = () => {
  return (
    <>
      <div className="pt-32">
        <div className="container">
          <div className="w-full px-4 flex flex-wrap">
            <div className="mb-12 p-4">
                <CardProduct />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
