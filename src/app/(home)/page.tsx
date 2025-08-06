import { ProjectForm } from "@/modules/home/ui/components/project-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Image
            src="/bot.svg"
            alt="Botbyte Logo"
            width={50}
            height={50}
            className="hidden md:block"
          />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-center">
          Build With Botbyte AI
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          Now Build Cool Websites in Minutes
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
    </div>
  );
}
