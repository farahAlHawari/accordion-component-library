import { Icon } from "@/shared/components";
import SearchForm from "./SearchForm";

export default function Hero({ query, onQueryChange, status }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Icon name="sparkles" className="spark" />
      <h2 id="hero-title">Explore the Accordion</h2>
      <p>Search the React questions below, tune the props from the sidebar, and copy the code.</p>
      <SearchForm query={query} onChange={onQueryChange} />
      <p className="result-count" aria-live="polite">{status}</p>
    </section>
  );
}
