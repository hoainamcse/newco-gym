'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import SettingsApi from '@/apis/settings';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';
import useSWR from 'swr';
import { Setting } from '@/types';

const ConfigConfidence = () => {
  const {
    data: setting,
    isLoading,
    mutate,
  } = useSWR('SETTING', () => SettingsApi.list().then((res) => res.data.setting[0]));

  const [value, setValue] = useState<number>(setting?.confidence_threshold || 0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(setting?.confidence_threshold || 0);
  }, [setting]);

  if (isLoading) {
    return <div>Data loading...</div>;
  }

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const payload = {
      ...setting,
      confidence_threshold: value,
    };
    try {
      await SettingsApi.create(payload);
      mutate(payload as Setting);
      toast(<span className="font-semibold text-teal-600">Confidence level updated</span>);
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader>
        <CardTitle>Adjust the Confidence Level</CardTitle>
        <CardDescription>
          Use the slider to select a value within the specified range.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-4">
            <Label htmlFor="value">Value: {value}</Label>
            <Slider
              id="value"
              name="value"
              max={1}
              step={0.05}
              className="mt-2"
              value={[value]}
              onValueChange={(values) => setValue(values[0])}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0</span>
            <span>1</span>
          </div>
          <Button type="submit" className="w-full">
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConfigConfidence;
