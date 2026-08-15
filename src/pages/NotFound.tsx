import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-2 text-gray-600">The WROS route does not exist.</p>
        <Link
          className="mt-6 inline-block rounded-lg bg-[#128C7E] px-4 py-2 font-semibold text-white"
          to="/console"
        >
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
