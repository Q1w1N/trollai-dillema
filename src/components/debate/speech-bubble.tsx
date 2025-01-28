import clsx from 'clsx';
import { useMemo } from 'react';

type SpeechBubbleProps = {
  side: 'left' | 'right' | 'decision';
  text: string;
};

export const SpeechBubble = ({ text, side }: SpeechBubbleProps) => {
  const classes = useMemo(() => {
    switch (side) {
      case 'decision':
        return 'bg-gray-700 text-white';
      case 'left':
        return 'bg-emerald-300 text-gray-800';
      case 'right':
        return 'bg-sky-300 text-gray-800';
    }
  }, [side]);

  return (
    <div
      className={clsx(
        'w-full bg-opacity-70 flex-col gap-2 rounded-md p-3 text-sm mt-2',
        classes,
      )}
    >
      {text}
    </div>
  );
};
