import Image from 'next/image';
import { Link2, SquareMousePointer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthorizeFacebook } from './_components/authorize-facebook';

function Connectors() {
  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto grid w-full max-w-6xl gap-4 text-center">
        <h1 className="text-4xl font-semibold">Connectors</h1>
        <p className="text-muted-foreground">Authorize your accounts for content posting</p>
      </div>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-6 mt-6 lg:mt-16">
        <AuthorizeFacebook />
        <div className="w-fit min-w-[390px] place-self-center">
          <div className="h-[360px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 px-6">
            <Image
              width="80"
              height="80"
              src="https://img.icons8.com/?size=100&id=16733&format=png&color=000000"
              alt="whatsapp--v1"
            />
            <div className="flex items-stretch gap-2">
              <Input placeholder="Phone number" className="bg-white rounded-none" />
              <Button className="rounded-none">Authorize</Button>
            </div>
          </div>
          {/* <div className="flex gap-2 mt-4">
            <Button className="rounded-none" variant="outline">
              <Link2 className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
            <Button className="rounded-none">
              <SquareMousePointer className="h-4 w-4 mr-2" />
              Choose the another account
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Connectors;
