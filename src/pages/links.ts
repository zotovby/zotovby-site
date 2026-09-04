import { html } from "hono/html";
import { SITE, contentPage, divider, footer, heading, panel, type Html } from "../layout.js";

type Link = { href: string; title: string; note: string };

/** Ссылки на старый веб ведут в Архив Интернета — там он ещё живой. */
const FAVOURITES: Link[] = [
  {
    href: "https://web.archive.org/web/19991117000000/http://www.altavista.com/",
    title: "AltaVista",
    note: "Лучший поисковик, ищет вообще всё",
  },
  {
    href: "https://web.archive.org/web/19990117000000/http://www.yahoo.com/",
    title: "Yahoo!",
    note: "Каталог сайтов, тут можно залипнуть на весь вечер",
  },
  {
    href: "https://web.archive.org/web/19991013000000/http://www.geocities.com/",
    title: "GeoCities",
    note: "Бесплатный хостинг, тут живут такие же странички",
  },
  {
    href: "https://web.archive.org/web/19991128000000/http://www.rambler.ru/",
    title: "Rambler",
    note: "Наш поисковик и рейтинг Top100",
  },
  {
    href: "https://web.archive.org/web/19991009000000/http://www.netscape.com/",
    title: "Netscape",
    note: "Скачать самый правильный браузер",
  },
  {
    href: "http://www.textfiles.com/",
    title: "textfiles.com",
    note: "Огромный склад текстовых файлов со всего света",
  },
];

export function linksPage(): Html {
  const rows = FAVOURITES.map(
    (link) => html`<tr valign="top">
  <td width="20"><font color="#FFCC00">&#9658;</font></td>
  <td width="170"><a href="${link.href}" target="_blank"><font face="Arial" size="2" color="#00FFFF"><b>${link.title}</b></font></a></td>
  <td><font face="Arial" size="2" color="#FFFF99">${link.note}</font></td>
</tr>
<tr><td colspan="3" height="6"></td></tr>`,
  );

  const body = html`${heading("Мои ссылки")}

${panel(
  "Как меня найти",
  html`<table border="0" cellpadding="6" cellspacing="0" width="100%">
<tr valign="middle">
  <td width="44" align="center"><img src="/img/icq.gif" width="32" height="32" alt="пейджер" border="0"></td>
  <td>
    <a href="${SITE.telegram}" target="_blank"><font face="Arial" size="3" color="#00FFFF"><b>Telegram</b></font></a><br>
    <font face="Arial" size="2">интернет-пейджер, пишите прямо туда</font>
  </td>
</tr>
<tr valign="middle">
  <td align="center"><img src="/img/camera.gif" width="34" height="41" alt="фото" border="0"></td>
  <td>
    <a href="${SITE.instagram}" target="_blank"><font face="Arial" size="3" color="#00FFFF"><b>Instagram</b></font></a><br>
    <font face="Arial" size="2">мои фотки, обновляется чаще этой странички</font>
  </td>
</tr>
<tr valign="middle">
  <td align="center"><img src="/img/email.gif" width="34" height="31" alt="письмо" border="0"></td>
  <td>
    <a href="/guestbook"><font face="Arial" size="3" color="#00FFFF"><b>Гостевая книга</b></font></a><br>
    <font face="Arial" size="2">самый надёжный способ: напишите пару строк, я прочитаю</font>
  </td>
</tr>
</table>`,
)}

${divider()}

${panel(
  "Мои любимые сайты",
  html`<table border="0" cellpadding="3" cellspacing="0" width="100%">${rows}</table>
<br>
<font face="Arial" size="1" color="#9999CC">
Ссылки открываются в новом окне. Некоторые сайты уже переехали &mdash;
тогда ссылка ведёт в Архив Интернета, там они как новенькие.
</font>`,
)}

${divider()}

<center>
<table border="0" cellpadding="2" cellspacing="0" bgcolor="#6666CC"><tr><td>
<table border="0" cellpadding="8" cellspacing="0" bgcolor="#000066"><tr><td align="center">
  <font face="Arial" size="2" color="#FFFFFF"><b>Кольцо персональных страничек</b></font><br><br>
  <font face="Arial" size="2">
  [ <a href="/home">&laquo; Назад</a> ]
  [ <a href="/home">Случайная</a> ]
  [ <a href="/home">Вперёд &raquo;</a> ]
  </font>
  <br><br>
  <font face="Arial" size="1" color="#9999CC">В кольце состоит 1 сайт. Пока что.</font>
</td></tr></table>
</td></tr></table>
<br>
<font face="Arial" size="2" color="#FFFFFF">
Хотите обменяться ссылками? Пишите в
<a href="/guestbook">гостевую книгу</a>!
</font>
</center>

${footer()}`;

  return contentPage(`Мои ссылки :: ${SITE.owner}`, body);
}
