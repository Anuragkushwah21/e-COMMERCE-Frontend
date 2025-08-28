import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";

function CartItems({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeCartItem(item?._id));
  };

  const handleUpdate = (num) => {
    const newQuantity = item.quantity + num;
    if (newQuantity >= 1) {
      const data = {
        data: { quantity: newQuantity },
        cartItemId: item?._id,
      };
      dispatch(updateCartItem(data));
    }
  };

  const product = item?.product;
  if (!product) return null; // Prevent crash if product is null

  const price = product.price || 0;
  const discountedPrice = product.discountedPrice || price;
  const discountPercent =
    price > discountedPrice
      ? Math.round(((price - discountedPrice) / price) * 100)
      : 0;

  const totalPrice = discountedPrice * item.quantity;

  return (
    <div className="p-5 shadow-lg border rounded-md m-1">
      <div className="flex items-center gap-4">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top rounded-md"
            src={product.imageUrl || "/placeholder.jpg"}
            alt={product.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.jpg";
            }}
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{product.title}</p>
          <p className="opacity-70">Size: {item.size}</p>
          <p className="opacity-70 mt-2">Seller: {product.brand}</p>

          <div className="flex space-x-5 items-center text-gray-900 pt-6">
            <p className="font-semibold">₹{discountedPrice}</p>
            {discountedPrice < price && (
              <>
                <p className="opacity-50 line-through">₹{price}</p>
                <p className="text-green-600 font-semibold">
                  {discountPercent}% Off
                </p>
              </>
            )}
          </div>

          <p className="pt-2 font-medium">Total: ₹{totalPrice}</p>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4 justify-between">
        <div className="flex items-center space-x-2">
          <IconButton
            title="Decrease Quantity"
            onClick={() => handleUpdate(-1)}
            sx={{ color: "#800080" }}
            disabled={item.quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-5 border rounded-sm">{item.quantity}</span>
          <IconButton
            title="Increase Quantity"
            onClick={() => handleUpdate(1)}
            sx={{ color: "#800080" }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <div>
          <Button type="button" onClick={handleRemove} color="error">
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
