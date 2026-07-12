import Hero from "./component/Hero";
import Navber from "./component/Navber";
import Featured from "./component/Featured";
import Card from "./component/Card";

export default function Home() {
  return (
    <div>
      <Hero />
      <Featured />
      <Card/>
    </div>
  );
}
