import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AllProducts() {
  const { data } = useSWR(`/api/products/`, fetcher);
  return (
    <div>
      <h1>Product List</h1>

      <ul>
        {data &&
          data.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
