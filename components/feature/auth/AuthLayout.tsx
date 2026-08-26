// components/feature/auth/AuthLayout.tsx

import LeftPanel from "./LeftPanel";
import AuthCard from "./AuthCard";

interface AuthLayoutProps {
  translations: {
    brand: string;

    testimonial: {
      quote: string;
      author: string;
      subtitle: string;
    };

    stats: {
      experience: {
        value: string;
        label: string;
      };
      clients: {
        value: string;
        label: string;
      };
      rating: {
        value: string;
        label: string;
      };
    };

    card: {
      login: {
        title: string;
        description: string;
        email: string;
        password: string;
        forgotPassword: string;
        login: string;
        loggingIn: string;
        or: string;
        noAccount: string;
        signUp: string;
        invalidCredentials: string;
        success: string;
        error: string;
      };

      register: {
        title: string;
        firstName: string;
        lastName: string;
        address: string;
        email: string;
        gender: string;
        male: string;
        female: string;
        phone: string;
        password: string;
        confirmPassword: string;
        createAccount: string;
        creatingAccount: string;
        or: string;
        alreadyAccount: string;
        login: string;
        success: string;
        error: string;
        automaticLoginFailed: string;
      };

      tabs: {
        login: string;
        register: string;
      };
    };
  };
}

const AuthLayout = ({ translations }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <aside className="hidden lg:block">
          <LeftPanel
            brand={translations.brand}
            testimonial={translations.testimonial}
            stats={[
              translations.stats.experience,
              translations.stats.clients,
              translations.stats.rating,
            ]}
          />
        </aside>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <AuthCard translations={translations.card} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
