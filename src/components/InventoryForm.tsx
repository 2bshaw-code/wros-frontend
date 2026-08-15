import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Header } from "../pages/Orders.tsx";
import { getErrorMessage } from "../utils/helpers";

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  sku: string;
  barcode: string;
  images: string[];
  category: string;
  stock: string;
  supplier: string;
};
const empty: ProductFormData = {
  name: "",
  description: "",
  price: "",
  sku: "",
  barcode: "",
  images: [],
  category: "General",
  stock: "0",
  supplier: "",
};
export default function InventoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!id) return;
    axiosClient
      .get(`/products/${id}`)
      .then((response) => {
        const data = response.data.data;
        setForm({
          ...empty,
          ...data,
          price: String(data.price),
          stock: String(data.stock),
        });
      })
      .catch((requestError) =>
        setError(
          getErrorMessage(requestError, "Unable to load inventory item"),
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      !form.name ||
      Number(form.price) < 0 ||
      Number(form.stock) < 0 ||
      !Number.isFinite(Number(form.price)) ||
      !Number.isFinite(Number(form.stock))
    ) {
      setError("Name, numeric price, and numeric stock are required.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images,
    };
    try {
      if (id) await axiosClient.put(`/products/${id}`, payload);
      else await axiosClient.post("/products", payload);
      navigate("/console/merchant/inventory");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to save inventory item"));
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <p>Loading inventory item...</p>;
  return (
    <section className="max-w-4xl space-y-6">
      <Header
        eyebrow="Operations"
        title={id ? "Edit Inventory Item" : "Add Inventory Item"}
        description="Maintain stock and product metadata."
      />
      <form
        onSubmit={submit}
        className="space-y-5 rounded-xl border border-[#EDEDED] bg-white p-6 dark:border-[#263238] dark:bg-[#202C33]"
      >
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              "name",
              "description",
              "price",
              "sku",
              "barcode",
              "category",
              "stock",
              "supplier",
            ] as const
          ).map((field) => (
            <label key={field} className="text-sm font-medium">
              {field[0].toUpperCase() + field.slice(1)}
              {field === "description" ? (
                <textarea
                  value={form[field]}
                  onChange={(event) =>
                    setForm({ ...form, [field]: event.target.value })
                  }
                  className="mt-2 min-h-24 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
                />
              ) : (
                <input
                  required={field === "name" || field === "price"}
                  min={field === "price" || field === "stock" ? "0" : undefined}
                  step={field === "price" ? "0.01" : undefined}
                  type={
                    field === "price" || field === "stock" ? "number" : "text"
                  }
                  value={form[field]}
                  onChange={(event) =>
                    setForm({ ...form, [field]: event.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
                />
              )}
            </label>
          ))}
          <label className="text-sm font-medium sm:col-span-2">
            Image URLs (comma-separated)
            <input
              value={form.images.join(", ")}
              onChange={(event) =>
                setForm({
                  ...form,
                  images: event.target.value
                    .split(",")
                    .map((value) => value.trim())
                    .filter(Boolean),
                })
              }
              placeholder="https://..."
              className="mt-2 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
            />
          </label>
        </div>
        <div className="flex gap-3">
          <button
            disabled={saving}
            className="rounded-lg bg-[#0FA958] px-5 py-2.5 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Inventory Item"}
          </button>
          <Link
            to="/console/merchant/inventory"
            className="rounded-lg border border-[#D8DEE2] px-5 py-2.5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
