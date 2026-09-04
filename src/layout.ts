import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";

export type Html = HtmlEscapedString | Promise<HtmlEscapedString>;

export const SITE = {
  owner: "Сергей Зотов",
  ownerGen: "Сергея Зотова",
  nick: "zotovby",
  updated: "4 сентября 2026 г.",
  telegram: "https://t.me/zotovby",
  instagram: "https://www.instagram.com/zotovby/",
} as const;

/** Шапка документа. Одна на все страницы — как один общий header.inc в 1999-м. */
function head(title: string): Html {
  return html`<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="author" content="${SITE.owner}">
<meta name="generator" content="Notepad">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<title>${title}</title>`;
}

const STATUS_TICKER = `
<script language="JavaScript" type="text/javascript">
<!--
// Бегущая строка в строке состояния браузера. Классика жанра.
var tickerText = "                 *** Добро пожаловать на мою домашнюю страничку! *** Не забудь оставить запись в гостевой книге! *** Лучше всего смотреть в Netscape Navigator 4.0 *** ";
var tickerPos = 0;
function scrollStatus() {
  window.status = tickerText.substring(tickerPos) + tickerText.substring(0, tickerPos);
  tickerPos = (tickerPos + 1) % tickerText.length;
  window.setTimeout("scrollStatus()", 150);
}
scrollStatus();
// -->
</script>`;

/**
 * Обычная страница внутри правого фрейма.
 * Атрибуты body — bgcolor/text/link/vlink — именно так, как это делали до CSS.
 */
export function contentPage(title: string, body: Html): Html {
  return html`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
${head(title)}
</head>
<body background="/img/bg_stars.gif" bgcolor="#000033" text="#FFFF99" link="#00FFFF" vlink="#FF66FF" alink="#FF0000" leftmargin="8" topmargin="8">
<script language="JavaScript" type="text/javascript" src="/cursor.js"></script>
${raw(STATUS_TICKER)}
<font face="Arial, Helvetica, sans-serif" size="2" color="#FFFF99">
${body}
</font>
</body>
</html>`;
}

/** Заголовок раздела: звёздочки по бокам, Comic Sans, тень средствами 1998 года (её нет). */
export function heading(text: string): Html {
  return html`<center>
<table border="0" cellpadding="0" cellspacing="0"><tr>
<td valign="middle"><img src="/img/sparkle.gif" width="32" height="32" alt="*" border="0"></td>
<td valign="middle"><font face="Comic Sans MS, Arial" size="6" color="#FFCC00"><b>&nbsp;${text}&nbsp;</b></font></td>
<td valign="middle"><img src="/img/sparkle.gif" width="32" height="32" alt="*" border="0"></td>
</tr></table>
</center>
<div align="center"><img src="/img/rainbow_line.gif" width="90%" height="6" alt="----------"></div>
<br>`;
}

export function divider(): Html {
  return html`<div align="center"><br><img src="/img/rainbow_line.gif" width="90%" height="6" alt="----------"><br><br></div>`;
}

export function cautionLine(): Html {
  return html`<div align="center"><br><img src="/img/caution_line.gif" width="90%" height="18" alt="=========="><br><br></div>`;
}

/** Подвал раздела: назад на главную + дата обновления. */
export function footer(): Html {
  return html`${divider()}
<center>
<font face="Arial" size="1" color="#9999CC">
[ <a href="/home">Главная</a> |
<a href="/guestbook">Гостевая книга</a> |
<a href="/about">Обо мне</a> ]
<br><br>
Последнее обновление: ${SITE.updated}<br>
&copy; 1999&ndash;2026 ${SITE.owner}. Все права защищены.<br>
Страничка сделана вручную в Блокноте.
</font>
</center>`;
}

/** Рамка «окошко» — псевдо-3D бордюр таблицами, как рисовали до border-radius. */
export function panel(title: string, body: Html, width = "100%"): Html {
  return html`<table border="0" cellpadding="1" cellspacing="0" width="${width}" bgcolor="#6666CC">
<tr><td>
  <table border="0" cellpadding="4" cellspacing="0" width="100%" bgcolor="#000066">
    <tr bgcolor="#3333AA">
      <td><font face="Arial" size="2" color="#FFFFFF"><b>${title}</b></font></td>
    </tr>
    <tr>
      <td><font face="Arial" size="2" color="#FFFF99">${body}</font></td>
    </tr>
  </table>
</td></tr>
</table>`;
}
