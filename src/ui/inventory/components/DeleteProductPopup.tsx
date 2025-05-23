import DeletePopup from "@ui/core/components/DeletePopup"
import { Dispatch, SetStateAction } from "react"

interface DeleteProductPopupProps {
  isVisible: boolean
  onChangeIsVisible: Dispatch<SetStateAction<boolean>>
  documentsToDelete: string[]
  handleDeleteDocument: (documentsToDelete: string[], userId: string) => Promise<void>
}

export default function DeleteProductPopup({
  isVisible,
  onChangeIsVisible,
  documentsToDelete,
  handleDeleteDocument,
}: DeleteProductPopupProps) {
  if (!isVisible) return null
  return (
    <DeletePopup
      onChangeIsVisible={onChangeIsVisible}
      documentsToDelete={documentsToDelete}
      handleDeleteDocument={handleDeleteDocument}
      texts={{
        documentName: "producto",
        principal: "producto",
        secondary: "El producto ya no podra agregarse a ninguna factura."
      }}
    />
  )
}