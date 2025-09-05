
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = params.get("q");

  return (
    <section style={{ paddingTop: 16 }}>
    
      <p>Du sökte på: {q}</p>
      
    </section>
  );
}
