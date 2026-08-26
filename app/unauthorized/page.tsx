import GoBackButton from "@/components/common/go-back-btn/go-back-btn";
import { cookies } from "next/headers";

const UnauthorizedPage = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";

  const isArabic = locale === "ar";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center" dir={isArabic ? "rtl" : "ltr"}>
        <h1 className="text-3xl font-bold">
          {isArabic ? "غير مصرح" : "Unauthorized"}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {isArabic
            ? "ليس لديك صلاحية للوصول إلى هذه الصفحة."
            : "You don't have permission to access this page."}
        </p>

        <GoBackButton isArabic={isArabic} />
      </div>
    </div>
  );
};

export default UnauthorizedPage;
