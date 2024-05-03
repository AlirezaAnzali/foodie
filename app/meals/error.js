"use client";

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>Oops, something went wrong!</h1>
      <p>{error.message}</p>
    </main>
  );
}
