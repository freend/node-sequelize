## Router folder
#### routes/sysCode.js
call get('/', function ~~~);에서<br>
"`var sysinfo = sequelize.define('sysInfo', {"`이면<br>
"`models.sysInfo.findAll().then(function (value) {"`으로 해야한다. 아니면 undefined error 발생.

#### async
node 는 비동기화 함수로 여려번의 쿼리를 실행했을 때 먼저 결과가 나온걸 반환한다.<br>
그것을 동기화 방식으로 만들기 위해서 사용하는게 async이다. 
"`const async = require('async');"`로 선언한다.<br>
<br>
async 함수는 다음의 3가지가 있다.<br>
series : 순차적으로 실행하긴 하나 앞의 결과가 뒤에 영향을 끼치지 않는다.<br>
Waterfall : 순차적이며 앞의 결과를 가지고 뒤에 결과를 응용한다.<br>
parallel : 이건 동시로 실행해서 모든 결과를 다 모은 후에 결과를 반영한다.<br>
<br>
위의 경우로 따지면 Waterfall과 parallel이 많이 쓰일 거 같다.<br>
callback을 선언할 때 "`callback(null, result)"`로 선언을 하는데<br>
stack에서 다음의 내용을 보았다.<br>
By convention in node, the first argument to a callback is usually used to indicate an error. If it's something other than null
대충 해석해보니 node convention에서 callback의 첫번째 항목은 error선언시에 사용하므로 애러가 아닐때 null을 넣어라 였다.<br>
"`if (value.length === 0) return callback(null, 'No Result Error');"`에서 null을 적지 않으면 결과값에 undefined가 나옴을 알 수 있다.
<br>
#### insert
sequelize를 사용해서 insert를 할때 model에서 선언한 내용을 가지고 올 수 있다.<br>
즉 "'create({"columnName": value})'"가 아닌 "'create({modelvalueName: value}))'"
로 선언해서 데이터를 넣을 수 있다는 것이다. 여기서 데이터 베이스 입력전에 데이터 형식이나 길이 체크를 해서
그것도 확인하는지 해볼 예정이다.
<br>
## 참조사이트
 sequelize<p>
 [참조사이트](https://proinlab.com/archives/1811)<br>
