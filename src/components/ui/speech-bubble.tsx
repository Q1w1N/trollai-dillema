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
        return 'bg-gray-700';
      case 'left':
        return 'bg-green-700';
      case 'right':
        return 'bg-blue-700';
    }
  }, [side]);

  return (
    <div
      className={clsx(
        'flex w-full bg-opacity-45 flex-col gap-2 rounded-lg px-3 py-2 text-xs',
        classes,
      )}
    >
      {text}
    </div>
  );
};
