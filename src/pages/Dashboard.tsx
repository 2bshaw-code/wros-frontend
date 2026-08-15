import {
  Activity,
  Bot,
  MessageSquare,
  Package,
  ShoppingCart,
} from "lucide-react";
import logo from "/wros-logo.svg";
import { openBobModal } from "../components/BobLauncher.tsx";

const widgets = [
  ["Orders today", "24", ShoppingCart],
  ["Customers", "128", Activity],
  ["Catalog items", "64", Package],
  ["Messages handled", "342", MessageSquare],
] as const;
export default function Dashboard() {
  return (
    <div className="space-y-7">
      <div className="flex items-center gap-4 rounded-2xl border border-[#EDEDED] bg-white p-5 shadow-sm dark:border-[#263238] dark:bg-[#202C33]">
        <img src={logo} alt="WROS" className="h-12 w-12 object-contain" />
        <div>
          <p className="text-sm font-semibold text-[#0FA958]">
            Workspace overview
          </p>
          <h1 className="mt-1 text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Welcome back. Here is your business overview.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {widgets.map(([label, value, Icon]) => (
          <div
            key={label}
            className="rounded-xl border border-[#EDEDED] bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-[#263238] dark:bg-[#202C33]"
          >
            <Icon className="text-[#0FA958]" size={21} />
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-300">
              {label}
            </p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <section className="rounded-2xl border border-[#EDEDED] bg-white p-6 shadow-sm dark:border-[#263238] dark:bg-[#202C33]">
        <div className="flex flex-col items-center gap-4 text-center">
          <button type="button" onClick={openBobModal} className="grid h-28 w-28 place-items-center rounded-full bg-[#0FA958] text-white shadow-lg" aria-label="Open BOB assistant">
            <Bot size={52} strokeWidth={1.8} />
          </button>
          <div>
            <h2 className="text-xl font-semibold">BOB is ready to help</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Ask about products, orders, inventory, or customer conversations.
            </p>
          </div>
          <button
            type="button"
            onClick={openBobModal}
            className="rounded-lg bg-[#0FA958] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0C8A48]"
          >
            Talk to Bob
          </button>
        </div>
      </section>
      <section className="rounded-xl border border-[#EDEDED] bg-white p-6 shadow-sm dark:border-[#263238] dark:bg-[#202C33]">
        <h2 className="text-lg font-semibold">Future modules</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Catalog, orders, automation, delivery, and analytics modules will
          appear here as your workspace grows.
        </p>
      </section>
    </div>
  );
}
