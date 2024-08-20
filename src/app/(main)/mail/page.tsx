import { cookies } from 'next/headers';

import { Mail } from '@/app/(main)/mail/_components/mail';

export default function MailPage() {
  const layout = cookies().get('react-resizable-panels:layout');

  const defaultLayout: number[] = layout ? JSON.parse(layout.value) : undefined;

  return <Mail defaultLayout={defaultLayout} />;
}
