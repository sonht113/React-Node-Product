import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import { ToastContainer } from "react-toastify";
import { Form, Input, Select } from "antd";

import BoxUploadImageSlide from "../../components/box-upload-image-slide/BoxUploadImageSlide";
import { ProductDocument } from "../../models/Product";
import productApi from "../../api/productApi";
import {
  validate,
  validatePrice,
  validateSpecialNumber,
} from "../../common/validate";
import { useShowAlert } from "../../hook/useShowAlert";
import useLoading from "../../hook/useLoading";
import { Category } from "../../models/Category";
import categorySchemaApi from "../../api/categoryApi";
import { Brand } from "../../models/Brand";
import brandSchemaApi from "../../api/brandApi";
import { setToast } from "../../common/toastify";
const { Option } = Select;

const PageUpdateProduct: React.FC = () => {
  const [value, setValue] = useState("");
  const [productPicPreview, setProductPicPreview] = useState<any>("");
  const [productPic, setProductPic] = useState<any>();
  const [slidePic, setSlidePic] = useState<any>([]);
  const [errorMessagePic, setErrorMessagePic] = useState<string>("");
  const [categoriesForm, setCategoriesForm] = useState<Category[]>([]);
  const [productUpdate, setProductUpdate] = useState<ProductDocument>();
  const [category, setCategory] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [errorMessageValidatePrice, setErrorMessageValidatePrice] =
    useState("");

  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const formData = new FormData();
  const alert = useShowAlert();
  const [showLoading, hideLoading] = useLoading();

  // ----- Get product--------
  const getProduct = () => {
    productApi
      .get(params?.productId)
      .then((res) => {
        if (res?.slideImage.length !== 0) {
          setSlidePic(res?.slideImage);
        }
        setCurrentCategory(res?.category);
        setCategory(res?.category);
        setProductPic(res?.avatarProduct);
        setProductUpdate(res);
        setProductPicPreview(
          `${process.env.REACT_APP_URL_LOAD_IMG}${res?.avatarProduct}`
        );
        // Set default value form
        form.setFieldsValue({
          name: res?.name,
          category: res?.category,
          brand: res?.brand,
          price: res?.price,
          description: res?.description,
          product_pic: res?.avatarProduct,
        });
      })
      .catch((err: Error) => console.log(err));
  };

  // ------- Get categories form ----------
  const getCategoriesForm = useCallback(async () => {
    try {
      const data = await categorySchemaApi.get();
      setCategoriesForm(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // ----- Update product -------
  const obUpdate = {
    name: productUpdate?.name,
    category: productUpdate?.category,
    brand: productUpdate?.brand,
    price: productUpdate?.price,
    description: productUpdate?.description,
  };

  Object.entries(obUpdate).forEach((value, index: number) => {
    formData.append(value[0], value[1]);
  });

  if (typeof productPic === "object") {
    formData.append("product_pic", productPic);
  }

  slidePic.forEach((value: any, index: number) => {
    formData.append(`slide_pic${index + 1}`, value);
  });

  const handleUpdateProduct = () => {
    showLoading();
    productApi
      .update(params?.productId, formData)
      .then((res) => {
        hideLoading();
        alert.handleOpenAlert("update", productUpdate?._id);
        getProduct();
      })
      .catch((err: any) => {
        if (err.response?.data.code === 404) {
          navigate("/not-found");
        }
        hideLoading();
      });
  };

  // Preview image decribe product
  const handleOnChangeImg = (e: any) => {
    if (e.target.files[0]) {
      setProductPicPreview(URL.createObjectURL(e.target.files[0]));
      setProductPic(e.target.files[0]);
      setErrorMessagePic("");
    } else {
      setProductPicPreview("");
      setProductPic(undefined);
    }
  };

  const handleChangePrice = (value: string | undefined) => {
    if (value) {
      setProductUpdate({ ...productUpdate, price: value });
      setErrorMessageValidatePrice(validatePrice(value));
    } else {
      setProductUpdate({ ...productUpdate, price: "" });
      setErrorMessageValidatePrice(validatePrice(value));
    }
  };

  useEffect(() => {
    getProduct();
    getCategoriesForm();
  }, [params?.productId]);

  useEffect(() => {
    // Check category value => set value in array brands to map option select
    if (!category) {
      setBrands([]);
    } else {
      category !== currentCategory && form.resetFields(["brand"]);
      categoriesForm.find((v) => {
        if (v.category === category) {
          try {
            const getBrands = async () => {
              let data = await brandSchemaApi.getDetail(v._id);
              setBrands(data);
            };
            getBrands();
          } catch (err) {
            throw new Error("Can not get brand!");
          }
        }
      });
    }
  }, [category]);

  return (
    <div className="Update-ProductPage w-[95%] mx-auto my-10 p-10 bg-white rounded-xl">
      <ToastContainer />
      <div className=" grid grid-cols-12 gap-7">
        <div className="sm:col-span-12 md:col-span-6 lg:col-span-6">
          <p className="title text-lg font-semibold mb-5">Thông tin sản phẩm</p>
          <Form layout={"vertical"} form={form} initialValues={productUpdate}>
            {/* Name */}
            <Form.Item
              className="!text-sm"
              label="Tên Sản Phẩm"
              name="name"
              rules={validate.name}
            >
              <Input
                onChange={(e) =>
                  setProductUpdate({ ...productUpdate, name: e.target.value })
                }
                placeholder="Hãy nhập tên sản phẩm..."
              />
            </Form.Item>
            {/* Category */}
            <Form.Item
              name="category"
              label="Danh mục sản phẩm"
              rules={validate.category}
            >
              <Select
                placeholder="Chọn danh mục sản phẩm"
                onChange={(value) => {
                  setProductUpdate({ ...productUpdate, category: value });
                  setCategory(value);
                }}
                allowClear
              >
                {categoriesForm?.map((category: Category, index: number) => (
                  <Option key={index} value={category?.category}>
                    {category?.category === "car"
                      ? "Ô Tô"
                      : category?.category === "motorcycle"
                      ? "Xe Máy"
                      : "Xe Đạp"}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* Brand */}
            <Form.Item
              name="brand"
              label="Hãng sản xuất"
              rules={validate.brand}
            >
              <Select
                placeholder="Chọn hãng sản xuất"
                disabled={brands.length === 0 && true}
                onChange={(value) =>
                  setProductUpdate({ ...productUpdate, brand: value })
                }
                allowClear
              >
                {brands.map((data: Brand, index: number) => (
                  <Option key={index} value={data.brand}>
                    {data.brand}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* Price */}
            <Form.Item
              className="form-price"
              label="Giá"
              rules={[
                {
                  required: true,
                  message: "Vui lòng hãy nhập giá tiền sản phẩm!",
                },
              ]}
            >
              <CurrencyInput
                className={
                  errorMessageValidatePrice === ""
                    ? "mb-3 border-[1px] pl-3 py-1 w-[100%] rounded-sm outline-none focus:outline-1 focus:border-[#40a9ff] focus:shadow-sm focus:shadow-[#1890ff33] duration-100"
                    : "border-[1px] border-[#ff7875] pl-3 py-1 w-[100%] rounded-sm outline-none focus:outline-1 focus:shadow-sm focus:shadow-[##ff4d4f33] duration-100"
                }
                value={productUpdate?.price}
                allowNegativeValue={false}
                placeholder="Hãy nhập giá tiền sản phầm..."
                onValueChange={(value: string | undefined) =>
                  handleChangePrice(value)
                }
                onKeyDown={(evt) => validateSpecialNumber(evt)}
                allowDecimals={false}
                intlConfig={{ locale: "en-US", currency: "USD" }}
              />
              {errorMessageValidatePrice && (
                <div className="mb-3 text-[#ff4d4f]">
                  {errorMessageValidatePrice}
                </div>
              )}
            </Form.Item>
            {/* Description */}
            <Form.Item
              name="description"
              label="Mô tả"
              rules={validate.description}
            >
              <Input.TextArea
                placeholder="Nhập mô tả..."
                rows={4}
                showCount
                maxLength={500}
                onChange={(e) =>
                  setProductUpdate({
                    ...productUpdate,
                    description: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Form>
        </div>
        <div className="sm:col-span-12 md:col-span-6 lg:col-span-6">
          <Form form={form} layout={"vertical"}>
            <Form.Item
              className="Upload-Product-Img"
              label="Thêm ảnh minh hoạ"
              name="image"
              rules={[
                { required: true, message: "Vui lòng hãy chọn ảnh sản phẩm!" },
              ]}
              htmlFor="product_pic"
              initialValue={value}
            >
              <input
                onChange={(e) => handleOnChangeImg(e)}
                style={{ visibility: "hidden" }}
                type="file"
                id="product_pic"
                name="product_pic"
                accept="image/*"
              />
            </Form.Item>
            {errorMessagePic !== "" ? (
              <span className="!mt-[-50px] h-[50px] text-[#ff4d4f]">
                {errorMessagePic}
              </span>
            ) : null}
            {/* Preview illustration product */}
            <div className="preview-product-img relative group flex justify-center items-center w-full h-[200px] border-2 mx-auto mb-5">
              {productPicPreview !== "" ? (
                <>
                  <img
                    className="max-w-full object-cover"
                    src={productPicPreview}
                  />
                  <div className="absolute flex flex-col gap-2 justify-center items-center top-0 left-0 w-[100%] h-[100%] bg-black opacity-70 cursor-pointer z-30 invisible group-hover:visible duration-100">
                    <label
                      htmlFor="product_pic"
                      className="px-3 py-1 text-white border-2 border-white font-medium rounded-lg hover:scale-105 duration-100"
                    >
                      Cập nhật
                    </label>
                    <span
                      onClick={(e) => {
                        setProductPicPreview("");
                        setProductPic(undefined);
                        setErrorMessagePic("Vui lòng chọn ảnh sản phẩm!");
                      }}
                      className="px-3 py-1 text-white border-2 border-white font-medium rounded-lg hover:scale-105 duration-100"
                    >
                      Xoá
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-xs text-center"> Preview Image</span>
              )}
            </div>
            {/* Slide picture product */}
            <p className="my-10">Ảnh slide</p>
            <div className="SlideImage grid grid-cols-12 gap-4">
              {slidePic?.map((img: string | null, index: number) => (
                <div key={index} className="col-span-6">
                  <span className="mb-5">Ảnh {index + 1}</span>
                  <BoxUploadImageSlide
                    img={img}
                    index={index + 1}
                    setSlidePic={setSlidePic}
                    slidePic={slidePic}
                  />
                </div>
              ))}
            </div>
          </Form>
        </div>
      </div>
      <div className="list-button flex justify-start items-center gap-12 mt-10 sm:pl-0 md:pl-0 lg:pl-10">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="hover:scale-105 duration-100"
        >
          <span className="py-2 px-14 border border-[#00CCFF] rounded-md text-[#00CCFF] cursor-pointer">
            Huỷ
          </span>
        </button>
        <button
          onClick={handleUpdateProduct}
          className="py-2 px-14 bg-[#00CCFF] rounded-md text-white cursor-pointer hover:scale-105 duration-100"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default PageUpdateProduct;
