import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe";

export const POST = async (request: Request) => {
  try {
    const { userId, priceId, email } = await request.json();

    const session = await stripe.checkout.sessions.create({
      metadata: {
        user_id: userId,
      },
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
        },
      ],
      mode: "subscription",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
