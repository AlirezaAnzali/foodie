"use client";
import Link from "next/link";
export default function Error({ error }) {
  return (
    <main className="error">
      <h1>An Error Occurred!</h1>
      <p>{error.message}</p>
      <p>
        Make sure All fields are filled correctly. Refresh the page and try
        again.
      </p>
    </main>
  );
}
