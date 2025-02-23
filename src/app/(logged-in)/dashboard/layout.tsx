export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  flex-col  justify-center relative bg-background gap-4">
      {children}
    </div>
  );
}
