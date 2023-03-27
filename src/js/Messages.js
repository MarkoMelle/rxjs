export default class Messages {
  constructor(box) {
    this.box = box;
  }

  render() {
    const title = document.createElement('h1');
    title.textContent = 'Incoming Messages';
    this.box.appendChild(title);
    this.list = document.createElement('ul');
    this.list.className = 'messages';
    this.box.appendChild(this.list);
  }

  add = (message) => {
    const item = document.createElement('li');
    item.className = 'message';
    const email = document.createElement('span');
    email.className = 'email';
    email.textContent = message.from;
    const subject = document.createElement('span');
    subject.className = 'subject';
    const messageLimit = 15;
    subject.textContent = message.subject.length > messageLimit ? `${message.subject.slice(0, messageLimit)}...` : message.subject;
    const date = document.createElement('span');
    date.className = 'date';
    const dateValue = new Date(message.received);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    const formattedDate = dateValue.toLocaleString('ru-RU', options);
    date.textContent = formattedDate;
    item.appendChild(email);
    item.appendChild(subject);
    item.appendChild(date);
    if (this.list.firstChild) {
      this.list.insertBefore(item, this.list.firstChild);
    } else {
      this.list.appendChild(item);
    }
  };
}
