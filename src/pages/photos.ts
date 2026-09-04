import { html } from "hono/html";
import { SITE, contentPage, divider, footer, heading, type Html } from "../layout.js";

const SLOTS = [
  "Я и мой компьютер",
  "Летом на даче",
  "С друзьями",
  "Мой рабочий стол",
  "Новый год",
  "Просто хорошая фотка",
];

export function photosPage(): Html {
  const cells = SLOTS.map(
    (caption) => html`<td align="center" valign="top" width="33%">
  <table border="0" cellpadding="2" cellspacing="0" bgcolor="#6666CC"><tr><td>
    <table border="0" cellpadding="0" cellspacing="0" bgcolor="#000000" width="120" height="90"><tr>
      <td align="center" valign="middle">
        <img src="/img/camera.gif" width="46" height="56" alt="фотография" border="0"><br>
        <font face="Arial" size="1" color="#666699">нет фото</font>
      </td>
    </tr></table>
  </td></tr></table>
  <font face="Arial" size="1" color="#FFFF99">${caption}</font>
  <br><br>
</td>`,
  );

  const body = html`${heading("Фотоальбом")}

<center>
<img src="/img/construction_sign.gif" width="151" height="115" alt="Under construction" border="0">
<br>
<font face="Arial" size="3" color="#FF6666"><b>Раздел в разработке!</b></font>
<br><br>
<font face="Arial" size="2" color="#FFFFFF">
Фотки уже отсканированы, осталось только их сюда положить.<br>
Сканер у друга, договорился на выходные. Заходите на следующей неделе!
</font>
<br><br>
</center>

${divider()}

<center>
<font face="Arial" size="2" color="#FFFFFF">
<b>Так это будет выглядеть.</b> Щёлкните по фотке, чтобы увеличить.
</font>
<br><br>
<table border="0" cellpadding="8" cellspacing="0" width="90%">
<tr>${cells.slice(0, 3)}</tr>
<tr>${cells.slice(3)}</tr>
</table>
<br>
<font face="Arial" size="1" color="#9999CC">
Внимание! Каждая фотография весит около 40&nbsp;Кб.<br>
При медленном соединении загрузка может занять время.
</font>
<br><br>
<font face="Arial" size="2" color="#FFFFFF">
А пока свежие фотки можно посмотреть
<a href="${SITE.instagram}" target="_blank">вот здесь</a>.
</font>
</center>

${footer()}`;

  return contentPage(`Фотоальбом :: ${SITE.owner}`, body);
}
