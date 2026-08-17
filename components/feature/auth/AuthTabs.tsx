interface Props {
  mode: "login" | "register";
  setMode: (mode: "login" | "register") => void;
}

const AuthTabs = ({ mode, setMode }: Props) => {
  return (
    <div className="flex rounded-2xl bg-muted p-1">
      <button
        onClick={() => setMode("login")}
        className={`flex-1 rounded-xl py-3 text-sm font-medium transition-all ${
          mode === "login"
            ? "bg-background shadow-sm text-foreground"
            : "text-muted-foreground"
        }`}
      >
        Login
      </button>

      <button
        onClick={() => setMode("register")}
        className={`flex-1 rounded-xl py-3 text-sm font-medium transition-all ${
          mode === "register"
            ? "bg-background shadow-sm text-foreground"
            : "text-muted-foreground"
        }`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthTabs;
