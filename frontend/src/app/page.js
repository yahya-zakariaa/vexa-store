import Image from "next/image";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <section>
      <div className="slider-container w-full h-screen">
        <Slider />
      </div>
    </section>
  );
}
