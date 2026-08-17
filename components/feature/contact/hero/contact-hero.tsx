import { Container } from "@/components/common/container/Container";

const ContactHero = () => {
  return (
    <section className="bg-gradient-to-b from-primary/15 via-primary/5 to-background">
      <Container>
        <div className="container mx-auto flex flex-col items-center px-6 py-24 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            Contact
          </span>

          <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight">
            Get in touch
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Questions about fees, availability or whether therapy is the right
            step? Send a message and we'll get back to you as soon as possible —
            with no obligation.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default ContactHero;
