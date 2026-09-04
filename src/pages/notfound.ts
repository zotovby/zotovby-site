import { html } from "hono/html";
import { SITE, contentPage, divider, type Html } from "../layout.js";

export function notFoundPage(): Html {
  const body = html`<center>
<br>
<font face="Arial Black, Arial" size="7" color="#FF0000"><b>ОШИБКА 404</b></font>
<br>
<font face="Comic Sans MS, Arial" size="5" color="#FFCC00"><b>Страница не найдена!</b></font>
<br><br>
<img src="/img/skull.gif" width="91" height="100" alt="404" border="0">
<br><br>
<table border="0" cellpadding="2" cellspacing="0" bgcolor="#6666CC" width="70%"><tr><td>
<table border="0" cellpadding="10" cellspacing="0" bgcolor="#000044" width="100%"><tr><td>
<font face="Arial" size="2" color="#FFFF99">
Такой странички у меня нет. Возможные причины:
<ul>
  <li>Вы неправильно набрали адрес &mdash; проверьте раскладку!</li>
  <li>Страничка ещё не сделана (я работаю над этим)</li>
  <li>Страничка была, но я её убрал</li>
  <li>Оборвалась связь с провайдером &mdash; попробуйте перезвонить</li>
</ul>
</font>
</td></tr></table>
</td></tr></table>

${divider()}

<font face="Arial" size="3">
<a href="/home">Вернуться на главную страницу</a>
</font>
<br><br>
<img src="/img/construction.gif" width="208" height="81" alt="Under construction" border="0">
<br><br>
</center>`;

  return contentPage(`Ошибка 404 :: ${SITE.owner}`, body);
}
