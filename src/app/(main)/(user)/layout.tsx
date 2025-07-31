import SidebarContent from "@/app/components/SidebarContent";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarContent activeView="bookings" mockBookings={[]} />
      {children}
    </>
  );
}
