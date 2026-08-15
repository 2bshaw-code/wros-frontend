import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Header } from "../pages/Orders.tsx";
import { getErrorMessage } from "../utils/helpers";

type CustomerFormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  whatsappId: string;
};
const empty: CustomerFormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  whatsappId: "",
};

export default function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!id) return;
    axiosClient
      .get(`/customers/${id}`)
      .then((response) => setForm({ ...empty, ...response.data.data }))
      .catch((requestError) =>
        setError(getErrorMessage(requestError, "Unable to load customer")),
      )
      .finally(() => setLoading(false));
  }, [id]);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^\+?[0-9 ()-]{7,20}$/.test(form.phone)) {
      setError("Enter a valid phone number.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (id) await axiosClient.put(`/customers/${id}`, form);
      else await axiosClient.post("/customers", form);
      navigate("/console/merchant/customers");
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to save customer"));
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <p>Loading customer...</p>;
  return (
    <section className="max-w-3xl space-y-6">
      <Header
        eyebrow="Relationships"
        title={id ? "Edit Customer" : "Add Customer"}
        description="Maintain tenant-scoped customer details."
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
          {(["name", "phone", "email", "whatsappId"] as const).map((field) => (
            <label key={field} className="text-sm font-medium">
              {field === "whatsappId"
                ? "WhatsApp ID"
                : field[0].toUpperCase() + field.slice(1)}
              <input
                required={field !== "whatsappId"}
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(event) =>
                  setForm({ ...form, [field]: event.target.value })
                }
                className="mt-2 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
              />
            </label>
          ))}
        </div>
        <label className="text-sm font-medium">
          Address
          <textarea
            value={form.address}
            onChange={(event) =>
              setForm({ ...form, address: event.target.value })
            }
            className="mt-2 min-h-24 w-full rounded-lg border border-[#D8DEE2] px-3 py-2 dark:border-[#263238] dark:bg-[#2A3942]"
          />
        </label>
        <div className="flex gap-3">
          <button
            disabled={saving}
            className="rounded-lg bg-[#0FA958] px-5 py-2.5 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Customer"}
          </button>
          <Link
            to="/console/merchant/customers"
            className="rounded-lg border border-[#D8DEE2] px-5 py-2.5"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
