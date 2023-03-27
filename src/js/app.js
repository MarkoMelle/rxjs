import { of, interval, map } from 'rxjs';
import {
  catchError, mergeMap, take,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Messages from './Messages';

document.addEventListener('DOMContentLoaded', () => {
  const messages = new Messages(document.querySelector('.app'));
  const url = 'https://fake-message.onrender.com';
  messages.render();
  const interval$ = interval(5000);
  interval$
    .pipe(
      take(5),
      mergeMap(() => ajax.getJSON(`${url}/messages/unread`)
        .pipe(
          catchError((error) => {
            console.error('Error occurred while fetching unread messages:', error);
            return of(null);
          }),
        )),
      map((data) => data.messages),
    ).subscribe(messages.add);
});
