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

import { cn } from '@/lib/utils';
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
import { Setting, Email } from '@/types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AppContext } from '@/context/App.context';
import SettingsApi from '@/apis/settings';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useSWR from 'swr';

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

  const [mails, setMails] = React.useState<Email[]>([]);

  const [isFetching, setIsFetching] = React.useState(false);

  const { data: setting, mutate } = useSWR('SETTING', () =>
    SettingsApi.list().then((res) => res.data.setting[0])
  );

  const router = useRouter();

  const handleGetEmails = React.useCallback(async () => {
    setIsFetching(true);
    try {
      const { data } = await GmailApi.getEmail();
      setMails(
        data
          .map((item: any, index: number) => ({
            ...item,
            labels: [item.pending ? 'Cannot Reply' : 'Auto Replied'],
            name: `Sender ${index}`,
          }))
          .sort((a: Email, b: Email) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
      );
    } catch (err: any) {
      console.error('Error fetching emails:', err.message);
      // toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleChangeAutoReply = async () => {
    const payload = { ...setting, auto_reply: !setting?.auto_reply };
    try {
      await SettingsApi.create(payload);
      mutate(payload as Setting);
      toast(
        <span className="font-semibold text-teal-600">
          Auto-reply is {!setting?.auto_reply ? 'enabled' : 'turned off'}
        </span>
      );
    } catch (err: any) {
      // console.error('Error fetching emails:', err.message);
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    }
  };

  React.useEffect(() => {
    const fetchEmails = async () => {
      if (isFetching) return;
      handleGetEmails();
    };

    fetchEmails();

    const intervalId = setInterval(() => {
      if (user?.last_history_id) {
        fetchEmails();
      }
    }, 20000);

    return () => clearInterval(intervalId);
  }, [isFetching, handleGetEmails, user.last_history_id]);

  const renderMain = () => (
    <Tabs defaultValue="all">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold mr-auto">Inbox</h1>
        <div className="flex items-center space-x-2">
          <Label htmlFor="airplane-mode">Auto-reply</Label>
          <Switch
            id="airplane-mode"
            defaultChecked={setting?.auto_reply}
            checked={setting?.auto_reply}
            onClick={handleChangeAutoReply}
          />
        </div>
        <Separator orientation="vertical" className="h-5 ml-4" />
        {/* <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="ghost" className="ml-2" onClick={handleSyncEmail}>
              <FolderSync className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sync email</p>
          </TooltipContent>
        </Tooltip> */}
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
        <div className="p-4">
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
      {isFetching && mails.length === 0 ? (
        <>
          <Loader /> <Loader />
        </>
      ) : (
        <>
          <TabsContent value="all" className="m-0">
            <MailList items={mails} />
          </TabsContent>
          <TabsContent value="read" className="m-0">
            <MailList items={mails?.filter((item) => !item.pending)} />
          </TabsContent>
          <TabsContent value="unread" className="m-0">
            <MailList items={mails?.filter((item) => item.pending)} />
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
            <MailDisplay mail={mails.find((item) => item.id === mail.selected) || null} />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <>
          {mail.selected ? (
            <MailDisplay mail={mails.find((item) => item.id === mail.selected) || null} />
          ) : (
            renderMain()
          )}
        </>
      )}
    </>
  );
}
