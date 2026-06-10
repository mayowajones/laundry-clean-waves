import { useMemo } from "react";
import { useApp } from "../context/AppContext";

export function useOrders(userId) {
  const { orders, addOrder, updateOrderStatus } = useApp();

  const userOrders = useMemo(
    () => orders.filter((order) => !userId || order.userId === userId),
    [orders, userId],
  );

  return { orders, userOrders, addOrder, updateOrderStatus };
}
