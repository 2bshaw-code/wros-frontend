import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Edit, Plus } from "lucide-react";
import axiosClient from "../api/axiosClient";
import Loading from "../components/Loading.tsx";
import InventoryFilters, {
  InventoryFiltersState,
} from "../components/InventoryFilters.tsx";
import StockAdjustmentModal from "../components/StockAdjustmentModal.tsx";
import { Header } from "./Orders.tsx";
import { getErrorMessage } from "../utils/helpers";
type Product = {
  _id?: string;
  id?: string;
  name: string;
  sku?: string;
  category?: string;
  supplier?: string;
  price: number;
  stock: number;
};
const defaults: InventoryFiltersState = {
  search: "",
  category: "",
  supplier: "",
  stockMin: "",
  stockMax: "",
  priceMin: "",
  priceMax: "",
};
export default function Inventory() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<Product[]>([]);
  const [adjusting, setAdjusting] = useState<Product | null>(null);
  const [filters, setFilters] = useState<InventoryFiltersState>({
    ...defaults,
    ...Object.fromEntries(
      Object.keys(defaults).map((key) => [key, params.get(key) || ""]),
    ),
  } as InventoryFiltersState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = () => {
    setLoading(true);
    const query = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value),
    );
    setParams(query, { replace: true });
    axiosClient
      .get<{ data: Product[] }>("/products", { params: query })
      .then((r) => setItems(r.data.data))
      .catch((e) => setError(getErrorMessage(e, "Unable to load inventory")))
      .finally(() => setLoading(false));
  };
  useEffect(load, [filters, setParams]);
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Header
          eyebrow="Operations"
          title="Inventory"
          description="Search, filter, and maintain product stock records."
        />
        <Link
          to="/console/merchant/inventory/add"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0FA958] px-4 py-2.5 font-semibold text-white"
        >
          <Plus size={18} />
          Add Inventory Item
        </Link>
      </div>
      <InventoryFilters value={filters} onChange={setFilters} />
      <div className="overflow-hidden rounded-xl border border-[#EDEDED] bg-white dark:border-[#263238] dark:bg-[#202C33]">
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="p-5 text-sm text-red-600">{error}</p>
        ) : (
          <div className="divide-y divide-[#EDEDED] dark:divide-[#263238]">
            {items.map((item) => (
              <div
                key={item._id || item.id || item.sku}
                className="grid gap-3 p-5 sm:grid-cols-[1fr_auto_auto_auto_auto] sm:items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.sku || "No SKU"} · {item.supplier || "No supplier"}
                  </p>
                </div>
                <span>GBP {Number(item.price).toFixed(2)}</span>
                <span
                  className={
                    item.stock <= 5 ? "font-semibold text-amber-600" : ""
                  }
                >
                  {item.stock} in stock
                </span>
                <button
                  type="button"
                  onClick={() => setAdjusting(item)}
                  className="rounded-lg border px-3 py-2 text-sm"
                >
                  Adjust Stock
                </button>
                <Link
                  to={`/console/merchant/inventory/${item._id || item.id}/edit`}
                  aria-label={`Edit ${item.name}`}
                  className="inline-flex w-fit rounded-lg p-2 text-[#0FA958]"
                >
                  <Edit size={17} />
                </Link>
              </div>
            ))}
            {items.length === 0 && (
              <p className="p-5 text-sm text-gray-500">
                No inventory records found.
              </p>
            )}
          </div>
        )}
      </div>
      {adjusting && (
        <StockAdjustmentModal
          productId={adjusting._id || adjusting.id || ""}
          name={adjusting.name}
          onClose={() => setAdjusting(null)}
          onSaved={load}
        />
      )}
    </section>
  );
}
