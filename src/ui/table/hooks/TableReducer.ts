import { MutableRefObject } from "react"
import { MappedObject } from "../interfaces/Row"

export enum TableActions {
  RESET,
  ADD_ROW,
  EDIT_ROW,
  DELETE_ROW,
  CANCEL_EDIT_ROW,
  SELECT_ROW,
  SELECT_ALL_ROWS,
  CHANGE_PAGE
}

export interface TableAction {
  type: TableActions
  payload?: any
}

export interface TableDataState {
  map: Map<string, MappedObject> | null
}

export default function tableReducer(state: TableDataState, action: TableAction): TableDataState {
  switch (action.type) {
    case TableActions.RESET: {
      return {
        ...state,
        map: action.payload
      }
    }
    case TableActions.ADD_ROW: {
      if (!state.map) return {
        ...state,
        map: new Map(state.map)
      }

      return {
        map: (new Map(state.map)).set(
          "row_" + (state.map.size + 1), 
          { isEditable: true, isSelected: false, isNewRow: true }
        )
      }
    }
    case TableActions.EDIT_ROW: {
      const newMap = new Map(state.map)
      const { rowIndex, dataBackup } = action.payload
      const row = newMap.get(rowIndex)

      if (row) {
        dataBackup.current.set(rowIndex, { ...row })
        const updatedRow = { ...row, isEditable: !row.isEditable }
        newMap.set(rowIndex, updatedRow)
      }

      return {
        map: newMap
      }
      
    }
    case TableActions.DELETE_ROW: {
      const newMap = new Map(state.map)
      if (state.map) {
        state.map.forEach((row, key) => {
          if (row.isSelected) {
            newMap.delete(key)
            if (action.payload.onDelete) action.payload.onDelete(key, row)
          }
        })
      }

      return { map: newMap }
    }
    case TableActions.CANCEL_EDIT_ROW: {
      const newMap = new Map(state.map)
      const { rowIndex, newRow, dataBackup } = action.payload

      if (newRow) {
        newMap.delete(rowIndex)
      } else {
        const row = newMap.get(rowIndex)
        if (row) {
          row.isEditable = false
        }
        if (dataBackup.current) {
          const rowBackup = dataBackup.current.get(rowIndex)
          if (rowBackup) {
            newMap.set(rowIndex, rowBackup)
          }
        }
      } 
      
      return { map: newMap }
    }
    case TableActions.SELECT_ROW: {
      const newMap = new Map(state.map)
      const row = newMap.get(action.payload)

      if (row) {
        newMap.set(action.payload, { ...row, isSelected: !row.isSelected })
      }
      
      return {
        map: newMap
      }
    }
    case TableActions.SELECT_ALL_ROWS: {
      const newMap = new Map(state.map)
      newMap.forEach((value) => {
        if (value.isSelected === action.payload) return
        value.isSelected = !value.isSelected
      })

      return {
        map: newMap
      }
    }
    case TableActions.CHANGE_PAGE: {
      break
    }
  }
  return state
}