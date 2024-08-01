import { FacebookConnection } from './_components/facebook-connection';
import { WhatsappConnection } from './_components/whatsapp-connection';

function Connectors() {
  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto grid w-full max-w-6xl gap-4 text-center">
        <h1 className="text-4xl font-semibold">Connectors</h1>
        <p className="text-muted-foreground">Authorize your accounts for content posting</p>
      </div>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 gap-6 mt-6 lg:mt-16">
        <FacebookConnection />
        <WhatsappConnection />
      </div>
    </div>
  );
}

export default Connectors;
