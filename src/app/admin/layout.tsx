import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Админ-панель | AutoHub Rostov',
  description: 'Панель управления заявками AutoHub Rostov',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
