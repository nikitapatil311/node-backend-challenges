import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import Comments from "../Comments";
import { mutate } from "swr";
import { useState } from "react";
import ProductForm from "../ProductForm";
//import { StyledButton } from "../Button/Button.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(id ? `/api/products/${id}` : null);
  const { isEditMode, setIsEditMode } = useState(false);
  async function handleEditProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (response.ok) {
      mutate();
    }
  }

  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      response.json();
      router.push("/");
    } else {
      console.error(response.status);
    }
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>

      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
      <StyledLink href="/">Back to all</StyledLink>
      <button
        type="button"
        onClick={() => {
          handleEditProduct;
          // setIsEditMode(!isEditMode);
        }}
      >
        Toggle Edit
      </button>
      {isEditMode && <ProductForm onSubmit={onSubmit} />}
      <button type="button" onClick={() => handleDeleteProduct(id)}>
        Delete
      </button>
    </ProductCard>
  );
}
