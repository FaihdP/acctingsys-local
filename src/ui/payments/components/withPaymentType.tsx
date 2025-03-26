import { PAYMENT_TYPE } from "@lib/db/schemas/payment/Payment";
import { SelectComponentProps } from "@ui/table/interfaces/SelectComponent";
import React, { ComponentType } from "react";

const withPaymentType = (
  Component: ComponentType<SelectComponentProps & { paymentType: PAYMENT_TYPE }>, 
  paymentType: PAYMENT_TYPE,
) => {
  const WrappedComponent = 
    (props: SelectComponentProps) => 
      <Component 
        {...props} 
        paymentType={paymentType}
      />

  return WrappedComponent
}

export default withPaymentType