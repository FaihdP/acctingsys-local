import InputSearchTable from "@ui/core/components/InputSearchTable";
import DynamicTable from "@ui/table/containers/DynamicTable";
import useInventoryTable from "../hooks/useInventoryTable";

export default function InventoryView() {
  const { 
      products,
      productsFilter,
      setProductsFilter,
      pageSelected, 
      setPageSelected, 
      pagesNumber,
      inventoryTableConfig,
      totalRecords
    } = useInventoryTable()

  return (<>
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