const div = dom.create("<div><strong>hello</strong></div>");
console.log(div);

dom.after(test, div);

const span = dom.create("<div>div标签</div>");
dom.before(test, span);

const div3 = dom.create("<div id='parent'></div>");
dom.wrap(test, div3);

const nodes = dom.empty(window.empty);
console.log(nodes);

dom.attr(test, "title", `Hi, I'm Joe`);
const title = dom.attr(test, "title"); //读取test标签的title值
console.log(`title:${title}`);

dom.text(test, "用于测试修改文本内容");
const text = dom.text(test); //读取test标签的文本内容
console.log(text);

dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid black");

dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "blue");
console.log(dom.class.has(test, "blue"));

const fn = () => console.log("点击了");
dom.on(test, "click", fn);
dom.off(test, "click", fn);

const testDiv = dom.find("#test2")[0];
console.log(testDiv);
const test2 = dom.find(".red", testDiv)[0];
console.log(test2);

dom.parent(test);

const s2 = dom.find("#s2")[0];
console.log(dom.siblings(s2));
console.log(dom.next(s2));
console.log(dom.previous(s2));

const t = dom.find("#travel")[0];
console.log(dom.each(dom.children(t), (n) => dom.style(n, "color", "red")));

console.log(dom.index(s2));
