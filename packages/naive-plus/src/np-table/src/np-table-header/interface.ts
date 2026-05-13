import type { TableColumn } from '../interface'

export type { TableColumn }

export interface TableHeaderColumn extends TableColumn {
  display?: boolean
}

export interface NpTableHeaderColumn {
  display: boolean
}
