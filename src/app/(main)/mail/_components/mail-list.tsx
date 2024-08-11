import { ComponentProps } from 'react';
import { formatDistanceToNow } from 'date-fns';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Mail } from '@/app/(main)/mail/data';
import { useMail } from '@/app/(main)/mail/user-mail';
import { FolderSync } from 'lucide-react';
import type { Email } from '@/types';

interface MailListProps {
  items: Email[];
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea style={{ height: 'calc(100vh - 200px)' }}>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {!items.length && (
          <div className="font-medium text-sm flex gap-2 justify-center items-center">
            {/* Please click <FolderSync className="w-4 h-4" /> button to sync email. */}
            No emails.
          </div>
        )}
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              mail.selected === item.id && 'bg-muted'
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  {/* <div className="font-semibold">{item.name}</div> */}
                  <div className={cn(!item.read && 'font-semibold')}>{item.sender}</div>
                  {/* {!item.pending && <span className="flex h-2 w-2 rounded-full bg-blue-600" />} */}
                  {!item.read && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    mail.selected === item.id ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className={cn('text-xs', !item.read && 'font-semibold')}>{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.content.substring(0, 300)}
            </div>
            {/* {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
            <div className="flex items-center gap-2">
              {[item.pending ? 'Cannot Reply' : 'Auto Replied'].map((label) => (
                <Badge key={label} className={cn(getBadgeVariantFromLabel(label))}>
                  {label}
                </Badge>
              ))}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['className'] {
  if (['auto replied'].includes(label.toLowerCase())) {
    return 'bg-blue-500';
  }

  if (['cannot reply'].includes(label.toLowerCase())) {
    return 'bg-red-500';
  }

  return 'secondary';
}
