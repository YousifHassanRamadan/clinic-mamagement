import LeftPanel from "./LeftPanel";
import AuthCard from "./AuthCard";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <aside className="hidden lg:block">
          <LeftPanel />
        </aside>

        {/* Right Side */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            <AuthCard />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
