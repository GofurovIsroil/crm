export interface IOrder {
  id: number;
  title: string; // Убедитесь, что такие поля существуют в IOrder
  price: number;
  category: string;
  date?: string;
  customerName?: string;
  status?: string;
}

export interface IOrderFilterProps {
  onFilter: (filters: IOrderFilterValues) => void;
}

export interface IOrderFilterValues {
  category: string;
  title: string;
  status: string;
}

export interface IDataTableProps<T> {
  columns: Array<{ label: string; id: keyof T }>;
  data: T[];
  onSort: (property: keyof T) => void;
  order: "asc" | "desc";
  orderBy: keyof T;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IFormValues {
  username: string;
  password: string;
}
