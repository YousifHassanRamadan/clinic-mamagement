const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Unauthorized</h1>
        <p className="mt-2 text-muted-foreground">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
