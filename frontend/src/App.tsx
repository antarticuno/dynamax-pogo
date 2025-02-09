import HealerSection from "./components/HealerSection";
import AttackerSection from "./components/AttackerSection";
import DefenderSection from "./components/DefenderSection";

export default function App() {
  return (
    <div className="App">
      <h1>Dynamax App</h1>
      <AttackerSection />
      <DefenderSection />
      <HealerSection />
    </div>
  );
}
