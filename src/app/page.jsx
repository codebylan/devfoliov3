import Hero from '@/components/sections/Hero';
import ProblemAndSolution from '@/components/sections/ProblemAndSolution';

export default function Home() {
  return (
    <main className="flex flex-col gap-y-20">
      {/* gap-y-20 = 80px (Mobile)
         lg:gap-y-32 = 128px (Desktop)
      */}
      <Hero />
      <ProblemAndSolution />
    </main>
  );
}
