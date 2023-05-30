import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main>
      <div>
        <h1>Oops! You seem to be lost.</h1>
        <p>Here are some helpful links:</p>
        <div id="game">

  <div id="road">

    <div id="cloud"></div>
    <div id="hero"></div>

  </div>

  <div id="hud">

    <span id="time" class="topUI">0</span>
    <span id="score" class="topUI">0</span>
    <span id="lap" class="topUI">0'00"000</span>
    <span id="tacho">0</span>

  </div>
        <Link to="/">Home</Link>
      </div>
    </main>
  );
}
