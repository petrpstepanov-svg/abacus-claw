import Link from 'next/link';

interface ServiceCardProps {
  href: string;
  title: string;
  description: string;
  borderColor?: string;
}

export function ServiceCard({
  href,
  title,
  description,
  borderColor = 'border-primary',
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={`block rounded-xl bg-surface p-6 shadow-md hover:shadow-lg transition-shadow border-t-4 ${borderColor}`}
    >
      <h3 className="text-lg font-bold text-secondary mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
