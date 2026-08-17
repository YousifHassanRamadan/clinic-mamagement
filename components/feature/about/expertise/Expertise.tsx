import { expertise, languages, therapyMethods } from "@/constants/home/home";
import ExpertiseTag from "./expertise-tag/ExpertiseTag";

const Expertise = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* Header */}

        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Expertise
          </span>

          <h2 className="mt-3 text-4xl font-bold">Areas of expertise</h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            Every treatment plan is personalised. These are the areas I work
            with most frequently in clinical practice.
          </p>
        </div>

        {/* Expertise */}

        <div className="mt-12">
          <h3 className="mb-5 text-lg font-semibold">Specialties</h3>

          <div className="flex flex-wrap gap-4">
            {expertise.map((item) => (
              <ExpertiseTag key={item} title={item} />
            ))}
          </div>
        </div>

        {/* Methods */}

        <div className="mt-16">
          <h3 className="mb-5 text-lg font-semibold">Therapy Methods</h3>

          <div className="flex flex-wrap gap-4">
            {therapyMethods.map((item) => (
              <ExpertiseTag key={item} title={item} />
            ))}
          </div>
        </div>

        {/* Languages */}

        <div className="mt-16">
          <h3 className="mb-5 text-lg font-semibold">Languages</h3>

          <div className="flex flex-wrap gap-4">
            {languages.map((item) => (
              <ExpertiseTag key={item} title={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
