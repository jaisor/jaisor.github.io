import { Header } from "./components/Header";
import { Interests } from "./components/Interests";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-orange-600/10 blur-3xl"
      />

      <div className="relative flex min-h-screen flex-col">
        <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-16 px-6 py-16">
          <Header />
          <Interests />
          <Projects />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
