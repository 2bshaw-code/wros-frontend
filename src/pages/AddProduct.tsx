import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Header } from "./Orders.tsx";
import { getErrorMessage } from "../utils/helpers";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    sku: "",
    barcode: "",
    images: "",
    category: "General",
    stock: "0",
    supplier: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.description.trim())
      return setError("A factual product description is required.");
    if (!form.sku.trim() && !form.barcode.trim())
      return setError("Provide an SKU or barcode.");
    const images = form.images
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (!images.length)
      return setError("Provide at least one customer-uploaded image URL.");
    if (
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0 ||
      !Number.isFinite(Number(form.stock)) ||
      Number(form.stock) < 0
    )
      return setError("Price and stock must be valid non-negative numbers.");
    setSaving(true);
    setError("");
    try {
      await axiosClient.post("/products", {
        ...form,
        images,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      navigate("/console/merchant/products");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to add product"));
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className="max-w-4xl space-y-6">
      <Header
        eyebrow="Merchandising"
        title="Add Product"
        description="Create a product using supplied, verifiable catalog data."
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
              "price",
              "sku",
              "barcode",
              "category",
              "stock",
              "supplier",
            ] as const
          ).map((field) => (
            <label key={field} className="block text-sm font-medium">
              {field[0].toUpperCase() + field.slice(1)}
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
            </label>
          ))}
          <label className="block text-sm font-medium sm:col-span-2">
            Description
            <textarea
              required
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              className="mt-2 min-h-24 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
            />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            Image URLs (comma-separated)
            <input
              required
              value={form.images}
              onChange={(event) =>
                setForm({ ...form, images: event.target.value })
              }
              placeholder="Use uploaded or customer-provided URLs"
              className="mt-2 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
            />
          </label>
        </div>
        <div className="flex gap-3">
          <button
            disabled={saving}
            type="submit"
            className="rounded-lg bg-[#0FA958] px-5 py-2.5 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Create Product"}
          </button>
          <Link
            to="/console/merchant/products"
            className="rounded-lg border border-[#D8DEE2] px-5 py-2.5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
