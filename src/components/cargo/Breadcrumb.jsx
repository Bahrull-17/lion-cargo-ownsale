import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// items: [{ label, to }], item terakhir = halaman aktif (tanpa `to`).
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
        {items.map(({ label, to }) =>
          to ? (
            <li key={label} className="flex items-center gap-1">
              <Link to={to} className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                {label}
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
            </li>
          ) : (
            <li key={label} aria-current="page" className="font-semibold text-slate-700 dark:text-slate-300">
              {label}
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
