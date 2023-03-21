
import { of, interval } from 'rxjs';
import { catchError, pluck, mergeMap, take, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Messages from './Messages';

document.addEventListener('DOMContentLoaded', () => {
  const messages = new Messages(document.querySelector('.app'));
  const url = 'https://fake-message.onrender.com'
  messages.render();
  const interval$ = interval(5000);
  interval$
    .pipe(
      take(5),
      mergeMap(() => {
        return ajax.getJSON(url + '/messages/unread')
          .pipe(
            catchError(err => {
              console.log(err);
              return of();
            }),
          )
      }),
      pluck('messages'),
    ).subscribe(messages.add)
});

