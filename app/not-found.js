import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Not found</h1>
      <p>Unfortunately, this page does not exist</p>
      <p>
        <Link className="link" href="/">
          Go back to the home page
        </Link>
      </p>
    </main>
  );
}
