import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { DataPanel, Header } from "./Orders.tsx";
import { getErrorMessage } from "../utils/helpers";
import FilterBar from "../components/FilterBar.tsx";
type Product = {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category?: string;
};
export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: params.get("search") || "",
    category: params.get("category") || "",
  });
  useEffect(() => {
    axiosClient
      .get<{ data: Product[] }>("/mock/products")
      .then((r) => setProducts(r.data.data))
      .catch((e) => setError(getErrorMessage(e, "Unable to load catalog")))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    setParams(
      Object.fromEntries(Object.entries(filters).filter(([, value]) => value)),
      { replace: true },
    );
  }, [filters, setParams]);
  const visible = products.filter(
    (p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.search ||
        `${p.name} ${p.sku}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())),
  );
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Header
          eyebrow="Merchandising"
          title="Catalog"
          description="Browse and filter the available mock product catalog."
        />
        <div className="flex gap-2">
          <Link
            to="/console/merchant/categories/add"
            className="rounded-lg border px-4 py-2.5 font-semibold"
          >
            Add Category
          </Link>
          <Link
            to="/console/merchant/products/add"
            className="rounded-lg bg-[#0FA958] px-4 py-2.5 font-semibold text-white"
          >
            Add Product
          </Link>
        </div>
      </div>
      <FilterBar
        fields={[
          { key: "search", label: "Search catalog" },
          {
            key: "category",
            label: "Category",
            type: "select",
            options: [
              ...new Set(products.map((p) => p.category).filter(Boolean)),
            ] as string[],
          },
        ]}
        value={filters}
        onChange={(next) => setFilters(next as typeof filters)}
      />
      <DataPanel loading={loading} error={error}>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {visible.map((product) => (
            <article
              key={product.id}
              className="rounded-xl border border-[#EDEDED] p-5 dark:border-[#263238]"
            >
              <h2 className="font-semibold">{product.name}</h2>
              <p className="mt-1 text-xs text-gray-500">{product.sku}</p>
              <p className="mt-4 text-xl font-bold">
                GBP {product.price.toFixed(2)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {product.stock} in stock
              </p>
            </article>
          ))}
        </div>
      </DataPanel>
    </section>
  );
}
