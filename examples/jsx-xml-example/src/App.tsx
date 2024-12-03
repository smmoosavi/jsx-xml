import './App.css';
import { renderReact } from './react.tsx';
import { renderClassic } from './classic.tsx';
import { renderAutomatic } from './auto.tsx';

function App() {
  const xmlClassic = renderClassic(2);
  const xmlAuto = renderAutomatic(3);
  const xmlReact = renderReact(1);
  return (
    <>
      <h1>jsx-xml</h1>
      <div className="card">
        <h2>render classic</h2>
        <pre>{xmlClassic}</pre>
        <h2>render auto import</h2>
        <pre>{xmlAuto}</pre>
        <h2>rendered react element</h2>
        <pre>{xmlReact}</pre>
      </div>
    </>
  );
}

export default App;
