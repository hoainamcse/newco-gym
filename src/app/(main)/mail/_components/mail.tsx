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
import useSWR, { useSWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { AutoReply } from './auto-reply';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  defaultLayout: number[];
}

const now = Date.now() + 300000;

export function Mail({ defaultLayout }: MailProps) {
  const { user } = React.useContext(AppContext);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  const [mail] = useMail();

  const { mutate: globalMutate } = useSWRConfig();

  const {
    data,
    isLoading,
    error,
    mutate: emailMutate,
    isValidating,
    size,
    setSize,
  } = useSWRInfinite(
    (index) => `${index}`,
    (index) =>
      GmailApi.getEmails({ skip: 10 * Number(index) }).then(
        (res) => res.data.map((i) => ({ ...i, read: true })) as Email[]
      )
  );

  const emails = data ? ([] as Email[]).concat(...data) : [];

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

  React.useEffect(() => {
    const startWatching = async () => {
      await GmailApi.startWatching();
      globalMutate('USER');
    }
    if (user?.last_history_id) {
      startWatching();
    }
  }, []);

  const handleRetry = () => {
    emailMutate();
  };

  const renderMain = () => (
    <>
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
      <Tabs defaultValue="all" style={{ height: 'calc(100% - 53px)' }} className="flex flex-col">
        <TabsList className="grid grid-cols-3 m-4">
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
        {isLoading && (
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
        {emails && !isLoading && (
          <ScrollArea className="mb-4">
            <TabsContent value="all" className="m-0">
              <MailList items={merge(polling ?? [], emails)} />
              {!isLoading && (
                <div className="px-4">
                  <Button
                    onClick={() => setSize(size + 1)}
                    size="sm"
                    className="w-full"
                    variant="secondary"
                  >
                    {isValidating ? 'Loading...' : 'Load more'}
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="read" className="m-0">
              <MailList
                items={merge(polling ?? [], emails).filter(
                  (item) => item.status === 'Auto Replied'
                )}
              />
              {!isLoading && (
                <div className="px-4">
                  <Button
                    onClick={() => setSize(size + 1)}
                    size="sm"
                    className="w-full"
                    variant="secondary"
                  >
                    {isValidating ? 'Loading...' : 'Load more'}
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList
                items={merge(polling ?? [], emails).filter(
                  (item) => item.status === 'Cannot Reply'
                )}
              />
              {!isLoading && (
                <div className="px-4">
                  <Button
                    onClick={() => setSize(size + 1)}
                    size="sm"
                    className="w-full"
                    variant="secondary"
                  >
                    {isValidating ? 'Loading...' : 'Load more'}
                  </Button>
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        )}
      </Tabs>
    </>
  );

  if (isDesktop) {
    return (
      <div className="h-full flex">
        <div className="basis-1/3 border-r">{renderMain()}</div>
        <div className="basis-2/3">
          <MailDisplay
            mail={
              merge(polling ?? [], emails ?? []).find((item) => item.id === mail.selected) || null
            }
          />
        </div>
      </div>
    );
  }

  if (mail.selected) {
    return (
      <MailDisplay
        mail={merge(polling ?? [], emails ?? []).find((item) => item.id === mail.selected) || null}
      />
    );
  }

  return renderMain();
}
