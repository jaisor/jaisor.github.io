import { Header } from "./components/Header";
import { Interests } from "./components/Interests";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-16 px-6 py-16">
        <Header />
        <Interests />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;
