import { cookies } from 'next/headers';

import { Mail } from '@/app/(main)/mail/_components/mail';
import { accounts, mails } from '@/app/(main)/mail/data';

export default function MailPage() {
  const layout = cookies().get('react-resizable-panels:layout:mail');
  const collapsed = cookies().get('react-resizable-panels:collapsed');

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <Mail
      accounts={accounts}
      // mails={mails}
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
    />
  );
}
