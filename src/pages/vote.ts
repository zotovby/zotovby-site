import { html } from "hono/html";
import { SITE, contentPage, divider, footer, heading, panel, type Html } from "../layout.js";
import { VOTE_OPTIONS, type VoteTally } from "../db.js";

/** Полоска результата: растянутая по ширине ячейка — так рисовали графики до CSS. */
function bar(percent: number): Html {
  const width = Math.round(percent);
  return html`<table border="0" cellpadding="0" cellspacing="0" width="200" bgcolor="#000033"><tr>
  ${width > 0
    ? html`<td width="${width}%" bgcolor="#00CC00" height="14"><img src="/img/dot.gif" width="1" height="14" alt="" border="0"></td>`
    : ""}
  <td bgcolor="#222255"><img src="/img/dot.gif" width="1" height="14" alt="" border="0"></td>
</tr></table>`;
}

export function votePage(tally: VoteTally, hasVoted: boolean): Html {
  const total = Object.values(tally).reduce((sum, n) => sum + n, 0);

  const results = VOTE_OPTIONS.map((option) => {
    const count = tally[option] ?? 0;
    const percent = total === 0 ? 0 : (count / total) * 100;
    return html`<tr valign="middle">
  <td width="190"><font face="Arial" size="2" color="#FFFF99">${option}</font></td>
  <td width="210">${bar(percent)}</td>
  <td><font face="Arial" size="2" color="#00FF00"><b>${count}</b></font>
      <font face="Arial" size="1" color="#9999CC">(${percent.toFixed(1)}%)</font></td>
</tr>
<tr><td colspan="3" height="6"></td></tr>`;
  });

  const form = VOTE_OPTIONS.map(
    (option) => html`<tr>
  <td width="24"><input type="radio" name="option" value="${option}"></td>
  <td><font face="Arial" size="2" color="#FFFF99">${option}</font></td>
</tr>`,
  );

  const body = html`${heading("Голосовалка")}

<center>
<img src="/img/vote.gif" width="121" height="55" alt="Vote!" border="0">
<br><br>
<font face="Arial" size="3" color="#FFCC00"><b>Как Вам моя страничка?</b></font>
<br><br>
</center>

${hasVoted
    ? html`<center>
<table border="0" cellpadding="8" cellspacing="0" bgcolor="#004400" width="70%"><tr><td align="center">
<font face="Arial" size="2" color="#00FF00"><b>Спасибо, Ваш голос принят!</b></font>
</td></tr></table>
</center><br>`
    : panel(
        "Ваш голос",
        html`<form action="/vote" method="post">
<table border="0" cellpadding="3" cellspacing="0">
${form}
<tr><td></td><td><br><input type="submit" value="  Голосовать!  "></td></tr>
</table>
</form>`,
      )}

${divider()}

${panel(
  "Результаты",
  html`<table border="0" cellpadding="3" cellspacing="0" width="100%">${results}</table>
<br>
<font face="Arial" size="2" color="#FFFFFF">Всего проголосовало: <b>${total}</b></font>`,
)}

<br>
<center>
<font face="Arial" size="1" color="#9999CC">
Голосовать можно один раз. Честно-честно, я проверяю по cookies!
</font>
</center>

${footer()}`;

  return contentPage(`Голосовалка :: ${SITE.owner}`, body);
}
