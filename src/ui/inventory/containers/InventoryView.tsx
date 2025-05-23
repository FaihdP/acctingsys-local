import InputSearchTable from "@ui/core/components/InputSearchTable";
import DynamicTable from "@ui/table/containers/DynamicTable";
import useInventoryTable from "../hooks/useInventoryTable";
import DeleteProductPopup from "../components/DeleteProductPopup";

export default function InventoryView() {
  const { 
      products,
      productsFilter,
      setProductsFilter,
      pageSelected, 
      setPageSelected, 
      pagesNumber,
      inventoryTableConfig,
      totalRecords,
      isVisibleDeleteProductPopup,
      setIsVisibleDeleteProductPopup
    } = useInventoryTable()

  return (<>
    <DeleteProductPopup 
      isVisible={isVisibleDeleteProductPopup}
      onChangeIsVisible={setIsVisibleDeleteProductPopup}
      documentsToDelete={["xd"]}
      handleDeleteDocument={async (documentsToDelete: string[], userId: string) => {}}
    /> 
    <InputSearchTable
      data={products}
      filter={productsFilter}
      onChange={(e) => setProductsFilter(e.target.value)}
      totalRecords={totalRecords.current}
    />
    <DynamicTable 
      config={inventoryTableConfig}
      initialData={products} 
      pageSelected={pageSelected} 
      pagesNumber={pagesNumber}   
      setPageSelected={setPageSelected}   
    />
  </>)  
}