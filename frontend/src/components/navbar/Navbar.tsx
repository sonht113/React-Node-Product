import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { AxiosError } from "axios";
import { Layout, Menu } from "antd";

import type { MenuProps } from "antd";
import { useUrl } from "../../hook/useUrl";
import categoryApi from "../../api/categoryApi";
import brandApi from "../../api/brandApi";
import { Category } from "../../models/Category";
import { Brand } from "../../models/Brand";
const { Sider } = Layout;

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  let [brands, setBrands] = useState<Brand[]>([]);
  let [categories, setCategories] = useState<Category[]>([]);
  const [categorySelect, setCategorySelect] = useState<Category>({
    category: "All",
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const [filterQuery, setFilterQuery] = useState<any>();
  const location = useUrl().location;
  const query = queryString.parse(location.search);

  // Get All category
  const getCategories = () => {
    categoryApi
      .get()
      .then((res) => {
        console.log("haha");
        setCategories([{ category: "All" }, ...res]);
      })
      .catch((err: AxiosError) => console.log(err));
  };

  // Get all brands
  const getBrands = () => {
    brandApi
      .get()
      .then((res) => {
        setBrands([{ brand: "All" }, ...res]);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  // Get brands when select category
  const getBrandOfCategory = (id: string | undefined) => {
    brandApi
      .getDetail(id)
      .then((res) => {
        setBrands([{ brand: "All" }, ...res]);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };

  const items1: MenuProps["items"] = [1].map((index1) => {
    const key = String(index1 + 1);
    return {
      key: `sub${key}`,
      label: "Danh mục",

      children: categories?.map((cate: Category, index: number) => {
        const subKey = index;
        return {
          key: subKey,
          label:
            cate.category === "car"
              ? "Ô Tô"
              : cate.category === "motorcycle"
              ? "Xe Máy"
              : cate.category === "bicycle"
              ? "Xe Đạp"
              : "Tất cả",
        };
      }),
    };
  });
  const items2: MenuProps["items"] = [1].map((index1) => {
    const key = String(index1 + 1);
    return {
      key: `sub${key}`,
      label: "Hãng sản xuất",

      children: brands?.map((brandItem: Brand, index: number) => {
        const subKey = index;
        return {
          key: subKey,
          label: brandItem.brand === "All" ? "Tất cả" : brandItem.brand,
        };
      }),
    };
  });

  const handleGetCategory: MenuProps["onClick"] = (e) => {
    setCategorySelect({
      ...categorySelect,
      category: categories[parseInt(e.key)].category,
      _id:
        categories[parseInt(e.key)].category === "All"
          ? ""
          : categories[parseInt(e.key)]._id,
    });
    if (categories[parseInt(e.key)].category === "All") {
      delete query.category;
      setFilterQuery({ ...query });
    } else {
      setFilterQuery({
        ...query,
        category: categories[parseInt(e.key)].category,
        page: 1,
      });
    }
  };

  const handleGetBrand: MenuProps["onClick"] = (e) => {
    if (brands[parseInt(e.key)].brand === "All") {
      delete query.brand;
      setFilterQuery({ ...query });
    } else {
      setFilterQuery({
        ...query,
        brand: brands[parseInt(e.key)].brand,
        page: 1,
      });
    }
  };

  useEffect(() => {
    if (filterQuery) {
      setSearchParams(filterQuery);
    }
  }, [filterQuery]);

  useEffect(() => {
    getCategories();
    setFilterQuery(query ? { ...query } : {});
  }, []);

  useEffect(() => {
    categorySelect.category === "All"
      ? getBrands()
      : getBrandOfCategory(categorySelect._id);
  }, [categorySelect]);

  return (
    <Sider className="sticky top-0 left-0 site-layout-background !w-full !max-w-[100%] !min-w-0">
      {/* Category */}
      <Menu
        mode="inline"
        activeKey={
          !query.category || query.category === "null"
            ? "0"
            : `${categories.findIndex(
                (cate: Category) =>
                  cate.category === searchParams.get("category")
              )}`
        }
        defaultOpenKeys={["sub2"]}
        style={{ height: "100%" }}
        items={items1}
        className="my-10 !border-r-0 text-black"
        onClick={handleGetCategory}
      />
      {/* Brand */}
      <Menu
        mode="inline"
        activeKey={
          !query.brand || query.brand === "null"
            ? "0"
            : `${brands.findIndex(
                (br: Brand) => br.brand === searchParams.get("brand")
              )}`
        }
        defaultOpenKeys={["sub2"]}
        style={{ height: "100%" }}
        items={items2}
        className="my-10 !border-r-0"
        onClick={handleGetBrand}
      />
    </Sider>
  );
};

export default Navbar;
