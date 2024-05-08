import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Meal Not found</h1>
      <p>Unfortunately, we could not find this meal</p>
      <p>
        <Link className="link" href="/meals">
          Go back to the meals page
        </Link>
      </p>
    </main>
  );
}
