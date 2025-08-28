import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
function ProductCart({product}) {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/product/${product?._id}`)} className="productCard w-[15rem] h-[22rem] m-3 bg-white shadow-md transition-transform duration-300 cursor-pointer hover:shadow-lg">
      <div className="h-2/3">
        <img
          className="h-full w-full object-cover object-top"
          src={product.imageUrl}
          alt="Product"
        />
      </div>
      <div className="textPart p-3 h-1/3 flex flex-col justify-between">
        <div>
          <p className="font-bold opacity-70 text-sm">{product.brand}</p>
          <p className="text-sm">{product.title}</p>
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <p className="font-semibold">₹{product.discountedPrice}</p>
          <p className="line-through opacity-50">₹{product.price}</p>
          <p className="text-green-600 font-semibold">{product.discountPercent}%off</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
