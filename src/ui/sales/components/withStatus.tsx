import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import { SelectComponentProps } from "@ui/table/interfaces/SelectComponent";
import React, { ComponentType } from "react";

const withStatus = (
  Component: ComponentType<SelectComponentProps & { invoiceStatus: INVOICE_STATUS }>, 
  invoiceStatus: INVOICE_STATUS
) => {
  const WrappedComponent = 
    (props: SelectComponentProps) => 
      <Component 
        {...props} 
        invoiceStatus={invoiceStatus} 
      />

  return WrappedComponent;
};

export default withStatus