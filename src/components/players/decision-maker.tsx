import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Bomb } from 'lucide-react';

const DecisionStatus = ['waiting', 'deciding', 'listening'] as const;

export const DecisionMaker = () => {
  return (
    <div className="flex flex-col col-span-1 h-full self-end rounded-xl items-center content-center gap-3 justify-items-center">
      <Tabs defaultValue="bomb" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            disabled
            className="flex-1 data-[state=active]:bg-green-700"
            value="left"
          >
            Left Track
          </TabsTrigger>
          <TabsTrigger
            className="flex-1 data-[state=active]:bg-red-700"
            value="bomb"
            disabled
          >
            <Bomb />
          </TabsTrigger>
          <TabsTrigger
            disabled
            className="flex-1 data-[state=active]:bg-blue-700"
            value="right"
          >
            Right Track
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="flex flex-[4] flex-col h-full w-full items-center content-between">
        <CardHeader>
          <CardTitle>Conductor</CardTitle>
          <CardDescription className="self-center">is</CardDescription>
        </CardHeader>
        <CardContent className="content-center capitalize">
          {DecisionStatus[0]}
        </CardContent>
      </Card>
    </div>
  );
};
