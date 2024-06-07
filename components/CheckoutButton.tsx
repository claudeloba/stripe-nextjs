"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const CheckoutButton = () => {
  const { user } = useUser();
  if (!user?.id) return <SignInButton />;

  const handleCheckout = async () => {
    try {
      const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
      );
      const stripe = await stripePromise;

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_1PP9luKdDkqhHkXMiHk0E3D7",
          userId: user.id,
          email: user.emailAddresses[0].emailAddress,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session = await response.json();

      if (!session.id) {
        throw new Error("Session ID not found in response");
      }

      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <button className="btn" onClick={handleCheckout}>
      Buy now
    </button>
  );
};

export default CheckoutButton;
