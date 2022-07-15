import React, { useCallback, useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { Empty, Layout, Modal } from "antd";

import { useShowAlert } from "../../hook/useShowAlert";
import BoxProduct from "../../components/box-product/BoxProduct";
import Paginate from "../../components/pagination/Pagination";
import SubHeader from "../../components/sub-header/SubHeader";
import FormCreateProduct from "./components/FormCreateProduct";
import ConfirmDeleteProduct from "./components/ConfirmDeleteProduct";
import { Product, ProductDocument } from "../../models/Product";
import { ListResponse } from "../../models/Common";
import productApi from "../../api/productApi";
import { validatePrice } from "../../common/validate";
import useLoading from "../../hook/useLoading";
import { Category } from "../../models/Category";
import categorySchemaApi from "../../api/categoryApi";
import brandApi from "../../api/brandApi";
import { Brand } from "../../models/Brand";
const { Content } = Layout;

interface queryDetail {
  category?: any;
  brand?: any;
}

const PageProductManage: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [picProduct, setPicProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState<ProductDocument>({});
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] =
    useState<boolean>(false);
  const [productDelete, setProductDelete] = useState<Product>();
  let [productData, setProductData] = useState<
    ListResponse<Product> | undefined
  >();
  const [categoriesForm, setCategoriesForm] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [errorMessageValidatePrice, setErrorMessageValidatePrice] =
    useState<string>("");
  const [queryDetailPage, setQueryDetailPage] = useState<queryDetail>({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryOb, setQueryOb] = useState<any>();
  const typingTimeoutRef = useRef<any>(null);

  const location = useLocation();
  const query = queryString.parse(location.search);
  let formData = new FormData();
  const navigate = useNavigate();
  const limit = 6;

  const alert = useShowAlert();
  const [showLoading, hideLoading] = useLoading();

  // =============== GET PRODUCT ====================
  const getProduct = () => {
    showLoading();
    productApi
      .getAll(
        limit,
        Number(searchParams.get("page")),
        searchParams.get("category"),
        searchParams.get("brand"),
        searchParams.get("keyword")
      )
      .then((res) => {
        hideLoading();
        setProductData(res);
      })
      .catch((err) => {
        hideLoading();
        throw new Error("Can not get product!");
      });
  };
  // =============== GET CATEGORIES FORM =================
  const getCategoriesForm = useCallback(async () => {
    try {
      const data = await categorySchemaApi.get();
      setCategoriesForm(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // =================CREATE PRODUCT======================
  Object.entries(newProduct).forEach((value, index: number) => {
    formData.append(value[0], value[1]);
  });
  formData.append("product_pic", picProduct);

  const handleCreateProduct = () => {
    showLoading();
    productApi
      .add(formData)
      .then((res) => {
        hideLoading();
        setIsOpenModal(false);
        setPicProduct(null);
        setNewProduct({});
        alert.handleOpenAlert("add");
        getProduct();
      })
      .catch((err: AxiosError) => {
        console.log(err);
        hideLoading();
      });
  };

  // =================DELETE PRODUCT======================
  const handleDeleteProduct = () => {
    showLoading();
    productApi
      .delete(productDelete?._id)
      .then((res) => {
        hideLoading();
        setIsOpenConfirmDelete(false);
        alert.handleOpenAlert("delete");
        getProduct();
      })
      .catch((err) => {
        if (err.response.data.code === 404) {
          navigate("/not-found");
        }
        hideLoading();
      });
  };

  useEffect(() => {
    searchParams.get("category") || searchParams.get("brand")
      ? setQueryDetailPage({
          ...queryDetailPage,
          category: searchParams.get("category"),
          brand: searchParams.get("brand"),
        })
      : setQueryDetailPage({ ...queryDetailPage, category: "", brand: "" });

    setQueryOb(query);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      getProduct();
    }, 800);
  }, [searchParams]);

  useEffect(() => {
    category
      ? categoriesForm.find((v) => {
          if (v.category === category) {
            try {
              const getBrands = async () => {
                let data = await brandApi.getDetail(v._id);
                setBrands(data);
              };
              getBrands();
            } catch (err) {
              console.log(err);
            }
          }
        })
      : setBrands([]);
  }, [category]);

  useEffect(() => {
    setErrorMessageValidatePrice(
      newProduct.price || newProduct.price === ""
        ? validatePrice(newProduct.price)
        : ""
    );
  }, [newProduct.price]);

  return (
    <>
      <Modal
        title="Thêm Sản Phẩm"
        visible={isOpenModal}
        onCancel={() => {
          setNewProduct({});
          setIsOpenModal(false);
        }}
        footer={false}
      >
        <FormCreateProduct
          setPicProduct={setPicProduct}
          picProduct={picProduct}
          setNewProduct={setNewProduct}
          newProduct={newProduct}
          handleCreateProduct={handleCreateProduct}
          setIsOpenModal={setIsOpenModal}
          setCategory={setCategory}
          category={category}
          brands={brands}
          errorMessageValidatePrice={errorMessageValidatePrice}
          setErrorMessageValidatePrice={setErrorMessageValidatePrice}
          categoriesForm={categoriesForm}
        />
      </Modal>
      <Modal
        visible={isOpenConfirmDelete}
        onCancel={() => setIsOpenConfirmDelete(false)}
        onOk={handleDeleteProduct}
      >
        <ConfirmDeleteProduct product={productDelete} />
      </Modal>
      <SubHeader
        setIsOpenModal={setIsOpenModal}
        query={query}
        getCategoriesForm={getCategoriesForm}
      />
      <Content className="grid grid-cols-12 min-h-[500px] sm:gap-0 md:gap-6 lg:gap-5 xl:gap-10 2xl:gap-10 bg-white rounded-2xl mt-8 mb-10 sm:p-10 md:p-10 lg:p-10">
        {productData?.products?.length === 0 ? (
          <div className="col-span-12">
            <Empty className="text-gray-400 font-semibold" />
          </div>
        ) : (
          productData?.products?.map((item, index) => (
            <div
              key={index}
              className="sm:col-span-12 sm:mb-10 md:mb-0 md:col-span-6 lg:mb-0 lg:col-span-4 rounded-xl"
            >
              <BoxProduct
                queryDetailPage={queryDetailPage}
                setIsOpenConfirmDelete={setIsOpenConfirmDelete}
                setProductDelete={setProductDelete}
                product={item}
              />
            </div>
          ))
        )}
        {productData ? (
          productData?.products?.length !== 0 && (
            <div className="col-span-12 mx-auto">
              <Paginate
                totalPage={productData?.pagination?.totalPage}
                query={query}
              />
            </div>
          )
        ) : (
          <div className="col-span-12">
            <Empty className="text-gray-400 font-semibold" />
          </div>
        )}
      </Content>
    </>
  );
};

export default PageProductManage;
