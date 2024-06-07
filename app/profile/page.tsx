import { db } from "@/db/db";
import { stripeCustomers } from "@/db/schema";
import { SignIn, SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) return notFound();

  const [stripeUser] = await db
    .select()
    .from(stripeCustomers)
    .where(eq(stripeCustomers.userId, userId));

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row text-black justify-between items-center">
        <h1 className="text-black">
          Welcome {user.fullName || user.emailAddresses[0].emailAddress}
        </h1>
        <button className="btn btn-secondary my-3 btn-sm">
          <SignOutButton />
        </button>
      </div>
      <div>
        {stripeUser ? (
          <div>
            <p>This data lives in stripe_customers in supabase</p>
            <div>{JSON.stringify(stripeUser, null, 2)}</div>
          </div>
        ) : (
          <div>
            <h1 className="text-black">Go buy something</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
