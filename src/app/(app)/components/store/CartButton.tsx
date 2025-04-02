"use client";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

//TODO: Add items validation
export default function CartButton() {
  const [status, setStatus] = useState("idle");
  const { cartDetails, cartCount, redirectToCheckout } = useShoppingCart();

  //TODO: Move it to a custom hook, post to Orders API,
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (cartCount != null && cartCount > 0) {
      setStatus("loading");
      try {
        // Create a Checkout Session on the server
        // here I enter to the api to create a checkout session
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartDetails }),
        });

        // Now i can validate the payment response

        if (!response.ok) {
          //update order status to cancelled
          console.error("Network response was not ok");
          return;
        }

        const { sessionId } = await response.json();
        // Redirect to Checkout
        const result = await redirectToCheckout(sessionId);

        if (result?.error) {
          console.error(result);
          setStatus("redirect-error");
        }
      } catch (error) {
        console.error(error);
        setStatus("redirect-error");
      }
    } else {
      setStatus("missing-items");
    }
  }

  return (
    <>
      <span>
        Disclaimer: This shop is currently in preview. No actual billing or
        transactions will take place. Please avoid entering real personal or
        payment information.
      </span>
      <button onClick={handleClick} disabled={status === "loading"}>
        {status === "loading" ? "Loading..." : "Checkout"}
      </button>
    </>
  );
}
