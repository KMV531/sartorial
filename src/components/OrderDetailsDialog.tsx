import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MY_ORDERS_QUERYResult } from "../../sanity.types";

interface Props {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details - {order.resourceId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 mb-4">
          <p>
            <strong>Customer:</strong> {order?.customer?.name}
          </p>
          <p>
            <strong>Email:</strong> {order?.customer?.email}
          </p>
          <p>
            <strong>Address:</strong> {order?.customer?.address}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order?.createdAt && new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {order?.status}
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Color</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.items?.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {product.productImage && (
                    <Image
                      src={urlFor(product.productImage).url()}
                      alt={product.name || "Product Image"}
                      width={50}
                      height={50}
                      className="border rounded-sm"
                    />
                  )}
                  <p>{product.name ? `${product.name.slice(25)}...` : "N/A"}</p>
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                <TableCell className="text-black font-medium">
                  {product.price}
                </TableCell>
                <TableCell>{product?.size || "—"}</TableCell>
                <TableCell>{product?.color?.name || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 text-right flex items-center justify-end space-x-3">
          <strong>Total:</strong>
          <p className="text-black font-bold">{order?.amount}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
