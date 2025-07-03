import { currentUser } from "@clerk/nextjs/server";
import { getMyOrders } from "@/sanity/helpers";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const user = await currentUser();

  // Clean user data to plain object with juste ce dont tu as besoin
  const safeUser = user
    ? {
        id: user.id,
      }
    : null;

  let orders = [];
  if (user?.id) {
    orders = await getMyOrders(user.id);
  }

  return <HeaderClient user={safeUser} orders={orders} />;
};

export default Header;
