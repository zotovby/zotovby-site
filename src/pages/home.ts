import { html } from "hono/html";
import { SITE, contentPage, divider, footer, panel, type Html } from "../layout.js";

/** Счётчик-одометр: каждая цифра — отдельная картинка, ровно как у web-counter'ов. */
export function counter(hits: number): Html {
  const digits = String(hits).padStart(6, "0").split("");
  return html`<table border="0" cellpadding="0" cellspacing="0" bgcolor="#000000"><tr>
${digits.map(
  (d) => html`<td><img src="/img/dig/${d}.gif" width="20" height="43" alt="${d}" border="0"></td>`,
)}
</tr></table>`;
}

export function homePage(hits: number): Html {
  const body = html`<center>
<img src="/img/welcome.gif" width="240" height="143" alt="Welcome!" border="0">
<br>
<font face="Comic Sans MS, Arial" size="5" color="#FFCC00">
<b>Привет! Ты попал на страничку ${SITE.ownerGen}!</b>
</font>
<br><br>
<marquee behavior="scroll" direction="left" scrollamount="4" width="90%" bgcolor="#330066">
<font face="Arial" size="3" color="#00FF00">
&nbsp;&nbsp;*** Эта страничка обновляется! *** Оставь запись в гостевой книге! ***
Скоро в фотоальбоме появятся новые фотки! *** Спасибо, что зашёл! ***&nbsp;&nbsp;
</font>
</marquee>
<br>
</center>

${panel(
  "Немного обо мне",
  html`<img src="/img/computer.gif" width="72" height="96" alt="компьютер" border="0" align="left" hspace="10" vspace="4">
Меня зовут ${SITE.owner}, и я увлекаюсь компьютерами,
Интернетом и всем, что с ними связано. Эту страничку я сделал сам, вручную, в Блокноте &mdash;
чтобы рассказать о себе, показать свои фотки и просто познакомиться с хорошими людьми.
<br><br>
Заходи почаще, тут постоянно что-нибудь новенькое! И обязательно
<a href="/guestbook">оставь запись в гостевой книге</a> &mdash; мне будет очень приятно.
<br clear="all">`,
)}

${divider()}

<center>
<font face="Arial" size="2" color="#FFFFFF"><b>Вы посетитель номер:</b></font>
<br><br>
${counter(hits)}
<br>
<font face="Arial" size="1" color="#9999CC">счётчик работает с 12.03.1999</font>
<br><br>
</center>

${divider()}

${panel(
  "Что нового на сайте",
  html`<table border="0" cellpadding="3" cellspacing="0" width="100%">
<tr valign="top">
  <td width="90"><font face="Arial" size="1" color="#00FF00">04.09.2026</font></td>
  <td><font face="Arial" size="2">Заработала <a href="/guestbook">гостевая книга</a>! Пишите!
    <img src="/img/new.gif" width="20" height="20" alt="NEW!" border="0"></font></td>
</tr>
<tr valign="top">
  <td><font face="Arial" size="1" color="#00FF00">04.09.2026</font></td>
  <td><font face="Arial" size="2">Добавил <a href="/vote">голосовалку</a> &mdash; оцени мою страничку!
    <img src="/img/new.gif" width="20" height="20" alt="NEW!" border="0"></font></td>
</tr>
<tr valign="top">
  <td><font face="Arial" size="1" color="#00FF00">01.09.2026</font></td>
  <td><font face="Arial" size="2">Обновил раздел <a href="/computer">Мой компьютер</a> &mdash; поставил новую видеокарту!</font></td>
</tr>
<tr valign="top">
  <td><font face="Arial" size="1" color="#00FF00">12.03.1999</font></td>
  <td><font face="Arial" size="2">Страничка открыта. Ура!</font></td>
</tr>
</table>`,
)}

${divider()}

<center>
<img src="/img/construction_sign.gif" width="132" height="100" alt="Under construction" border="0">
<br>
<font face="Arial" size="2" color="#FF6666">
<b>Раздел «Фотоальбом» пока в разработке.</b><br>
Приходите позже!
</font>
<br><br>
</center>

${divider()}

<center>
<font face="Arial" size="2" color="#FFFFFF"><b>Эта страничка сделана при помощи:</b></font>
<br><br>
<table border="0" cellpadding="5" cellspacing="0">
<tr>
  <td><img src="/img/btn/notepad.gif" width="88" height="31" alt="Built with Notepad" border="0"></td>
  <td><img src="/img/btn/netscape.gif" width="88" height="31" alt="Netscape Now!" border="0"></td>
  <td><img src="/img/btn/msie.gif" width="88" height="31" alt="Internet Explorer" border="0"></td>
  <td><img src="/img/btn/html401.gif" width="88" height="31" alt="Valid HTML 4.01" border="0"></td>
</tr>
<tr>
  <td><img src="/img/btn/apache.gif" width="88" height="31" alt="Powered by Apache" border="0"></td>
  <td><img src="/img/btn/geocities.gif" width="88" height="31" alt="GeoCities" border="0"></td>
  <td><img src="/img/btn/winamp.gif" width="88" height="31" alt="Winamp" border="0"></td>
  <td><img src="/img/btn/best800x600.gif" width="88" height="31" alt="Best viewed 800x600" border="0"></td>
</tr>
<tr>
  <td><img src="/img/btn/mp3.gif" width="88" height="31" alt="MP3" border="0"></td>
  <td><img src="/img/btn/icq.gif" width="88" height="31" alt="Get ICQ" border="0"></td>
  <td><img src="/img/btn/amd.gif" width="88" height="31" alt="Powered by AMD" border="0"></td>
  <td><img src="/img/btn/exploiter.gif" width="88" height="31" alt="Internet Exploiter" border="0"></td>
</tr>
</table>
<br>
<font face="Arial" size="1" color="#9999CC">
Хочешь такую же кнопочку у себя? Возьми любую, они бесплатные!
</font>
</center>

${footer()}`;

  return contentPage(`Домашняя страничка ${SITE.ownerGen}`, body);
}
