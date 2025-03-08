export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center">
      {children}
    </div>
  );
}
