/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  key: keyof T | string;
  label: string;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  caption?: string;
  footer?: string;
  actions?: (row: T) => React.ReactNode;
}

export function TableList<T extends Record<string, unknown>>({
  data = [],
  columns,
  caption,
  footer,
  actions,
}: DataTableProps<T>) {
  console.log("Check Data", data);
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.key as string} className={col.className}>
              {col.label}
            </TableHead>
          ))}
          {actions && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col) => (
              <TableCell key={col.key as string} className={col.className}>
                {col.key === "createdAt" ||
                col.key === "booking.startDate" ||
                col.key === "booking.endDate"
                  ? formatDate(getNestedValue(row, col.key) as string) // Format ngày tháng
                  : col.key === "amount"
                  ? formatUSD(getNestedValue(row, col.key) as string) // Format USD
                  : getNestedValue(row, String(col.key))}
              </TableCell>
            ))}
            {actions && (
              <TableCell className="text-right">{actions(row)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      {footer && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length - 1}>Total</TableCell>
            <TableCell className="text-right">{footer}</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
function getNestedValue(obj: Record<string, any>, key: string | number): any {
  if (typeof key === "number") return obj[key]; // Nếu key là số, lấy trực tiếp
  if (typeof key !== "string") return "N/A"; // Không hỗ trợ symbol

  return key.split(".").reduce((acc, part) => acc && acc[part], obj) ?? "N/A";
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(dateString));
}
const formatUSD = (amount: string | number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount));
};
