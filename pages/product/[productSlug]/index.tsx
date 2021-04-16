import { useRouter } from "next/router";

const ProductPage = () => {
  const { query } = useRouter();

  return <p>Product Page {query.productSlug}</p>;
};

export default ProductPage;
