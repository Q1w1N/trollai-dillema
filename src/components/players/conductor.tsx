import {
  conductorDecisionAtom,
  conductorStateAtom,
} from '@/atoms/conductor-atoms';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAtom } from 'jotai';

export const Conductor = () => {
  const [conductorState] = useAtom(conductorStateAtom);
  const [conductorDecision] = useAtom(conductorDecisionAtom);

  return (
    <div className="flex flex-col col-span-1 h-full self-end rounded-xl items-center content-center gap-3 justify-items-center">
      <Tabs
        defaultValue={conductorDecision}
        value={conductorDecision}
        className="w-full"
      >
        <TabsList className="w-full pointer-events-none select-none">
          <TabsTrigger
            className="flex-1 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            value="left"
          >
            Left Track
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 h-full data-[state=active]:bg-red-700 data-[state=active]:bg-opacity-50"
            value={'none'}
          ></TabsTrigger>
          <TabsTrigger
            className="flex-1 data-[state=active]:bg-sky-500 data-[state=active]:text-white"
            value="right"
          >
            Right Track
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="flex flex-[4] flex-col h-full w-full items-center content-between">
        <CardHeader>
          <CardTitle className="text-bold">Conductor</CardTitle>
          <CardDescription className="self-center font-bold">
            is
          </CardDescription>
        </CardHeader>
        <CardContent className="content-center uppercase text-3xl font-bold">
          {conductorState}
        </CardContent>
      </Card>
    </div>
  );
};
