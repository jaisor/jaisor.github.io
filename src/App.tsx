import { Header } from "./components/Header";
import { About } from "./components/About";
import { Interests } from "./components/Interests";
import { Posts } from "./components/Posts";
import { Footer } from "./components/Footer";
import { SectionNav } from "./components/SectionNav";
import { Backdrop } from "./components/Backdrop";

function App() {
  return (
    <div className="relative isolate h-screen snap-y snap-proximity overflow-y-scroll scroll-smooth bg-neutral-950">
      <Backdrop />

      <SectionNav />

      <Header />
      <About />
      <Interests />
      <Posts />
      <Footer />
    </div>
  );
}

export default App;
