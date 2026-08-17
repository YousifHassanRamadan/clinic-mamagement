import Link from "next/link";

const RememberMe = () => {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" />
        Remember me
      </label>

      <Link
        href="/forgot-password"
        className="text-sm font-medium text-primary hover:underline"
      >
        Forgot password?
      </Link>
    </div>
  );
};

export default RememberMe;
