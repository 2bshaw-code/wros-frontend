import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Edit, Plus } from "lucide-react";
import axiosClient from "../api/axiosClient";
import Loading from "../components/Loading.tsx";
import CustomerFilters, {
  CustomerFiltersState,
} from "../components/CustomerFilters.tsx";
import { Header } from "./Orders.tsx";
import { getErrorMessage } from "../utils/helpers";

type Customer = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
};
const defaults: CustomerFiltersState = {
  name: "",
  phone: "",
  email: "",
  address: "",
};
export default function Customers() {
  const [params, setParams] = useSearchParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filters, setFilters] = useState<CustomerFiltersState>({
    ...defaults,
    ...Object.fromEntries(
      Object.keys(defaults).map((key) => [key, params.get(key) || ""]),
    ),
  } as CustomerFiltersState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    const query = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value),
    );
    setParams(query, { replace: true });
    axiosClient
      .get<{ data: Customer[] }>("/customers", { params: query })
      .then((response) => setCustomers(response.data.data))
      .catch((requestError) =>
        setError(getErrorMessage(requestError, "Unable to load customers")),
      )
      .finally(() => setLoading(false));
  }, [filters, setParams]);
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Header
          eyebrow="Relationships"
          title="Customers"
          description="Search and maintain tenant-scoped customer records."
        />
        <Link
          to="/console/merchant/customers/add"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0FA958] px-4 py-2.5 font-semibold text-white"
        >
          <Plus size={18} />
          Add Customer
        </Link>
      </div>
      <CustomerFilters value={filters} onChange={setFilters} />
      <div className="overflow-hidden rounded-xl border border-[#EDEDED] bg-white dark:border-[#263238] dark:bg-[#202C33]">
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="p-5 text-sm text-red-600">{error}</p>
        ) : (
          <div className="divide-y divide-[#EDEDED] dark:divide-[#263238]">
            {customers.map((customer) => (
              <div
                key={customer._id || customer.id}
                className="grid gap-3 p-5 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center"
              >
                <div>
                  <p className="font-semibold">{customer.name}</p>
                  <p className="text-xs text-gray-500">
                    {customer.address || "No address"}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{customer.email}</span>
                <span className="text-sm text-gray-500">{customer.phone}</span>
                <Link
                  to={`/console/merchant/customers/${customer._id || customer.id}/edit`}
                  aria-label={`Edit ${customer.name}`}
                  className="inline-flex w-fit rounded-lg p-2 text-[#0FA958]"
                >
                  <Edit size={17} />
                </Link>
              </div>
            ))}
            {customers.length === 0 && (
              <p className="p-5 text-sm text-gray-500">No customers found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
