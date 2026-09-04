import { html } from "hono/html";
import { SITE, contentPage, divider, footer, heading, panel, type Html } from "../layout.js";

type Spec = { part: string; value: string };

/** Раздел, который заводили все: похвастаться железом. */
const SPECS: Spec[] = [
  { part: "Процессор", value: "AMD Athlon 1000 МГц (разогнан до 1100!)" },
  { part: "Материнская плата", value: "ABIT KT7A-RAID" },
  { part: "Оперативная память", value: "256 Мб PC133 SDRAM" },
  { part: "Видеокарта", value: "nVidia GeForce2 MX 32 Мб" },
  { part: "Звуковая карта", value: "Creative Sound Blaster Live! 1024" },
  { part: "Жёсткий диск", value: "IBM DTLA 40 Гб, 7200 об/мин" },
  { part: "Привод", value: "CD-RW ASUS 24x10x40, пишет болванки!" },
  { part: "Монитор", value: 'ViewSonic 17", 1024x768 при 85 Гц' },
  { part: "Модем", value: "US Robotics 56K, внешний" },
  { part: "Операционная система", value: "Windows 98 SE (и Windows 2000 второй системой)" },
  { part: "Корпус", value: "ATX midi tower, с окошком и подсветкой" },
];

export function computerPage(): Html {
  const rows = SPECS.map(
    (spec) => html`<tr valign="top">
  <td width="190" bgcolor="#1a1a5e"><font face="Arial" size="2" color="#00FFFF"><b>${spec.part}</b></font></td>
  <td><font face="Arial" size="2" color="#FFFF99">${spec.value}</font></td>
</tr>
<tr><td colspan="2" height="2"></td></tr>`,
  );

  const body = html`${heading("Мой компьютер")}

<center>
<img src="/img/computer.gif" width="90" height="120" alt="Мой компьютер" border="0">
<br><br>
<font face="Arial" size="2" color="#FFFFFF">
Вот на чём я сижу. Собирал сам, по винтику!
</font>
<br><br>
</center>

${panel("Конфигурация", html`<table border="0" cellpadding="4" cellspacing="1" width="100%">${rows}</table>`)}

${divider()}

${panel(
  "Софт, без которого никуда",
  html`<table border="0" cellpadding="4" cellspacing="0" width="100%">
<tr valign="top">
  <td width="190"><font face="Arial" size="2" color="#00FFFF"><b>Браузер</b></font></td>
  <td><font face="Arial" size="2">Netscape Navigator 4.0 и Internet Explorer 5.0</font></td>
</tr>
<tr valign="top">
  <td><font face="Arial" size="2" color="#00FFFF"><b>Музыка</b></font></td>
  <td><font face="Arial" size="2">Winamp 2.xx &mdash; it really whips the llama's ass!</font></td>
</tr>
<tr valign="top">
  <td><font face="Arial" size="2" color="#00FFFF"><b>Общение</b></font></td>
  <td><font face="Arial" size="2">ICQ 99b и The Bat! для почты</font></td>
</tr>
<tr valign="top">
  <td><font face="Arial" size="2" color="#00FFFF"><b>Качалка</b></font></td>
  <td><font face="Arial" size="2">ReGet &mdash; докачивает после обрыва связи</font></td>
</tr>
<tr valign="top">
  <td><font face="Arial" size="2" color="#00FFFF"><b>Веб-дизайн</b></font></td>
  <td><font face="Arial" size="2">Блокнот. Только Блокнот.</font></td>
</tr>
</table>`,
)}

${divider()}

<center>
<table border="0" cellpadding="6" cellspacing="0"><tr>
  <td><img src="/img/modem.gif" width="100" height="61" alt="modem" border="0"></td>
  <td>
    <font face="Arial" size="2" color="#FFFFFF">
    В Интернет выхожу по модему.<br>
    Дозваниваюсь иногда с двадцатого раза,<br>
    зато ночью связь держит стабильно!
    </font>
  </td>
</tr></table>
<br>
<table border="0" cellpadding="5" cellspacing="0"><tr>
  <td><img src="/img/btn/amd.gif" width="88" height="31" alt="AMD" border="0"></td>
  <td><img src="/img/btn/winamp.gif" width="88" height="31" alt="Winamp" border="0"></td>
  <td><img src="/img/btn/mp3.gif" width="88" height="31" alt="MP3" border="0"></td>
</tr></table>
</center>

${footer()}`;

  return contentPage(`Мой компьютер :: ${SITE.owner}`, body);
}
