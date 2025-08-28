"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
// import { mensKurta } from "../../../Data/mens_kurta";
import ProductCart from "./ProductCart";
import { filters, singleFilter } from "./FilterData";
import {
  FormControl,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../State/Product/Action";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  // console.log(product)

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);

  const colorValue = searchParams.get("color"); // e.g., "red,blue"
  const sizeValue = searchParams.get("size"); // e.g., "S,M"
  const price = searchParams.get("price"); // e.g., "100-500"
  const discount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = parseInt(searchParams.get("page")) || 1;
  const stock = searchParams.get("stock");

  useEffect(() => {
    const [minPrice, maxPrice] =
      price === null ? [0, 0] : price.split("-").map(Number);

    const data = {
      colors: colorValue ? colorValue : undefined,
      sizes: sizeValue ? sizeValue : undefined,
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 10000,
      minDiscount: discount ? Number(discount) : 0,
      category: param.levelThree,
      stock: stock ? stock : undefined,
      sort: sortValue ? sortValue : "price_low",
      pageNumber: pageNumber,
      pageSize: 10,
    };

    dispatch(findProducts(data));
  }, [
    colorValue,
    sizeValue,
    price,
    discount,
    param.levelThree,
    sortValue,
    stock,
    pageNumber,
  ]);

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue =
      searchParams.get(sectionId)?.split(",").filter(Boolean) || [];

    if (filterValue.includes(value)) {
      // Remove the value if it exists
      filterValue = filterValue.filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      } else {
        searchParams.set(sectionId, filterValue.join(","));
      }
    } else {
      filterValue.push(value);
      searchParams.set(sectionId, filterValue.join(","));
    }

    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handlePagination = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
            <div className="fixed inset-0 flex z-50">
              <DialogPanel className="ml-auto w-full max-w-xs bg-white p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Filters */}
                <form>
                  {filters.map((section) => (
                    <Disclosure key={section.id} className="border-b py-4">
                      {({ open }) => (
                        <>
                          <DisclosureButton className="flex w-full justify-between text-gray-900 font-medium">
                            {section.name}
                            {open ? (
                              <MinusIcon className="h-5 w-5" />
                            ) : (
                              <PlusIcon className="h-5 w-5" />
                            )}
                          </DisclosureButton>

                          <DisclosurePanel className="mt-2 space-y-2">
                            {section.options.map((option, idx) => (
                              <div key={idx} className="flex items-center">
                                <input
                                  id={`mobile-${section.id}-${idx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  value={option.value}
                                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                  onChange={() =>
                                    handleFilter(option.value, section.id)
                                  }
                                />
                                <label
                                  htmlFor={`mobile-${section.id}-${idx}`}
                                  className="ml-2 text-gray-600 text-sm"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}

                  {singleFilter.map((section) => (
                    <Disclosure key={section.id} className="border-b py-4">
                      {({ open }) => (
                        <>
                          <DisclosureButton className="flex w-full justify-between text-gray-900 font-medium">
                            {section.name}
                            {open ? (
                              <MinusIcon className="h-5 w-5" />
                            ) : (
                              <PlusIcon className="h-5 w-5" />
                            )}
                          </DisclosureButton>

                          <DisclosurePanel className="mt-2">
                            <FormControl>
                              <RadioGroup
                                defaultValue=""
                                name="mobile-radio-group"
                              >
                                {section.options.map((option, idx) => (
                                  <FormControlLabel
                                    key={idx}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                    onChange={(e) =>
                                      handleRadioFilterChange(e, section.id)
                                    }
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                {/* Filters */}

                <form className="hidden lg:block">
                  <div className="py-10 flex justify-between items-center">
                    <h2 className=" font-bold opacity-60 text-lg">Filters</h2>
                    <FilterListIcon />
                  </div>
                  {filters.map((section) => (
                    <Disclosure
                      defaultOpen={false}
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={() =>
                                      handleFilter(option.value, section.id)
                                    }
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  {singleFilter.map((section) => (
                    <Disclosure
                      defaultOpen={true}
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <FormControl>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                              >
                                {section.options.map((option, optionIdx) => (
                                  <FormControlLabel
                                    key={optionIdx} // ✅ Add this line
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                    onChange={(e) =>
                                      handleRadioFilterChange(e, section.id)
                                    }
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-4 w-full">
                  <div className="flex flex-wrap justify-center bg-white py-5">
                    {products?.products?.content?.map((item) => (
                      <ProductCart key={item.id} product={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px=[3.6rem]">
            <div className="px-4 py-5 flex justify-center">
              <Pagination
                count={products?.products?.totalPages || 1}
                page={pageNumber}
                color="secondary"
                onChange={handlePagination}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
