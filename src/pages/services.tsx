import { CinematicServices } from "@/components/cinematic-services";
import { useBusinessAnalytics } from "../hooks/useBusinessAnalytics";

export default function Services() {
  useBusinessAnalytics();

  return (
    <CinematicServices />
  );
}