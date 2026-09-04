import { html } from "hono/html";
import { SITE, type Html } from "../layout.js";

/** Фреймы. Меню слева, содержимое справа — вершина веб-дизайна 1999 года. */
export function framesPage(): Html {
  return html`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<title>Домашняя страничка ${SITE.ownerGen}</title>
</head>
<frameset cols="185,*" border="2" frameborder="yes" framespacing="2">
  <frame src="/menu" name="menu" marginwidth="0" marginheight="0" scrolling="auto" noresize>
  <frame src="/home" name="main" marginwidth="0" marginheight="0" scrolling="auto">
  <noframes>
    <body bgcolor="#000033" text="#FFFF99" link="#00FFFF">
      <center>
      <font face="Arial" size="3">
      Ваш браузер не поддерживает фреймы!<br>
      Скачайте себе <b>Netscape Navigator 4.0</b>, а пока пройдите
      <a href="/home">по этой ссылке</a>.
      </font>
      </center>
    </body>
  </noframes>
</frameset>
</html>`;
}
