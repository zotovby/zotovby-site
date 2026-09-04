import { html, raw } from "hono/html";
import { SITE, type Html } from "../layout.js";

type MenuItem = { href: string; label: string; isNew?: boolean };

const ITEMS: MenuItem[] = [
  { href: "/home", label: "Главная" },
  { href: "/about", label: "Обо мне" },
  { href: "/computer", label: "Мой компьютер" },
  { href: "/photos", label: "Фотоальбом" },
  { href: "/links", label: "Мои ссылки" },
  { href: "/guestbook", label: "Гостевая книга", isNew: true },
  { href: "/vote", label: "Голосовалка", isNew: true },
];

/**
 * Левый фрейм. Здесь же играет фоновая музыка — меню не перезагружается
 * при переходах, значит мелодия не начинается заново. Хитрость эпохи.
 */
export function menuPage(music: boolean): Html {
  const sound = music
    ? `<bgsound src="/music/theme.mid" loop="infinite">
<embed src="/music/theme.mid" autostart="true" loop="true" hidden="true" width="0" height="0">`
    : "";

  const items = ITEMS.map(
    (item) => html`<tr>
  <td valign="middle" width="14"><font color="#FFCC00">&#9658;</font></td>
  <td valign="middle">
    <a href="${item.href}" target="main"><font face="Arial" size="2" color="#00FFFF">${item.label}</font></a>${
      item.isNew
        ? html` <img src="/img/new.gif" width="20" height="20" alt="NEW!" border="0">`
        : ""
    }
  </td>
</tr>
<tr><td colspan="2" height="6"></td></tr>`,
  );

  return html`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Меню</title>
</head>
<body background="/img/bg_stars.gif" bgcolor="#000033" text="#FFFF99" link="#00FFFF" vlink="#FF66FF" alink="#FF0000" leftmargin="6" topmargin="8" marginwidth="6" marginheight="8">
${raw(sound)}
<center>
<img src="/img/globe.gif" width="65" height="60" alt="globe" border="0"><br>
<font face="Comic Sans MS, Arial" size="3" color="#FFCC00"><b>${SITE.owner}</b></font><br>
<font face="Arial" size="1" color="#9999CC">персональная страничка</font>
<br><br>
<img src="/img/rainbow_line.gif" width="150" height="5" alt="------"><br><br>
</center>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
${items}
</table>

<br>
<center>
<img src="/img/rainbow_line.gif" width="150" height="5" alt="------"><br><br>
<a href="${SITE.telegram}" target="_blank"><img src="/img/icq.gif" width="32" height="32" alt="Напиши мне!" border="0"></a>
<br>
<font face="Arial" size="1" color="#9999CC">интернет-пейджер</font>
<br><br>
<a href="/menu?music=${music ? "off" : "on"}"><font face="Arial" size="1" color="#00FF00">
&#9834; музыка: ${music ? "ВКЛ" : "ВЫКЛ"}
</font></a>
<br><br>
<font face="Arial" size="1" color="#666699">
Открыта<br>12.03.1999<br><br>
Сделано<br>в Блокноте
</font>
</center>
</body>
</html>`;
}
