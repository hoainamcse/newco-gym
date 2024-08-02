import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, Link2, Mail } from 'lucide-react';
import { ConnectDrive } from './_components/connect-drive';

function Knowledge() {
  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto grid w-full max-w-6xl gap-4 text-center">
        <h1 className="text-4xl font-semibold">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Insert your Google Drive link to import materials, documents to Gym Automation
        </p>
      </div>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 mt-6 lg:mt-16">
        <ConnectDrive />
        {/* <div className="w-[360px] h-[320px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 px-6 place-self-center">
          <Link2 className="w-16 h-16" strokeWidth="0.75" />
          <div className="relative w-full">
            <Input placeholder="Insert the website's URL" className="bg-white pr-8 rounded-none" />
            <Link className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" className="rounded-none">
            Import knowledge
          </Button>
        </div> */}
        {/* <div className="w-[360px] h-[320px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 px-6 place-self-center">
          <Mail className="w-16 h-16" strokeWidth="0.75" />
          <div className="relative w-full">
            <Input placeholder="abc@gmail.com" className="bg-white pr-8 rounded-none" />
            <Mail className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" className="rounded-none">
            Import knowledge
          </Button>
        </div> */}
      </div>
    </div>
  );
}

export default Knowledge;
