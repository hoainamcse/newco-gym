'use client';

import * as React from 'react';
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  FolderSync,
  Inbox,
  Info,
  MessagesSquare,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Trash2,
  Users2,
} from 'lucide-react';

import { cn, merge } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AccountSwitcher } from '@/app/(main)/mail/_components/account-switcher';
import { MailDisplay } from '@/app/(main)/mail/_components/mail-display';
import { MailList } from '@/app/(main)/mail/_components/mail-list';
import { Nav } from '@/app/(main)/mail/_components/nav';
import { type Mail } from '@/app/(main)/mail/data';
import { useMail } from '@/app/(main)/mail/user-mail';
import GmailApi from '@/apis/gmail';
import { Email } from '@/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { AppContext } from '@/context/App.context';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useSWR from 'swr';
import { AutoReply } from './auto-reply';
import useMailFilter from '@/hooks/use-mail-filter';

const Loader = () => {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent m-4">
      <Skeleton className="h-4 w-2/5" />
      <Skeleton className="h-4 w-3/5" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};
interface MailProps {
  accounts: {
    label: string;
    sender: string;
    icon: React.ReactNode;
  }[];
  // mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const now = Date.now();

export function Mail({
  accounts,
  // mails,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const { user } = React.useContext(AppContext);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const [mail] = useMail();

  const { getMails } = useMailFilter();

  const {
    data: emails,
    isLoading,
    error,
    mutate: emailMutate,
    isValidating,
  } = useSWR('LIST-EMAIL', () =>
    GmailApi.getEmails().then((res) => res.data.map((i) => ({ ...i, read: true })) as Email[])
  );

  const {
    data: polling,
    error: pollingError,
    mutate: pollingMutate,
  } = useSWR(emails ? 'LIST-POLLING' : null, () =>
    GmailApi.getPolling(Math.round(now / 1000)).then(
      (res) => res.data.map((i) => ({ ...i, read: false })) as Email[]
    )
  );

  const router = useRouter();

  React.useEffect(() => {
    const fetchEmails = async () => {
      if (pollingError) return;
      pollingMutate(polling);
    };

    const intervalId = setInterval(() => {
      if (user?.last_history_id) {
        fetchEmails();
      }
    }, 300000);

    return () => clearInterval(intervalId);
  }, [user?.last_history_id]);

  const handleRetry = () => {
    emailMutate();
  };

  const renderMain = () => (
    <Tabs defaultValue="all">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold mr-auto">Inbox</h1>
        <AutoReply />
        <Separator orientation="vertical" className="h-5 ml-4" />
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="icon"
              variant="ghost"
              className="ml-2"
              onClick={() => router.push('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Configure Confidence Level</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Separator />
      <TabsList className="m-4">
        <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
          All
        </TabsTrigger>
        <TabsTrigger value="read" className="text-zinc-600 dark:text-zinc-200">
          Auto Replied
        </TabsTrigger>
        <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
          Cannot Reply
        </TabsTrigger>
      </TabsList>
      {!user.last_history_id && (
        <div className="px-4 pb-4">
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              You should{' '}
              <Link href="/settings" className="underline underline-offset-4 font-medium">
                enable watching
              </Link>{' '}
              to continue receiving upcoming emails.
            </AlertDescription>
          </Alert>
        </div>
      )}
      {(isLoading || isValidating) && (
        <>
          <Loader /> <Loader />
        </>
      )}
      {error && (
        <div className="px-4 pb-4">
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              Error fetching emails. Please{' '}
              <span
                className="underline underline-offset-4 font-medium cursor-pointer"
                onClick={handleRetry}
              >
                try again.
              </span>
            </AlertDescription>
          </Alert>
        </div>
      )}
      {emails && (
        <>
          <TabsContent value="all" className="m-0">
            <MailList items={merge(polling ?? [], emails)} />
          </TabsContent>
          <TabsContent value="read" className="m-0">
            <MailList items={getMails(merge(polling ?? [], emails), 'auto replied')} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={getMails(merge(polling ?? [], emails), 'cannot reply')} />
          </TabsContent>
        </>
      )}
    </Tabs>
  );

  return (
    <>
      {isDesktop ? (
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
          }}
        >
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            {renderMain()}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]}>
            <MailDisplay
              mail={
                merge(polling ?? [], emails ?? []).find((item) => item.id === mail.selected) || null
              }
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <>
          {mail.selected ? (
            <MailDisplay
              mail={
                merge(polling ?? [], emails ?? []).find((item) => item.id === mail.selected) || null
              }
            />
          ) : (
            renderMain()
          )}
        </>
      )}
    </>
  );
}
