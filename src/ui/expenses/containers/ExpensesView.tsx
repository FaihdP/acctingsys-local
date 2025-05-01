import InputSearchTable from "@ui/core/components/InputSearchTable"
import DynamicTable from "@ui/table/containers/DynamicTable"
import useExpensesTable from "../hooks/useExpensesTable"

export default function ExpensesView() {
  const { 
    expenses, 
    expensesFilter, 
    setExpensesFilter, 
    pageSelected, 
    setPageSelected, 
    pagesNumber,
    expensesTableConfig,
    totalRecords
  } = useExpensesTable()
  
  return (<>
    <InputSearchTable 
      data={expenses}
      filter={expensesFilter}
      onChange={(e) => setExpensesFilter(e.target.value)}
      totalRecords={totalRecords.current}
    />
    <DynamicTable 
      config={expensesTableConfig}
      initialData={expenses} 
      pageSelected={pageSelected} 
      pagesNumber={pagesNumber}   
      setPageSelected={setPageSelected}   
    />
  </>)
}
