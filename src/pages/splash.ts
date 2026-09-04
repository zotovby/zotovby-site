import { html } from "hono/html";
import { SITE, type Html } from "../layout.js";

/** Заставка. Без неё в 1999-м на страницу не пускали. */
export function splashPage(): Html {
  return html`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="description" content="Домашняя страничка ${SITE.ownerGen} (${SITE.nick})">
<meta name="keywords" content="домашняя страничка, персональная страница, ${SITE.nick}, ${SITE.owner}">
<meta name="generator" content="Notepad">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<title>Домашняя страничка ${SITE.ownerGen} :: ВХОД</title>
</head>
<body background="/img/bg_stars.gif" bgcolor="#000000" text="#FFFF99" link="#00FFFF" vlink="#FF66FF" alink="#FF0000">
<center>
<br>
<img src="/img/welcome.gif" width="240" height="143" alt="Welcome!" border="0">
<br><br>
<font face="Comic Sans MS, Arial" size="6" color="#FFCC00"><b>Домашняя страничка</b></font>
<br>
<font face="Comic Sans MS, Arial" size="7" color="#00FF00"><b>${SITE.ownerGen}</b></font>
<br><br>
<img src="/img/globe.gif" width="108" height="100" alt="Земной шар" border="0">
<br><br>

<table border="0" cellpadding="2" cellspacing="0" bgcolor="#CC0000"><tr><td>
<table border="0" cellpadding="10" cellspacing="0" bgcolor="#000000"><tr><td align="center">
  <a href="/main"><font face="Arial Black, Arial" size="6" color="#FFFF00"><b>&nbsp;&nbsp;В&nbsp;&nbsp;Х&nbsp;&nbsp;О&nbsp;&nbsp;Д&nbsp;&nbsp;</b></font></a>
  <br>
  <font face="Arial" size="1" color="#888888">[ enter ]</font>
</td></tr></table>
</td></tr></table>

<br>
<img src="/img/caution_line.gif" width="80%" height="18" alt="==========">
<br><br>

<font face="Arial" size="2" color="#FFFFFF">
<b>ВНИМАНИЕ!</b><br>
Эта страница использует <b>фреймы</b>, <b>JavaScript&nbsp;1.2</b> и <b>фоновую музыку</b> в формате MIDI.<br>
Если у Вас старый браузер &mdash; некоторые эффекты могут не работать.
</font>

<br><br>
<table border="0" cellpadding="6" cellspacing="0">
<tr>
  <td align="center"><img src="/img/btn/netscape.gif" width="88" height="31" alt="Netscape Now!" border="0"></td>
  <td align="center"><img src="/img/btn/msie.gif" width="88" height="31" alt="Microsoft Internet Explorer" border="0"></td>
  <td align="center"><img src="/img/btn/best800x600.gif" width="88" height="31" alt="Best viewed 800x600" border="0"></td>
</tr>
</table>

<font face="Arial" size="1" color="#9999CC">
Страничка оптимизирована для Netscape Navigator 4.0 и MS Internet Explorer 4.0<br>
при разрешении экрана 800x600 точек и глубине цвета High Color (16 бит).<br>
<br>
Полная загрузка при скорости 33&nbsp;600&nbsp;бит/с занимает около 40&nbsp;секунд.<br>
Наберитесь терпения, оно того стоит!
</font>

<br><br>
<img src="/img/modem.gif" width="80" height="49" alt="modem 56k" border="0">
<br><br>
</center>
</body>
</html>`;
}
