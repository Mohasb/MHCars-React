import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <div>
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        {/* https://codepen.io/arcs/pen/aGzNKY */}
        <Link to="/">Home</Link>
      </div>
    </main>
  );
}
