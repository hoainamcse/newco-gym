'use client';

import { addDays, addHours, format, nextSaturday } from 'date-fns';
import {
  Archive,
  ArchiveX,
  ChevronLeft,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from 'lucide-react';

import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Email } from '@/types';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ComponentProps, useEffect, useState } from 'react';
import GmailApi from '@/apis/gmail';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useMail } from '../user-mail';
import { useMediaQuery } from 'react-responsive';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
// import { Mail as Email } from '@/app/(main)/mail/data';

interface MailDisplayProps {
  mail: Email | null;
}

const formSchema = z.object({
  body: z.string().min(2, {
    message: 'Reply must be at least 2 characters',
  }),
});

export function MailDisplay({ mail }: MailDisplayProps) {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const [_, setMail] = useMail();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await GmailApi.replyEmail({ id: mail?.id, body: values.body });
      form.reset();
      toast(<span className="font-semibold text-teal-600">Update successful</span>);
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillResponse = () => {
    if (mail) {
      form.setValue('body', mail.response);
    }
  };

  const handleBackClick = () => {
    setMail({ selected: null });
  };

  useEffect(() => {
    if (mail) {
      form.setValue('body', mail.response);
    }
  }, [mail, form]);

  if (mail) {
    return (
      <div className="h-full flex flex-col">
        {!isDesktop && (
          <div className="p-4 gap-4">
            <Button onClick={handleBackClick} variant="secondary" size="sm">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </div>
        )}
        <div className="flex items-start p-4">
          <div className="flex items-start gap-4 text-sm">
            <Avatar>
              <AvatarImage alt={mail.sender} />
              <AvatarFallback>
                {mail.sender
                  .split(' ')
                  .map((chunk) => chunk[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-semibold">{mail.sender}</div>
              <div className="line-clamp-1 text-xs font-medium">{mail.subject}</div>
              <div className="line-clamp-1 text-xs">
                <span className="font-medium">Reply-To:</span> {mail.sender}
              </div>
            </div>
          </div>
          {mail.date && (
            <div className="ml-auto text-xs text-muted-foreground">
              {format(new Date(mail.date), 'PPpp')}
            </div>
          )}
        </div>
        <Separator />
        <ScrollArea className="flex-1 max-w-full">
          <div
            className="whitespace-pre-wrap p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: mail.html_content ?? mail.content }}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Separator />
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="p-4 h-32"
                          placeholder={`Reply ${mail.sender}...`}
                          readOnly={!mail.pending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center">
                  {/* <Label htmlFor="mute" className="flex items-center gap-2 text-xs font-normal">
                  <Switch id="mute" aria-label="Mute thread" /> Mute this thread
                </Label> */}
                  {!['Cannot Reply', null].includes(mail.status) && (
                    <Badge className={cn(getBadgeVariantFromLabel(mail.status as string))}>
                      Confidence score: {(mail.confidence_score * 100).toFixed(2)} %
                    </Badge>
                  )}
                  {!['Auto Replied', null].includes(mail.status) && (
                    <Button type="submit" size="sm" className="ml-auto">
                      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                      Send
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return <div className="p-4 text-center text-muted-foreground">No message selected</div>;
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>['className'] {
  if (['auto replied'].includes(label.toLowerCase())) {
    return 'bg-blue-500';
  }

  if (['cannot reply'].includes(label.toLowerCase())) {
    return 'bg-red-500';
  }

  if (['high confidence'].includes(label.toLowerCase())) {
    return 'bg-green-500';
  }

  return 'bg-yellow-500';
}
