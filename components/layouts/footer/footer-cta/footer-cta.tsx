import { Button } from "@/components/ui/button";

const FooterCTA = () => {
  return (
    <section className="overflow-hidden rounded-[40px] bg-gradient-to-r from-primary to-sky-500 px-8 py-20 text-center text-white shadow-xl">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-5xl font-bold">Ready when you are</h2>

        <p className="mt-6 text-xl leading-8 text-white/90">
          Create your account, choose a time that suits you, and arrive to a
          therapist who already has your history in front of her.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" className="rounded-xl px-8">
            Create patient account
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-xl border-white/30 bg-transparent px-8 text-white hover:bg-white hover:text-primary"
          >
            Talk to the clinic
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
