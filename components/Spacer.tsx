import classNames from 'classnames';

interface Props {
  spaceX?: 1 | 2 | 3 | 4 | 6 | 8 | 10 | 16 | 24;
  spaceY?: 1 | 2 | 3 | 4 | 6 | 8 | 10 | 16 | 24;
}

export function Spacer({ spaceX, spaceY }: Props) {
  return (
    <div
      className={classNames(
        spaceX && [`pl-${spaceX}`],
        spaceY && [`pt-${spaceY}`],
      )}
    ></div>
  );
}
