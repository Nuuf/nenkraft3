/**
 * @author Gustav 'Nuuf' Åberg <gustavrein@gmail.com>
 */

import { Dispatcher } from 'event';

export default function (container: HTMLDivElement): void {
  container.appendChild(document.createElement('canvas'));
  const dispatcher = new Dispatcher<typeof container, string>();

  dispatcher.Add((e) => {
    console.log(e.data);
  });

  dispatcher.Dispatch(container, 'hello world');
}
