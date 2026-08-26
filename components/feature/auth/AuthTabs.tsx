// components/feature/auth/AuthTabs.tsx

"use client";

interface AuthTabsProps {
  mode: "login" | "register";
  setMode: (mode: "login" | "register") => void;
  translations: {
    login: string;
    register: string;
  };
}

const AuthTabs = ({ mode, setMode, translations }: AuthTabsProps) => {
  return (
    <div className="grid grid-cols-2 rounded-xl bg-muted p-1">
      <button
        type="button"
        onClick={() => setMode("login")}
        className={`rounded-lg py-2 text-sm font-medium transition ${
          mode === "login"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground"
        }`}
      >
        {translations.login}
      </button>

      <button
        type="button"
        onClick={() => setMode("register")}
        className={`rounded-lg py-2 text-sm font-medium transition ${
          mode === "register"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground"
        }`}
      >
        {translations.register}
      </button>
    </div>
  );
};

export default AuthTabs;
