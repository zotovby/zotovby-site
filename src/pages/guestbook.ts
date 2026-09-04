import { html } from "hono/html";
import {
  SITE,
  contentPage,
  divider,
  footer,
  heading,
  panel,
  type Html,
} from "../layout.js";
import type { GuestEntry } from "../db.js";

function formatDate(date: Date): string {
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function entryBlock(entry: GuestEntry, index: number): Html {
  const homepage = entry.homepage.trim();
  return html`<table border="0" cellpadding="1" cellspacing="0" width="100%" bgcolor="#6666CC">
<tr><td>
  <table border="0" cellpadding="6" cellspacing="0" width="100%" bgcolor="#000044">
    <tr bgcolor="#28286e">
      <td>
        <font face="Arial" size="2" color="#00FF00"><b>${entry.name}</b></font>
        ${entry.city.trim() ? html`<font face="Arial" size="1" color="#9999CC"> из города ${entry.city}</font>` : ""}
        ${homepage
          ? html`<font face="Arial" size="1"> &nbsp;[ <a href="${homepage}" target="_blank" rel="nofollow noopener"><font color="#00FFFF">домашняя страничка</font></a> ]</font>`
          : ""}
      </td>
      <td align="right" width="170">
        <font face="Arial" size="1" color="#9999CC">запись №${index} &nbsp;&middot;&nbsp; ${formatDate(entry.createdAt)}</font>
      </td>
    </tr>
    <tr>
      <td colspan="2"><font face="Arial" size="2" color="#FFFF99">${entry.message}</font></td>
    </tr>
  </table>
</td></tr>
</table>
<br>`;
}

export function guestbookPage(entries: GuestEntry[], total: number, error?: string): Html {
  const list = entries.length
    ? entries.map((entry, i) => entryBlock(entry, total - i))
    : [
        html`<center><br>
<font face="Arial" size="3" color="#FF6666"><b>В книге пока нет ни одной записи!</b></font><br><br>
<font face="Arial" size="2" color="#FFFFFF">Будьте первым &mdash; напишите пару слов.</font>
<br><br></center>`,
      ];

  const body = html`${heading("Гостевая книга")}

<center>
<img src="/img/guestbook.gif" width="82" height="90" alt="Guest book" border="0">
<br>
<font face="Arial" size="2" color="#FFFFFF">
Вы зашли ко мне в гости &mdash; не уходите молча!<br>
Напишите, откуда Вы и как Вам моя страничка.
</font>
<br><br>
</center>

${error
    ? html`<center>
<table border="0" cellpadding="8" cellspacing="0" bgcolor="#AA0000" width="80%"><tr><td align="center">
<font face="Arial" size="2" color="#FFFFFF"><b>Ошибка!</b> ${error}</font>
</td></tr></table>
</center><br>`
    : ""}

${panel(
  "Оставить запись",
  html`<form action="/guestbook" method="post">
<table border="0" cellpadding="4" cellspacing="0" width="100%">
<tr valign="middle">
  <td width="170"><font face="Arial" size="2" color="#00FFFF">Ваше имя <font color="#FF6666">*</font></font></td>
  <td><input type="text" name="name" size="30" maxlength="40"></td>
</tr>
<tr valign="middle">
  <td><font face="Arial" size="2" color="#00FFFF">Откуда Вы</font></td>
  <td><input type="text" name="city" size="30" maxlength="40"></td>
</tr>
<tr valign="middle">
  <td><font face="Arial" size="2" color="#00FFFF">Ваша страничка</font></td>
  <td><input type="text" name="homepage" size="30" maxlength="120" value="http://"></td>
</tr>
<tr valign="top">
  <td><font face="Arial" size="2" color="#00FFFF">Сообщение <font color="#FF6666">*</font></font></td>
  <td><textarea name="message" cols="46" rows="6" wrap="virtual"></textarea></td>
</tr>
<tr>
  <td></td>
  <td>
    <input type="text" name="homepage_url" value="" style="display:none" tabindex="-1" autocomplete="off">
    <input type="submit" value="  Оставить запись!  ">
    <input type="reset" value="  Очистить  ">
  </td>
</tr>
</table>
<font face="Arial" size="1" color="#9999CC">
Поля, отмеченные звёздочкой, обязательны. HTML-теги в сообщении не работают.
</font>
</form>`,
)}

${divider()}

<center>
<font face="Arial" size="3" color="#FFCC00"><b>Записей в книге: ${total}</b></font>
<br><br>
</center>

${list}

${footer()}`;

  return contentPage(`Гостевая книга :: ${SITE.owner}`, body);
}
