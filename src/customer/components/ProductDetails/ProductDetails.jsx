import { useEffect, useState } from "react";
import { Button, LinearProgress, Rating } from "@mui/material";
import { RadioGroup } from "@headlessui/react";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
// import { mensKurta } from "../../../Data/mens_kurta";
import { product } from "../../../config/productData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../../State/Cart/Action";
import { findProductById } from "../../../State/Product/Action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(null);
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  // console.log("param", productId,products)

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  useEffect(() => {
    if (productId && jwt) {
      dispatch(findProductById({ productId, jwt }));
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const data = {
      productId,
      size: selectedSize,
    };

    dispatch(addItemToCart({ data, jwt }));
    navigate("/cart");
  };

  if (!product) return null;

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 20"
                    className="h-5 w-4 text-gray-300"
                    aria-hidden="true"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          <div className="flex flex-col items-center ">
            <div className=" overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={activeImage?.src || products.product?.imageUrl}
                // src={products.imageUrl [0].src}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleSetActiveImage(image)}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
                >
                  <img
                    src={image.src}
                    alt={product.images.alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900  ">
                {products.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1  ">
                {products.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold">
                  ₹{products.product?.discountedPrice}
                  {/* ₹500 */}
                </p>
                <p className="opacity-50 line-through">
                  ₹{products.product?.price}
                  {/* ₹3000 */}
                </p>
                <p className="text-green-600 font-semibold">
                  {products.product?.discountPercent}% Off
                  {/* 10% Off */}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>

                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={4.6}
                    precision={0.5}
                    readOnly
                  />

                  <p className="opacity-60 text-sm">42807 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    3878 reviews
                  </p>
                </div>
              </div>

              <form className="mt-10" onSubmit={handleSubmit}>
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10 mt-4">
                    {product?.sizes?.map((size) => (
                      <label
                        key={size.name}
                        className={`relative flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase ${
                          size.inStock
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm hover:bg-gray-50"
                            : "cursor-not-allowed bg-gray-50 text-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size.name}
                          checked={selectedSize === size.name}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          disabled={!size.inStock}
                          className="sr-only"
                        />
                        {size.name}
                        {selectedSize === size.name && (
                          <span className="absolute -inset-px rounded-md border-2 border-indigo-500 pointer-events-none" />
                        )}
                        {!size.inStock && (
                          <span
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            aria-hidden="true"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1={0}
                                y1={100}
                                x2={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-md mt-8"
                >
                  Add To Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {products.product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* rating and review section */}
        <section className="px-4 sm:px-6 lg:px-0">
          <h1 className="font-semibold text-lg pb-4">
            Recent Review & Ratings
          </h1>

          <div className="border rounded-lg p-4 sm:p-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-7">
              {/* Left Review Section */}
              <div className="lg:col-span-7">
                <div className="space-y-5">
                  {[1, 2, 3].map((item, index) => (
                    <ProductReviewCard key={index} item={item} />
                  ))}
                </div>
              </div>

              {/* Right Rating Section */}
              <div className="lg:col-span-5">
                <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>

                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <Rating value={4.6} precision={0.5} readOnly />
                  <p className="opacity-60 text-sm sm:text-base">
                    42,807 Ratings
                  </p>
                </div>

                {/* Rating Bars */}
                <div className="space-y-4">
                  {product.ratings.map((rating, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 items-center gap-2"
                    >
                      <div className="col-span-3 sm:col-span-2">
                        <p className="text-xs sm:text-sm">{rating.label}</p>
                      </div>
                      <div className="col-span-6 sm:col-span-7">
                        <LinearProgress
                          variant="determinate"
                          value={rating.value}
                          color={rating.color}
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                        />
                      </div>
                      <div className="col-span-3">
                        <p className="opacity-50 text-xs sm:text-sm text-right">
                          {rating.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* similar product */}
        <section className=" px-4 sm:px-6 lg:px-0">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>
          <div className="flex flex-wrap space-y-5 justify-center border rounded-lg p-4 sm:p-5 m-2">
            {products?.products?.content?.map((item) => (
              <HomeSectionCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
