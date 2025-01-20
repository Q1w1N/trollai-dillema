import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';

type VictimProps = {
  side: 'left' | 'right';
};

export const Victim = ({ side }: VictimProps) => {
  return (
    <div className="relative col-span-1 rounded-xl justify-items-center p-8">
      <Card className="flex flex-col h-full w-[50%]">
        <CardHeader>
          <CardTitle>Describe {side} victim</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea className="w-full h-full" />
        </CardContent>
      </Card>
    </div>
  );
};
