import clsx from 'clsx';

type SpeechBubbleProps = {
  side: 'left' | 'right' | 'decision';
  text: string;
};

export const SpeechBubble = ({ text, side }: SpeechBubbleProps) => {
  const classes = side === 'left' ? 'bg-green-700' : 'bg-blue-700';

  return (
    <div
      className={clsx(
        'flex w-max max-w-[75%] bg-opacity-45 flex-col gap-2 rounded-lg px-3 py-2 text-sm',
        classes,
      )}
    >
      {text}
    </div>
  );
};
