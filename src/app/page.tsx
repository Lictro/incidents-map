import IncidentMap from "@/components/IncidentMap/IncidentMap";
import incidents from "@/data/incidents.mock.json";

export default function Home() {
  return (
    <IncidentMap incidents={incidents} />
  );
}