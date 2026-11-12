import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-steel-500">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-steel-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-accent-600 px-6 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-accent-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
