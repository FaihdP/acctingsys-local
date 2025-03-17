import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import { RelationshipComponentProps } from "@ui/table/interfaces/RelationshipComponent";
import React, { ComponentType } from "react";

const withStatus = (
    Component: ComponentType<RelationshipComponentProps & { invoiceStatus: INVOICE_STATUS }>, 
    invoiceStatus: INVOICE_STATUS
  ) => {
    const WrappedComponent = (props: RelationshipComponentProps) => {
      return <Component {...props} invoiceStatus={invoiceStatus} />;
    };

    //WrappedComponent.displayName = `withStatus(${Component.displayName || Component.name || "Component"})`;

    return WrappedComponent;
  };

export default withStatus