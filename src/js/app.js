import { of, interval, map } from 'rxjs';
import {
  catchError, mergeMap, take,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Messages from './Messages';

const BASE_URL = 'https://fake-message.onrender.com';
const PERIOD = 5000;

document.addEventListener('DOMContentLoaded', () => {
  const messages = new Messages(document.querySelector('.app'));
  messages.render();
  interval(PERIOD)
    .pipe(
      take(5),
      mergeMap(() => ajax.getJSON(`${BASE_URL}/messages/unread`)
        .pipe(
          catchError((error) => {
            console.error('Error occurred while fetching unread messages:', error);
            return of(null);
          }),
        )),
      map((data) => data.messages),
    ).subscribe(messages.add);
});
