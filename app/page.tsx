import Hero from "./component/Hero";
import Featured from "./component/Featured";
import Card from "./component/Card";
import SayHello from "./component/SayHello";

export default function Home() {
  return (
    <div>
      <Hero />
      <Featured />
      <Card/>
      <SayHello/>
    </div>
  );
}
