import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Header } from "./Orders.tsx";
import { getErrorMessage } from "../utils/helpers";

type Customer = { _id: string; name: string; email: string };
type Product = { _id: string; name: string; price: number };
export default function AddInvoice() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [tax, setTax] = useState("0");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    Promise.all([axiosClient.get("/customers"), axiosClient.get("/products")])
      .then(([customerResponse, productResponse]) => {
        setCustomers(customerResponse.data.data);
        setProducts(productResponse.data.data);
      })
      .catch((requestError) =>
        setError(getErrorMessage(requestError, "Unable to load invoice data")),
      );
  }, []);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const product = products.find((item) => item._id === productId);
    if (!customerId || !productId || !product || Number(quantity) < 1)
      return setError("Select a customer, product, and positive quantity.");
    setSaving(true);
    setError("");
    try {
      await axiosClient.post("/invoices", {
        customerId,
        items: [
          {
            productId,
            quantity: Number(quantity),
            price: Number(product.price),
          },
        ],
        tax: Number(tax),
        status: "draft",
      });
      navigate("/console");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to create invoice"));
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className="max-w-3xl space-y-6">
      <Header
        eyebrow="Billing"
        title="Create Invoice"
        description="Create an itemized draft from existing customer and product records."
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
        <label className="block text-sm font-medium">
          Customer
          <select
            required
            value={customerId}
            onChange={(event) => setCustomerId(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
          >
            <option value="">Select customer</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name} · {customer.email}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm font-medium sm:col-span-2">
            Product
            <select
              required
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              className="mt-2 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
            >
              <option value="">Select product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} · GBP {product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Quantity
            <input
              required
              min="1"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="mt-2 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
            />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Tax
          <input
            min="0"
            step="0.01"
            type="number"
            value={tax}
            onChange={(event) => setTax(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
          />
        </label>
        <div className="flex gap-3">
          <button
            disabled={saving}
            className="rounded-lg bg-[#0FA958] px-5 py-2.5 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Creating..." : "Create Draft Invoice"}
          </button>
          <Link
            to="/console"
            className="rounded-lg border border-[#D8DEE2] px-5 py-2.5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
