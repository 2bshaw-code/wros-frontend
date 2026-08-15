import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { Header } from "./Orders.tsx";
export default function AddCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Category name is required.");
    try {
      await axiosClient.post("/categories", { name, description });
      navigate("/console/merchant/catalog");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to create category",
      );
    }
  };
  return (
    <section className="max-w-2xl space-y-6">
      <Header
        eyebrow="Merchandising"
        title="Add Category"
        description="Create a category using the existing category fields."
      />
      <form
        onSubmit={submit}
        className="space-y-4 rounded-xl border bg-white p-6 dark:border-[#263238] dark:bg-[#202C33]"
      >
        {error && <p className="text-sm text-red-600">{error}</p>}
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="w-full rounded-lg border p-2 dark:bg-[#2A3942]"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full rounded-lg border p-2 dark:bg-[#2A3942]"
        />
        <div className="flex gap-3">
          <button className="rounded-lg bg-[#0FA958] px-4 py-2 font-semibold text-white">
            Create Category
          </button>
          <Link to="/console/merchant/catalog" className="rounded-lg border px-4 py-2">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
