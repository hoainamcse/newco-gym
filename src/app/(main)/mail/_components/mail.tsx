'use client';

import * as React from 'react';
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
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
import { Email } from '@/types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

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
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  const [mails, setMails] = React.useState<Email[]>([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const router = useRouter();

  const loadMails = async () => {
    // setIsLoading(true);
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
    } catch (err) {
      toast(<span className="font-semibold text-red-600">Error happen</span>);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      loadMails();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const startWatchingMail = async () => {
      try {
        await GmailApi.startWatching();
      } catch (err) {
        console.log(err);
      }
    };
    // const endWatchingMail = async () => {
    //   try {
    //     const { data } = await GmailApi.stopWatching();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    startWatchingMail();

    // return () => endWatchingMail();
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
        }}
      >
        {/* <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
          }}
          className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
        >
          <div
            className={cn(
              'flex h-[52px] items-center justify-center',
              isCollapsed ? 'h-[52px]' : 'px-2'
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'Inbox',
                label: '128',
                icon: Inbox,
                variant: 'default',
              },
              {
                title: 'Drafts',
                label: '9',
                icon: File,
                variant: 'ghost',
              },
              {
                title: 'Sent',
                label: '',
                icon: Send,
                variant: 'ghost',
              },
              {
                title: 'Junk',
                label: '23',
                icon: ArchiveX,
                variant: 'ghost',
              },
              {
                title: 'Trash',
                label: '',
                icon: Trash2,
                variant: 'ghost',
              },
              {
                title: 'Archive',
                label: '',
                icon: Archive,
                variant: 'ghost',
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'Social',
                label: '972',
                icon: Users2,
                variant: 'ghost',
              },
              {
                title: 'Updates',
                label: '342',
                icon: AlertCircle,
                variant: 'ghost',
              },
              {
                title: 'Forums',
                label: '128',
                icon: MessagesSquare,
                variant: 'ghost',
              },
              {
                title: 'Shopping',
                label: '8',
                icon: ShoppingCart,
                variant: 'ghost',
              },
              {
                title: 'Promotions',
                label: '21',
                icon: Archive,
                variant: 'ghost',
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle /> */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
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
            {/* <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div> */}
            <div className="p-2"></div>
            <TabsContent value="all" className="m-0">
              {isLoading ? (
                <ReloadIcon className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                <MailList items={mails} />
              )}
            </TabsContent>
            <TabsContent value="read" className="m-0">
              {isLoading ? (
                <ReloadIcon className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                <MailList items={mails.filter((item) => !item.pending)} />
              )}
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              {isLoading ? (
                <ReloadIcon className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                <MailList items={mails.filter((item) => item.pending)} />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <MailDisplay mail={mails.find((item) => item.id === mail.selected) || null} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
