import OrderConfirmationContent from "@/components/order-sections/OrderConfirmationContent";

export default async function OrderConfirmationPage({ params }) {
  const { id } = await params;

  return <OrderConfirmationContent orderId={id} />;
}
