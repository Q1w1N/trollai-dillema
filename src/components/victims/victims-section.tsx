import { Victim } from './victim';

export const VictimsSection = () => {
  return (
    <div className="grid grid-cols-2 row-span-2 col-span-3 gap-3 justify-stretch">
      <Victim side="left" />
      <Victim side="right" />
    </div>
  );
};
