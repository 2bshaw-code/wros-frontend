import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";
import axiosClient from "../api/axiosClient";
import Loading from "../components/Loading.tsx";
import { Header } from "./Orders.tsx";
import { getErrorMessage } from "../utils/helpers";
import FilterBar from "../components/FilterBar.tsx";

type Product = {
  id?: string;
  _id?: string;
  name: string;
  sku?: string;
  category?: string;
  price: number;
  stock: number;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async (search = "") => {
    setLoading(true);
    try {
      const response = await axiosClient.get<{ data: Product[] }>("/products", {
        params: search ? { search } : undefined,
      });
      setProducts(response.data.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to load products"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    void load();
  }, []);
  const remove = async (product: Product) => {
    const id = product.id || product._id;
    if (!id || !window.confirm(`Delete ${product.name}?`)) return;
    try {
      await axiosClient.delete(`/products/${id}`);
      await load(query);
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to delete product"));
    }
  };
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Header
          eyebrow="Merchandising"
          title="Products"
          description="Manage products and stock for this merchant workspace."
        />
        <Link
          to="/console/merchant/products/add"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0FA958] px-4 py-2.5 font-semibold text-white hover:bg-[#0C8A48]"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>
      <FilterBar
        fields={[{ key: "search", label: "Search products" }]}
        value={{ search: query }}
        onChange={(next) => {
          const search = next.search || "";
          setQuery(search);
          void load(search);
        }}
      />
      <div className="overflow-hidden rounded-xl border border-[#EDEDED] bg-white dark:border-[#263238] dark:bg-[#202C33]">
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="p-5 text-sm text-red-600">{error}</p>
        ) : (
          <div className="divide-y divide-[#EDEDED] dark:divide-[#263238]">
            {products.map((product) => (
              <div
                key={product.id || product._id || product.sku}
                className="grid gap-3 p-5 sm:grid-cols-[1fr_auto_auto_auto_auto] sm:items-center"
              >
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    {product.sku || "No SKU"}
                    {product.category ? ` · ${product.category}` : ""}
                  </p>
                </div>
                <span>GBP {Number(product.price).toFixed(2)}</span>
                <span>{product.stock} in stock</span>
                <Link
                  to={`/console/merchant/products/${product.id || product._id}/edit`}
                  aria-label={`Edit ${product.name}`}
                  className="rounded-lg p-2 text-[#0FA958]"
                >
                  <Edit size={17} />
                </Link>
                <button
                  type="button"
                  onClick={() => void remove(product)}
                  aria-label={`Delete ${product.name}`}
                  className="justify-self-start rounded-lg p-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
            {products.length === 0 && (
              <p className="p-5 text-sm text-gray-500">No products found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
