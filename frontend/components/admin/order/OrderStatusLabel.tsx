import { useMemo } from "react";

const OrderStatusLabel = ({ status }) => {
  const variant = useMemo(() => {
    switch (status) {
      case "AWAITING_PAYMENT":
        return "info";
      case "PAID":
        return "danger";
      case "SHIPPED":
        return "warning";
      case "COMPLETED":
        return "success";
    }
  }, []);

  const label = useMemo(() => {
    switch (status) {
      case "AWAITING_PAYMENT":
        return "Awaiting Payment";
      case "PAID":
        return "Paid";
      case "SHIPPED":
        return "Shipped";
      case "COMPLETED":
        return "Completed";
    }
  }, []);

  return (
    <>
      <i className={`fa fa-circle mr-2 text-${variant}`} />
      {label}
    </>
  );
};

export default OrderStatusLabel;
