import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/products/${id}`, fetcher);

  if (!data) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <h1>Product Details By id</h1>
      <h3>{data.name}</h3>
      <p>{data.description}</p>

      {/* Display other product details */}
    </div>
  );
}
