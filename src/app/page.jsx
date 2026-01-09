import Hero from '@/components/sections/Hero';
import MyStack from '@/components/sections/MyStack';
import ProblemAndSolution from '@/components/sections/ProblemAndSolution';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <main className="flex flex-col gap-y-20">
      <Hero />
      <ProblemAndSolution />
      <MyStack />
      <Projects />
    </main>
  );
}
