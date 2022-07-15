import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";

import HeaderFC from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import PageShowProduct from "./pages/pageShowProduct/PageShowProduct";
import PageProductDetail from "./pages/pageProductDetail/PageProductDetail";
import {
  PageProductManage,
  PageUpdateProduct,
} from "./pages/pageProductManage";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Alert from "./pages/pageProductManage/components/Alert";
import { ContextProduct } from "./context/ProductContext";
import { LoadingContext } from "./context";

interface ItemHeader {
  key: number;
  title: string;
  url: string;
}

const itemHeader: ItemHeader[] = [
  {
    key: 1,
    title: "SẢN PHẨM",
    url: "/product-show",
  },
  {
    key: 2,
    title: "QUẢN LÝ SẢN PHẨM",
    url: "/product-manage",
  },
];

const App: React.FC = () => {
  const { action, isShowAlert, setIsShowAlert } = useContext(ContextProduct);
  return (
    <>
      <LoadingContext>
        <div className="relative w-100% h-screen bg-[#E5E5E5]">
          <HeaderFC items={itemHeader} />
          <div className="grid grid-cols-12">
            <div className="col-span-3 sticky top-0 left-0 bg-white h-screen">
              <Navbar />
            </div>
            <div className="col-span-9 w-full !bg-[#E5E5E5]">
              <Layout className="h-fit px-14 !bg-[#E5E5E5]">
                {/* Content */}
                <Routes>
                  <Route path="/product-show" element={<PageShowProduct />} />
                  <Route
                    path="/product-show/product-detail/:productId"
                    element={<PageProductDetail />}
                  />
                  <Route
                    path="/product-manage"
                    element={<PageProductManage />}
                  />
                  <Route
                    path="/product-manage/update-product/:productId"
                    element={<PageUpdateProduct />}
                  />
                  <Route
                    path="/"
                    element={<Navigate to="/product-show" replace />}
                  />
                  <Route path="/not-found" element={<PageNotFound />} />
                  <Route
                    path="*"
                    element={<Navigate to="/not-found" replace />}
                  />
                </Routes>
              </Layout>
            </div>
          </div>
          <Alert
            action={action}
            isShowAlert={isShowAlert}
            setIsShowAlert={setIsShowAlert}
          />
        </div>
      </LoadingContext>
    </>
  );
};

export default App;
