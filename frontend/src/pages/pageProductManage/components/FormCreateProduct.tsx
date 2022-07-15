import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import CurrencyInput from "react-currency-input-field";

import { ProductDocument } from "../../../models/Product";
import { validate, validateSpecialNumber } from "../../../common/validate";
import { Category } from "../../../models/Category";
import { Brand } from "../../../models/Brand";

const { Option } = Select;

interface FormCreateProductProps {
  newProduct: ProductDocument;
  setNewProduct: any;
  setPicProduct: any;
  handleCreateProduct: any;
  setIsOpenModal: (value: boolean) => void;
  picProduct: any;
  setCategory: (value: string) => void;
  brands: Brand[];
  errorMessageValidatePrice: string;
  setErrorMessageValidatePrice: (value: string) => void;
  categoriesForm: Category[];
  category: string;
}

const FormCreateProduct: React.FC<FormCreateProductProps> = ({
  newProduct,
  setNewProduct,
  setPicProduct,
  handleCreateProduct,
  setIsOpenModal,
  setCategory,
  brands,
  errorMessageValidatePrice,
  setErrorMessageValidatePrice,
  categoriesForm,
  category,
}) => {
  const [value, setValue] = useState("");
  const [price, setPrice] = useState<string>();
  const [productPicPreview, setProductPicPreview] = useState<any>("");

  const [form] = Form.useForm();

  // Set File
  const handleOnChangeImg = (e: any) => {
    if (e.target.files[0]) {
      setPicProduct(e.target.files[0]);
      setProductPicPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Set value price
  const handleChangePrice = (value: string | undefined) => {
    if (value) {
      setNewProduct({ ...newProduct, price: value });
      setPrice(value);
    } else {
      setNewProduct({ ...newProduct, price: "" });
      setPrice("");
    }
  };

  useEffect(() => {
    form.resetFields(["brand"]);
  }, [category]);

  return (
    <Form
      className="px-5 h-[500px] overflow-y-auto overflow-x-hidden"
      layout={"vertical"}
      form={form}
    >
      <Form.Item
        className="!text-sm"
        label="Tên Sản Phẩm"
        name="name"
        rules={validate.name}
      >
        <Input
          name="name"
          id="name"
          placeholder="Hãy nhập tên sản phẩm..."
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item
        name="category"
        label="Danh mục sản phẩm"
        rules={validate.category}
      >
        <Select
          placeholder="Chọn danh mục sản phẩm"
          allowClear
          loading={newProduct.category ? false : true}
          id="category"
          value={newProduct.category}
          onChange={(value) => {
            setNewProduct({ ...newProduct, category: value });
            setCategory(value);
          }}
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
      <Form.Item name="brand" label="Hãng sản xuất" rules={validate.brand}>
        <Select
          loading={newProduct.brand ? false : true}
          placeholder="Chọn hãng sản xuất"
          allowClear
          disabled={brands.length === 0 && true}
          value={newProduct.brand}
          onChange={(value) => {
            setNewProduct({ ...newProduct, brand: value });
          }}
        >
          {brands?.map((data: Brand, index: number) => (
            <Option key={index} value={data.brand}>
              {data.brand}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        className="form-price h-[100px]"
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
              ? "border-[1px] pl-3 py-1 w-[100%] rounded-sm outline-none focus:outline-1 focus:border-[#40a9ff] focus:shadow-sm focus:shadow-[#1890ff33] duration-100"
              : "border-[1px] border-[#ff7875] pl-3 py-1 w-[100%] rounded-sm outline-none focus:outline-1 focus:shadow-sm focus:shadow-[##ff4d4f33] duration-100"
          }
          value={price}
          allowNegativeValue={false}
          placeholder="Hãy nhập giá tiền sản phầm..."
          onValueChange={(value: string | undefined) =>
            handleChangePrice(value)
          }
          onKeyDown={(evt) => {
            validateSpecialNumber(evt);
          }}
          allowDecimals={false}
          intlConfig={{ locale: "en-US", currency: "USD" }}
        />
        {errorMessageValidatePrice && (
          <div className="text-[#ff4d4f]">{errorMessageValidatePrice}</div>
        )}
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input.TextArea
          placeholder="Nhập mô tả..."
          rows={4}
          showCount
          value={newProduct.description}
          maxLength={500}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item
        className="Upload-Product-Img"
        label="Thêm ảnh minh hoạ"
        name="image"
        rules={[{ required: true, message: "Vui lòng hãy chọn ảnh sản phẩm!" }]}
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
      <div className="preview-product-img group relative flex justify-center items-center w-[250px] h-[180px] border-2 mx-auto mb-5">
        {productPicPreview ? (
          <>
            <img
              className="max-w-[100%] h-[100px] object-cover"
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
                  setPicProduct(undefined);
                  setProductPicPreview("");
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
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setNewProduct({});
            setProductPicPreview("");
            setPrice("");
            setErrorMessageValidatePrice("");
            form.resetFields();
            setIsOpenModal(false);
          }}
          type="primary"
        >
          Huỷ
        </Button>
        <Button
          onClick={() => {
            if (!newProduct.price) {
              return setErrorMessageValidatePrice(
                "Vui lòng hãy nhập giá tiền sản phẩm!"
              );
            }
            handleCreateProduct();
            setPrice("");
            setErrorMessageValidatePrice("");
            setProductPicPreview("");
            form.resetFields();
          }}
          type="primary"
          htmlType={
            !newProduct.name ||
            !newProduct.category ||
            !newProduct.brand ||
            !newProduct.price
              ? "submit"
              : "button"
          }
        >
          Thêm
        </Button>
      </div>
    </Form>
  );
};

export default FormCreateProduct;
