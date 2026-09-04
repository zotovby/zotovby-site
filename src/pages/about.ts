import { html } from "hono/html";
import { SITE, contentPage, divider, footer, heading, panel, type Html } from "../layout.js";

type Row = { label: string; value: Html };

const ANKETA: Row[] = [
  { label: "Имя", value: html`${SITE.owner}` },
  { label: "Ник в сети", value: html`<b>${SITE.nick}</b>` },
  { label: "Возраст", value: html`<font color="#FF6666">(секрет!)</font>` },
  { label: "Знак зодиака", value: html`<font color="#FF6666">???</font>` },
  { label: "Любимая музыка", value: html`<font color="#FF6666">тут будет список, честное слово</font>` },
  { label: "Любимый фильм", value: html`<font color="#FF6666">пока не решил :)</font>` },
  { label: "Любимый цвет", value: html`синий, как Netscape` },
  { label: "Любимый браузер", value: html`Netscape Navigator 4.0 (и не спорьте!)` },
  { label: "Домашняя страничка", value: html`<a href="/home">zotov.by</a> &mdash; вот эта самая` },
];

export function aboutPage(): Html {
  const rows = ANKETA.map(
    (row) => html`<tr valign="top">
  <td width="170" bgcolor="#1a1a5e"><font face="Arial" size="2" color="#00FFFF"><b>${row.label}:</b></font></td>
  <td><font face="Arial" size="2" color="#FFFF99">${row.value}</font></td>
</tr>
<tr><td colspan="2" height="2"></td></tr>`,
  );

  const body = html`${heading("Обо мне")}

<center>
<font face="Arial" size="2" color="#FFFFFF">
Раз уж Вы сюда зашли &mdash; давайте знакомиться!<br>
Вот <b>моя анкета</b>, всё как полагается.
</font>
<br><br>
</center>

${panel(
  "Анкета",
  html`<table border="0" cellpadding="4" cellspacing="1" width="100%">
${rows}
</table>`,
)}

${divider()}

${panel(
  "Мои увлечения",
  html`<ul>
  <li><font face="Arial" size="2">Компьютеры и всё, что внутри них</font></li>
  <li><font face="Arial" size="2">Интернет (сижу ночами, когда трафик дешевле)</font></li>
  <li><font face="Arial" size="2">Фотография &mdash; смотрите <a href="/photos">мой фотоальбом</a></font></li>
  <li><font face="Arial" size="2">Музыка в формате MP3</font></li>
  <li><font face="Arial" size="2">Собираю ссылки на интересные сайты &mdash; <a href="/links">вот они</a></font></li>
</ul>`,
)}

${divider()}

<center>
<img src="/img/construction.gif" width="208" height="81" alt="Under construction" border="0">
<br>
<font face="Arial" size="2" color="#FF6666">
Этот раздел ещё не дописан. Загляните попозже!
</font>
<br><br>
<font face="Arial" size="2" color="#FFFFFF">
Хотите узнать больше? Спросите меня в
<a href="/guestbook">гостевой книге</a>!
</font>
</center>

${footer()}`;

  return contentPage(`Обо мне :: ${SITE.owner}`, body);
}
