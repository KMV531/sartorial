"use client";

import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { MY_ORDERS_QUERYResult } from "../../sanity.types";

type Props = {
  orders: MY_ORDERS_QUERYResult;
};

const OrdersComponent = ({ orders }: Props) => {
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);

  const handleOrderClicked = (order: MY_ORDERS_QUERYResult[number]) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order._id}>
              <TooltipTrigger asChild>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100 h-12"
                  onClick={() => handleOrderClicked(order)}
                >
                  <TableCell className="font-medium">
                    {order.resourceId
                      ? `${order.resourceId.slice(-10)}...`
                      : "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order._createdAt &&
                      new Date(order._createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.customer?.name ?? "N/A"}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.customer?.email ?? "N/A"}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-black">
                      {order.amount ?? "N/A"}
                    </p>
                  </TableCell>
                  <TableCell>
                    {order.status && (
                      <span
                        className={`capitalize px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          order.status === "paid"
                            ? "bg-green-100 text-green-600"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>

      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;

/* 
"use client";

import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { MY_ORDERS_QUERYResult } from "../../sanity.types";

const OrdersComponent = ({ orders }: { orders: MY_ORDERS_QUERYResult }) => {
  const [selectedOrder, setSelectedOrder] = useState<
    MY_ORDERS_QUERYResult[number] | null
  >(null);
  const handleOrderClicked = (order: MY_ORDERS_QUERYResult[number]) => {
    setSelectedOrder(order);
  };
  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order?.resourceId}>
              <TooltipTrigger asChild>
                <TableRow
                  className="cursor-pointer hover:bg-gray-100 h-12"
                  onClick={() => handleOrderClicked(order)}
                >
                  <TableCell className="font-medium">
                    {order?.resourceId?.slice(-10) ?? "N/A"}...
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?._createdAt &&
                      new Date(order?._createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order?.customer?.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order?.customer?.email}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-black">{order.totalPrice}</p>
                  </TableCell>
                  <TableCell>
                    {order?.status && (
                      <span
                        className={`capitalize px-2 py-1 rounded-full text-xs font-semibold 
                        ${order?.status === "paid" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {order?.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailsDialog
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
};

export default OrdersComponent;

*/
