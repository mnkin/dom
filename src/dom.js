window.dom = {
  //create:function(){}
  //创建节点
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim(); //去掉空格
    return container.content.firstChild;
  },
  //新增弟弟。在node节点后面新增一个节点node2.
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling); //把node2插入到node的下一个节点的前面
  },
  //新增哥哥。在node节点前面新增节点node2
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  //新增儿子。
  append(parent, node) {
    parent.appendChild(node);
  },
  //新增爸爸。
  wrap(node, parent) {
    dom.before(node, parent); //先把parent节点插入到node节点前面，把node节点从树中移出来。
    dom.append(parent, node); //再把node节点插入到parent节点后面。
  },
  //删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node; //删除的这个节点可能会用到
  },
  //删除这个节点的所有儿子，但是不删除自己
  empty(node) {
    //const childNodes = node.childNodes;
    //const { childNodes } = node;
    const siblings = [];
    let x = node.firstChild;
    while (x) {
      siblings.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return siblings;
  },
  //给元素加属性。读写属性
  attr(node, name, value) {
    //重载。根据参数个数写不同代码就是重载。
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  //读写文本内容
  text(node, string) {
    //适配
    if (arguments.length === 2) {
      //如果长度为2，用于设置文本内容
      if ("innerText" in node) {
        node.innerText = string; //ie
      } else {
        node.textContent = string; //Firefox,Chrome
      }
    } else if (arguments.length === 1) {
      //如果长度为1，用于读取文本内容
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  //读写HTML内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  //添加样式
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        let object = name;
        for (let key in object) {
          //key: node.style.border
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    let list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
//dom.create = function(){}
