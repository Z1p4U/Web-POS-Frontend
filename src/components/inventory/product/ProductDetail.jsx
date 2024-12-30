import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  return (
    <div>
      <div>ProductDetail of product id {productId}</div>
    </div>
  );
};

export default ProductDetail;
