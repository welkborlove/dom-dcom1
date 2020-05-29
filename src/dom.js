window.dom = {
   // create: function() {} // 可简化为
  create(string) {
     // return document.createElement(tagName) // 不能创建带有结构的 HTML 元素`<div><span>1</span></div>`
    const container = document.createElement("template");
    container.innerHTML = string.trim(); // 除去空格
    return container.content.firstChild;
  },
  after(node, node2) {
    // 在后面插入节点，就相当于在此 node 后面的节点的前面插 // 必须调用父节点的 insertBefore() 方法
    node.parentNode.insertBefore(node2, node.nextSibling);
    /* 判断 排除最后一个节点 没有下一个节点 null 也符合 */
  },
  before(node, node2){
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node){
    parent.appendChild(node)
  },
  wrap(node, parent){
    dom.before(node, parent) // 将要包裹的“父节点”先插到目标节点的前面
    dom.append(parent, node)  // 再把目标节点用 append 移至将要包裹的父节点的下面
  },
  remove(node){
    node.parentNode.removeChild(node)
    return node
  },
  empty(node){
    // 清空 node 里面的所有子元素
    const array = []
    let x = node.firstChild
    while(x){
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },
  attr(node, name, value){ // 重载
    if(arguments.length === 3){
      node.setAttribute(name, value)
    }else if(arguments.length === 2){
      return node.getAttribute(name)
    }
  },
  text(node, string){ // 适配
    if(arguments.length ===2 ){
      if('innerText' in node){
        node.innerText = string 
      }else{
        node.textContent = string 
      }
    }else if(arguments.length === 1){
      if('innerText' in node){
        return node.innerText
      }else{
        return node.textContent
      }
    }
  },
  html(node, string){
    if(arguments.length === 2){
      node.innerHTML = string
    }else if(arguments.length === 1){
      return node.innerHTML 
    }
  },
  style(node, name, value){
    if(arguments.length===3){
      // dom.style(div, 'color', 'red')
      node.style[name] = value
    }else if(arguments.length===2){
      if(typeof name === 'string'){
        // dom.style(div, 'color')
        return node.style[name]
      }else if(name instanceof Object){
        // dom.style(div, {color: 'red'})
        const object = name
        for(let key in object){
          node.style[key] = object[key]
        }
      }
    }
  },
  class: {
    /* 用于添加class */
    add(node, className){
      node.classList.add(className)
    },
    /* 用于删除class */
    remove(node, className){
      node.classList.remove(className)
    },
    has(node, className){
      return node.classList.contains(className)
    }
  },
  on(node, eventName, fn){
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn){
    node.removeEventListener(eventName, fn)
  },
  /* 查 */
    /* scope 为查找的范围 节点对象 */
    find(selector, scope) {
      /* 如果有 scope 节点 就找 scope 里的；没有就找 document 里的 */
      return (scope || document).querySelectorAll(selector)
          /* 返回的是 NodeList 伪数组 取用加 NodeList[0] */
  },
  parent(node){
    return node.parentNode
  },
  children(node){
    return node.children
  },
  siblings(node){
    return Array.from(node.parentNode.children)
    .filter(n=>n!==node)
  },
  next(node){
    let x = node.nextSibling
    while(x && x.nodeType === 3){
      x = x.nextSibling
    }
    return x
  },
  previous(node){
    let x = node.previousSibling
    while(x && x.nodeType === 3){
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn){
    for(let i=0;i<nodeList.length;i++){
      fn.call(null, nodeList[i])
    }
  },
  index(node){
    const list = dom.children(node.parentNode)
    let i
    for(i=0;i<list.length;i++){
      if(list[i] === node){
        break
      }
    }
    return i
  }
};