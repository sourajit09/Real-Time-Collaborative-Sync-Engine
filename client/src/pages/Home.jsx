// frontend/src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Real-Time Sync Engine</h1>
      <Link to="/document/test123">Open Test Document</Link>
    </div>
  );
}