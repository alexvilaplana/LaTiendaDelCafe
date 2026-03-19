import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function CafesPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("id,name,slug,origin,intensity,price_cents,is_featured")
    .order("is_featured", { ascending: false });

  if (error) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">Cafés</h1>
        <p className="mt-4 text-red-500">Error: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-bold">Cafés</h1>
      <p className="mt-2 text-sm text-neutral-400">
        Orígenes seleccionados + nuestra especialidad: <b>La Yeclana</b>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {products?.map((p) => (
          <Link
            key={p.id}
            href={`/cafes/${p.slug}`}
            className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-5 hover:bg-neutral-950/70 transition"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              {p.is_featured ? (
                <span className="text-xs rounded-full border border-neutral-700 px-2 py-1">
                  Especial
                </span>
              ) : null}
            </div>

            <div className="mt-3 text-sm text-neutral-300">
              <div>Origen: {p.origin}</div>
              <div>Intensidad: {p.intensity}/5</div>
            </div>

            <div className="mt-4 text-base font-semibold">
              {(p.price_cents / 100).toFixed(2)} €
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}