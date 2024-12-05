# React

## React的工程化/组件化开发

当前以及未来的前端开发，一定是：组件化/模块化

- 有利于团队协作开发
- 便于组件的复用：提高开发效率、方便后期维护、减少页面中的冗余代码
- ...

### 如何划分组件

业务组件：针对项目需求封装的

- 普通业务组件「没有啥复用性，只是单独拆出来的一个模块」
- 通用业务组件「具备复用性」

功能组件：适用于多个项目「例如：UI 组件库中的组件」

- 通用功能组件

因为组件化开发，必然会带来“工程化”的处理，也就是基于 webpack 等工具「vite / rollup / turbopack...」

  + 实现组件的合并、压缩、打包等
  + 代码编译、兼容、校验等
  + ...

我们可以基于 webpack 自己去搭建一套工程化打包的架子，但是这样非常的麻烦/复杂；React官方，为我们提供了一个脚手架：create-react-app！！

### react脚手架

​	脚手架：基于它创建项目，默认就把webpack的打包规则已经处理好了，把一些项目需要的基本文件也都创建好了！！

create-react-app基础运用:

```js
/*
安装脚手架 
npm i create-react-app -g  「mac前面要设置sudo」
检查安装情况 
create-react-app --version
*/
```

###   基于脚手架创建React工程化的项目

create-react-app 项目名称

     项目名称要遵循npm包命名规范：使用“数字、小写字母、_”命名
        项目目录
            |- node_modules
            |- src：所以后续编写的代码，几乎都放在SRC下「打包的时候，一般只对这个目录下的代码进行处理」
         |- index.js
            |- public：放页面模板
         |- index.html
            |- package.json
            |- ...

  一个React项目中，默认会安装：
    react：React框架的核心
    react-dom：React视图渲染的核心「基于React构建WebApp（HTML页面）」
         ---> react-native：构建和渲染App的
    react-scripts：脚手架为了让项目目录看起来干净一些，把webpack打包的规则及相关的插件/LOADER等都隐藏到了node_modules目录下，react-scripts就是脚手架中自己对打包命令的一种封装，基于它打包，会调用node_modules中的webpack等进行处理！！

### Web前端框架

1.目前市面上比较主流的前端框架

- React
- Vue
- Angular「NG」
- ...

主流的思想：不在直接去操作DOM，而是改为“数据驱动思想”

操作DOM思想：

+ 操作DOM比较消耗性能「主要原因就是：可能会导致DOM重排(回流)/重绘」
+ 操作起来也相对来讲麻烦一些
+ ...

数据驱动思想：

+ 我们不会在直接操作DOM
+ 我们去操作数据「当我们修改了数据，框架会按照相关的数据，让页面重新渲染」
+ 框架底层实现视图的渲染，也是基于操作DOM完成的
  + 构建了一套 虚拟DOM->真实DOM 的渲染体系
  + 有效避免了DOM的重排/重绘
+ 开发效率更高、最后的性能也相对较好

2. React 框架采用的是 MVC 体系；Vue 框架采用的是 MVVM 体系；

```js
/*
MVC：model数据层 + view视图层 + controller控制层
  @1 我们需要按照专业的语法去构建视图（页面）：React中是基于jsx语法来构建视图的
  @2 构建数据层：但凡在视图中，需要“动态”处理的(需要变化的，不论是样式还是内容)，我们都要有对应的数据模型
  @3 控制层：当我们在视图中(或者根据业务需求)进行某些操作的时候，都是去修改相关的数据，然后React框架会按照最新的数据，重新渲染视图，以此让用户看到最新的效果！
  数据驱动视图的渲染！！
  视图中的表单内容改变，想要修改数据，需要开发者自己去写代码实现！！
  “单向驱动”
MVVM：model数据层 + view视图层 + viewModel数据/视图监听层
  @1 数据驱动视图的渲染：监听数据的更新，让视图重新渲染
  @2 视图驱动数据的更改：监听页面中表单元素内容改变，自动去修改相关的数据
  “双向驱动”
 */
```



## JSX 构建视图的基础知识

JSX：javascript and xml( html ) 把 JS 和 HTML 标签混合在了一起「并不是我们之前玩的字符串拼接」

### JSX 基础使用

```js
/*
1. vscode 如何支持 JSX 语法「格式化、快捷提示...」
  - 创建的js文件，我们把后缀名设置为jsx即可，这样js文件中就可以支持JSX语法
  - webpack打包的规则中，也是会对.jsx这种文件，按照JS的方式进行处理的

2. 在HTML中嵌入“JS表达式”，需要基于“{} 胡子语法”
  - JS表达式：执行有结果的

3. 在ReactDOM.createRoot()的时候，不能直接把HTML/BODY做为根容器，需要指定一个额外的盒子「例如：#root」

4. 每一个构建的视图，只能有一个“根节点”
  - 出现多个根节点则报错 Adjacent JSX elements must be wrapped in an enclosing tag.
  - React给我们提供了一个特殊的节点(标签)：React.Fragment 空文档标记标签<></>，通过使用它，既保证了可以只有一个根节点，又不新增一个HTML层级结构！！

5. {}胡子语法中嵌入不同的值，所呈现出来的特点
  - number/string：值是啥，就渲染出来啥
  - boolean/null/undefined/Symbol/BigInt：渲染的内容是空
  - 除数组对象外，其余对象一般都不支持在{}中进行渲染，但是也有特殊情况:
  - JSX虚拟DOM对象
  - 给元素设置style行内样式，要求必须写成一个对象格式
  - 数组对象：把数组的每一项都分别拿出来渲染「并不是变为字符串渲染，中间没有逗号」
  - 函数对象：不支持在{}中渲染，但是可以作为函数组件，用<Component/>方式渲染!!

6. 给元素设置样式
  - 行内样式：需要基于对象的格式处理，直接写样式字符串会报错
      <h2 style={{
        color: 'red',
        fontSize: '18px' //样式属性要基于驼峰命名法处理
      }}>
  - 设置样式类名：需要把class替换为className
     <h2 className="box">
*/
```

### 使用示例

```js
import React from 'react'; //React语法核心
import ReactDOM from 'react-dom/client'; //构建HTML(WebApp)的核心

//获取页面中#root的容器，作为“根”容器
const root = ReactDOM.createRoot(document.getElementById('root'));

//基于render方法渲染我们编写的视图，把渲染后的内容，全部插入到#root中进行渲染
root.render(
    ....
);
```



### JSX底层处理机制

Step 1: 将编写的JSX语法，编译为虚拟DOM对象「virtualDOM」
    虚拟DOM对象：框架自己内部构建的一套对象体系（对象的相关成员都是React内部规定的），基于这些属性描述出，我们所构建视图中的，DOM节点的相关特征！！

```js
/*
基于 babel-preset-react-app 把JSX编译为 React.createElement(...) 这种格式！！
       只要是元素节点，必然会基于createElement进行处理！
       React.createElement(ele,props,...children)
        + ele：元素标签名「或组件」
        + props：元素的属性集合(对象)「如果没有设置过任何的属性，则此值是null」
        + children：第三个及以后的参数，都是当前元素的子节点
再把 createElement 方法执行，创建出virtualDOM虚拟DOM对象「也有称之为：JSX元素、JSX对象、ReactChild对象...」！！
      virtualDOM = {
        $$typeof: Symbol(react.element),
        ref: null,
        key: null,
        type: 标签名「或组件」,
        // 存储了元素的相关属性 && 子节点信息
        props: {
            元素的相关属性,
            children:子节点信息「没有子节点则没有这个属性、属性值可能是一个值、也可能是一个数组」
        }
      }
*/
```

Step 2: 把构建的virtualDOM渲染为真实DOM
    真实 DOM：浏览器页面中，最后渲染出来，让用户看见的 DOM 元素！！
    基于 ReactDOM 中的 render 方法处理的！！

```js
/*
  v16
      ReactDOM.render(
        <>...</>,
        document.getElementById('root')
      );
  v18
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <>...</>
  );
*/
```

补充说明：第一次渲染页面是直接从virtualDOM->真实DOM；但是后期视图更新的时候，需要经过一个DOM-DIFF的对比，计算出补丁包PATCH（两次视图差异的部分），把PATCH补丁包进行渲染！！

![image-20230925154324206](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20230925154324206.png)



## 函数组件

### 基本使用

1.创建：在SRC目录中，创建一个 xxx.jsx 的文件，就是要创建一个组件；我们在此文件中，创建一个函数，让函数返回JSX视图「或者JSX元素、virtualDOM虚拟DOM对象」；这就是创建了一个“函数组件”！

2.调用：基于ES6Module规范，导入创建的组件「可以忽略.jsx后缀名」，然后像写标签一样调用这个组件即可！！

```jsx
<Component/> //单闭合调用
<Component> ... </Component>  //双闭合调用
```

3.命名：组件的名字，我们一般都采用PascalCase「大驼峰命名法」这种方式命名

4.调用组件的时候，我们可以把一些数据/信息基于属性props的方式，传递给组件！！

```jsx
<DemoOne title="我是标题" x={10} data={[100, 200]} className="box" style={{ fontSize: '20px' }} />
```

如果设置的属性值不是字符串格式，需要基于“{}胡子语法”进行嵌套

### 渲染机制

```jsx
// 1.基于babel-preset-react-app把调用的组件转换为createElement格式
        React.createElement(DemoOne, {
            title: "\u6211\u662F\u6807\u9898",
            x: 10,
            data: [100, 200],
            className: "box",
            style: {
                fontSize: '20px'
            }
        })
// 2.把createElement方法执行，创建出一个virtualDOM对象！！
        {
            $$typeof: Symbol(react.element),
            key: null,
            props: {title: '我是标题', x: 10, data: 数组, className: 'box', style: {fontSize: '20px'}}, 
                //如果有子节点「双闭合调用」，则也包含children！！
            ref: null,
            type: DemoOne
        }
// 3.基于root.render把virtualDOM变为真实的DOM
        type值不再是一个字符串，而是一个函数了，此时：
        + 把virtualDOM中的props，作为实参传递给函数 -> DemoOne(props)
        + 把函数执行 -> DemoOne(props)
        + 接收函数执行的返回结果「也就是当前组件的virtualDOM对象」
        + 最后基于render把组件返回的虚拟DOM变为真实DOM，插入到#root容器中！！
```

![image-20230930175505678](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20230930175505678.png)

![image-20230930175421719](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20230930175421719.png)

### 属性props的处理

1.传递进来的属性是“只读”的「原理：props对象被冻结了」

```js
//Object.isFrozen(props) -> true
//获取：props.xxx
//修改：props.xxx=xxx  =>报错
```

2.作用：父组件(index.jsx)调用子组件(DemoOne.jsx)的时候，可以基于属性，把不同的信息传递给子组件；子组件接收相应的属性值，呈现出不同的效果，让组件的复用性更强！！

3.虽然对于传递进来的属性，我们不能直接修改，但是可以做一些规则校验
    （1）设置默认值

```js
函数组件.defaultProps = {
    x: 0,
    ......
};
```

​    （2） 设置其它规则，例如：数据值格式、是否必传... 「依赖于官方的一个插件：prop-types」
​      https://github.com/facebook/prop-types

```js
import PropTypes from 'prop-types';
      函数组件.propTypes = {
        // 类型是字符串、必传
        title: PropTypes.string.isRequired,
        // 类型是数字
        x: PropTypes.number,
        // 多种校验规则中的一个
        y: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.bool,
        ])
      };
```

 传递进来的属性，首先会经历规则的校验，不管校验成功还是失败，最后都会把属性给形参props，只不过如果不符合设定的规则，控制台会抛出警告错误{不影响属性值的获取}！！

如果就想把传递的属性值进行修改，我们可以：
+ 把props中的某个属性赋值给其他内容「例如：变量、状态...」
+ 我们不直接操作props.xxx=xxx，但是我们可以修改变量/状态值！！

### React插槽

功能：可以传递HTML结构给父组件

![image-20231012115305803](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231012115305803.png)

![image-20231012144602520](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231012144602520.png)

可以基于React.Children对象中提供的方法，对props.children做处理：count、forEach、map、toArray...

好处：这些方法的内部，已经对children的各种形式做了处理

**具名插槽**

![image-20231012150028569](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231012150028569.png)

## 类组件

### 创建类组件

```json
创建一个构造函数(类)
要求必须继承React.Component/PureComponent这个类
我们习惯于使用ES6中的class创建类「因为方便」
必须给当前类设置一个render的方法「放在其原型上」：在render方法中，返回需要渲染的视图
```

### 类组件生命周期

注：红线划出的是不安全的、即将废弃的生命周期

![image-20231030165512775](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231030165512775.png)

### 组件创建过程

```json
从调用类组件「new Vote({...})」开始，类组件内部发生的事情：
1. 初始化属性 && 规则校验
先规则校验，校验完毕后，再处理属性的其他操作！！
方案一： 
constructor(props) {
super(props); //会把传递进来的属性挂载到this实例上
console.log(this.props); //获取到传递的属性
}
方案二：即便我们自己不再constructor中处理「或者constructor都没写」，在constructor处理完毕后，React内部也会把传递的props挂载到实例上；所以在其他的函数中，只要保证this是实例，就可以基于this.props获取传递的属性！
+ 同样this.props获取的属性对象也是被冻结的{只读的}  Object.isFrozen(this.props)->true

2. 初始化状态
状态：后期修改状态，可以触发视图的更新
需要手动初始化，如果我们没有去做相关的处理，则默认会往实例上挂载一个state，初始值是null => this.state=null
手动处理：
state = {
...
};
---------修改状态，控制视图更新
this.state.xxx=xxx ：这种操作仅仅是修改了状态值，但是无法让视图更新
想让视图更新，我们需要基于React.Component.prototype提供的方法操作：
@1 this.setState(partialState) 既可以修改状态，也可以让视图更新 「推荐」
+ partialState:部分状态
this.setState({
xxx:xxx
});
@2 this.forceUpdate() 强制更新

3. 触发 componentWillMount 周期函数(钩子函数)：组件第一次渲染之前
钩子函数：在程序运行到某个阶段，我们可以基于提供一个处理函数，让开发者在这个阶段做一些自定义的事情
+ 此周期函数，目前是不安全的「虽然可以用，但是未来可能要被移除了，所以不建议使用」
+ 控制会抛出黄色警告「为了不抛出警告，我们可以暂时用 UNSAFE_componentWillMount」
+ 如果开启了React.StrictMode「React的严格模式」，则我们使用 UNSAFE_componentWillMount 这样的周期函数，控制台会直接抛出红色警告错误！！
React.StrictMode VS "use strict"
+ "use strict"：JS的严格模式
+ React.StrictMode：React的严格模式，它会去检查React中一些不规范的语法、或者是一些不建议使用的API等！！

4. 触发 render 周期函数：渲染

5. 触发 componentDidMount 周期函数：第一次渲染完毕
+ 已经把virtualDOM变为真实DOM了「所以我们可以获取真实DOM了」
+ ...

```

### 组件更新逻辑

1.组件内部的状态被修改，组件会更新

```json
1. 触发 shouldComponentUpdate 周期函数：是否允许更新
shouldComponentUpdate(nextProps, nextState) {
// nextState:存储要修改的最新状态
// this.state:存储的还是修改前的状态「此时状态还没有改变」
console.log(this.state, nextState);

// 此周期函数需要返回true/false
//   返回true：允许更新，会继续执行下一个操作
//   返回false：不允许更新，接下来啥都不处理
return true;
}

2. 触发 componentWillUpdate 周期函数：更新之前
+ 此周期函数也是不安全的
+ 在这个阶段，状态/属性还没有被修改

3. 修改状态值/属性值「让this.state.xxx改为最新的值」

4. 触发 render 周期函数：组件更新
+ 按照最新的状态/属性，把返回的JSX编译为virtualDOM
+ 和上一次渲染出来的virtualDOM进行对比「DOM-DIFF」
+ 把差异的部分进行渲染「渲染为真实的DOM」

5. 触发 componentDidUpdate 周期函数：组件更新完毕
特殊说明：如果我们是基于 this.forceUpdate() 强制更新视图，会跳过 shouldComponentUpdate 周期函数的校验，直接从 WillUpdate 开始进行更新「也就是：视图一定会触发更新」！

```

2.父组件更新，触发的子组件更新

```json
1. 触发 componentWillReceiveProps 周期函数：接收最新属性之前
+ 周期函数是不安全的
UNSAFE_componentWillReceiveProps(nextProps) {
    // this.props:存储之前的属性
    // nextProps:传递进来的最新属性值
    console.log('componentWillReceiveProps:', this.props, nextProps);
}

2. 触发 shouldComponentUpdate 周期函数
......
```

### 组件卸载

```
1. 触发 componentWillUnmount 周期函数：组件销毁之前
2. 销毁
```

### 组件嵌套

```json
父子组件嵌套，处理机制上遵循深度优先原则：父组件在操作中，遇到子组件，一定是把子组件处理完，父组件才能继续处理
+ 父组件第一次渲染
	父 willMount -> 父 render「子 willMount -> 子 render -> 子didMount」 -> 父didMount 
+ 父组件更新：
	父 shouldUpdate -> 父willUpdate -> 父 render 「子willReceiveProps -> 子 shouldUpdate -> 子willUpdate -> 子 render -> 子 didUpdate」-> 父 didUpdate
+ 父组件销毁：
	父 willUnmount -> 处理中「子willUnmount -> 子销毁」-> 父销毁
```

 函数组件是“静态组件”：
   + 组件第一次渲染完毕后，无法基于“内部的某些操作”让组件更新「无法实现“自更新”」；但是，如果调用它的父组件更新了，那么相关的子组件也一定会更新「可能传递最新的属性值进来」；
   + 函数组件具备：属性...「其他状态等内容几乎没有」
   + 优势：比类组件处理的机制简单，这样导致函数组件渲染速度更快！！

 类组件是“动态组件”：

   + 组件在第一渲染完毕后，除了父组件更新可以触发其更新外，我们还可以通过：this.setState修改状态 或者 this.forceUpdate 等方式，让组件实现“自更新”！！
   + 类组件具备：属性、状态、周期函数、ref...「几乎组件应该有的东西它都具备」
   + 优势：功能强大！！

Hooks组件「推荐」：具备了函数组件和类组件的各自优势，在函数组件的基础上，基于hooks函数，让函数组件也可以拥有状态、周期函数等，让函数组件也可以实现自更新「动态化」！！

###  PureComponent 和 Component 的区别

  PureComponent会给类组件默认加一个shouldComponentUpdate周期函数

   \+ 在此周期函数中，它对新老的属性/状态 会做一个浅比较

   \+ 如果经过浅比较，发现属性和状态并没有改变，则返回false「也就是不继续更新组建」；有变化才会去更新！！

### 受控组件与非受控组件

受控组件：基于修改数据/状态，让视图更新，达到需要的效果 「推荐」

 非受控组件：基于ref获取DOM元素，我们操作DOM元素，来实现需求和效果「偶尔」

### **基于ref获取DOM元素的语法**

1.给需要获取的元素设置ref='xxx'，后期基于this.refs.xxx去获取相应的DOM元素「不推荐使用：在React.StrictMode模式下会报错」

```html
<h2 ref="titleBox">...</h2>
```

获取：this.refs.titleBox

2.把ref属性值设置为一个函数

```tsx
ref={x=>this.xxx=x}
```

x是函数的形参：存储的就是当前DOM元素，然后我们获取的DOM元素“x”直接挂在到实例的某个属性上(例如：box2)
获取：this.xxx

3.基于React.createRef()方法创建一个REF对象

```tsx
this.xxx=React.createRef();  //=> this.xxx={current:null}
ref={REF对象(this.xxx)}
```

获取：this.xxx.current

原理：在render渲染的时候，会获取virtualDOM的ref属性

- 如果属性值是一个字符串，则会给this.refs增加这样的一个成员，成员值就是当前的DOM元素.
- 如果属性值是一个函数，则会把函数执行，把当前DOM元素传递给这个函数「x->DOM元素」,而在函数执行的内部，我们一般都会把DOM元素直接挂在到实例的某个属性上.
- 如果属性值是一个REF对象，则会把DOM元素赋值给对象的current属性

### 不同组件添加Ref

 给元素标签设置ref，目的：获取对应的DOM元素 

 给类组件设置ref，目的：获取当前调用组件创建的实例「后续可以根据实例获取子组件中的相关信息」

 给函数组件设置ref，会直接报错。但可让其配合 React.forwardRef 实现ref的转发，从而获取函数子组件内部的某个元素。

```
Function components cannot be given refs. Attempts to access this ref will fail.
```

```tsx
const Child2 = React.forwardRef(function Child2(props, ref) {
    // console.log(ref); //我们调用Child2的时候，设置的ref属性值「函数」 
    // -> x => this.child2 = x
    return <div>
        子组件2
        <button ref={ref}>按钮</button>
    </div>;
});

class Demo extends React.Component {
    render() {
        return <div>
            <Child2 ref={x => this.child2 = x} />
        </div>;
    }
    componentDidMount() {
        console.log(this.child2); //存储的是:子组件内部的button按钮
    }
}
```



## Hooks

### useState

功能：在函数组件中可以使用状态，并且后期基于状态的修改，可以让组件更新

```tsx
let [num,setNum] = useState(initialValue);
/*执行useState，传递的initialValue是初始的状态值
  该方法返回结果是一个数组：[状态值,修改状态的方法]
       + num变量存储的是：获取的状态值
       + setNum变量存储的是：修改状态的方法
  执行 setNum(value) 
       + 修改状态值为value
       + 通知视图更新
```

**useState 处理机制**

![image-20231101172608457](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231101172608457.png)

```json
函数组件的每一次渲染(或者是更新)，都是把函数(重新)执行，产生一个全新的“私有上下文”!
   + 内部的代码也需要重新执行
   + 涉及的函数需要重新的构建{这些函数的作用域(函数执行的上级上下文)，是每一次执行DEMO产生的闭包}
   + 每一次执行DEMO函数，也会把useState重新执行，但是：
     + 执行useState，只有第一次，设置的初始值会生效，其余以后再执行，获取的状态都是最新的状态值「而不是初始值」
     + 返回的修改状态的方法，每一次都是返回一个新的

useState自带了性能优化的机制：
  + 每一次修改状态值的时候，会拿最新要修改的值和之前的状态值做比较「基于Object.is作比较」
  + 如果发现两次的值是一样的，则不会修改状态，也不会让视图更新「可以理解为：类似于PureComponent，在shouldComponentUpdate中做了浅比较和优化」
```

**flushSync**：让异步代码同步执行

![image-20231116174143078](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231116174143078.png)



### useEffect、useLayoutEffect

功能：在函数组件中使用生命周期

```tsx
useEffect(callback)：没设置依赖
     + 第一次渲染完毕后，执行callback，等价于 componentDidMount
     + 在组件每一次更新完毕后，也会执行callback，等价于 componentDidUpdate

useEffect(callback,[])：设置了，但是无依赖
     + 只有第一次渲染完毕后，才会执行callback，每一次视图更新完毕后，callback不再执行
     + 类似于 componentDidMount

useEffect(callback,[依赖的状态(多个状态)])：
     + 第一次渲染完毕会执行callback
     + 当依赖的状态值(或者多个依赖状态中的一个)发生改变，也会触发callback执行
     + 但是依赖的状态如果没有变化，在组件更新的时候，callback是不会执行的

useEffect(()=>{
      return ()=>{
        // 返回的小函数，会在组件释放的时候执行
        // 如果组件更新，会把上一次返回的小函数执行「可以“理解为”上一次渲染的组件释放了」
      };
   });
```

注：

- useEffect 必须在函数的最外层上下文中调用，不能把其嵌入到条件判断、循环等操作语句中；
- useEffect如果设置返回值，则返回值必须是一个函数「代表组件销毁时触发」。

**useEffect 的处理机制**

![image-20231101174638934](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231101174638934.png)

**useEffect 与 useEffectLayout 的区别**

```json
/*
useLayoutEffect会阻塞浏览器渲染真实DOM，优先执行Effect链表中的callback； 而useEffect不会阻塞浏览器渲染真实DOM，在渲染真实DOM的同时，去执行Effect链表中的callback；
useLayoutEffect设置的callback要优先于useEffect去执行！！
在两者设置的callback中，依然可以获取DOM元素「原因：真实DOM对象已经创建了，区别只是浏览器是否渲染」
如果在callback函数中又修改了状态值「视图又要更新」
useEffect:浏览器肯定是把第一次的真实已经绘制了，再去渲染第二次真实DOM
useLayoutEffect:浏览器是把两次真实DOM的渲染，合并在一起渲染的

视图更新的步骤：
第一步：基于 babel-preset-react-app 把 JSX 编译为 createElement 格式
第二步：把 createElement 执行，创建出 virtualDOM
第三步：基于 root.render 方法把 virtualDOM 变为真实DOM对象「DOM-DIFF」
	useLayoutEffect 阻塞第四步操作，先去执行Effect链表中的方法「同步操作」
	useEffect 第四步操作和Effect链表中的方法执行，是同时进行的「异步操作」
第四步：浏览器渲染和绘制真实 DOM 对象
```

### useRef

功能：创建一个ref对象，从而获取函数组件内的某个元素或状态(配合 useImperativeHandle)；另外 useRef 还是多次渲染之间的纽带。

```tsx
const Demo = function Demo() {
    let [num, setNum] = useState(0);
    //函数组件中，还可以基于 useRef Hook函数，创建一个ref对象 
      //+ React.createRef 也是创建ref对象，即可在类组件中使用，也可以在函数组件中使用
      //+ useRef 只能在函数组件中用「所有的ReactHook函数，都只能在函数组件中时候用，在类组件中使用会报错」
    let box = useRef(null);
    useEffect(() => {
        console.log(box.current);
    }, []);

    return <div className="demo">
        <span className="num" ref={box}>{num}</span>
        <Button type="primary" size="small"
            onClick={() => {
                setNum(num + 1);
            }}>
            新增
        </Button>
    </div>;
}
```

**useRef 与 React.createRef 的区别：**

- React.createRef 也是创建ref对象，即可在类组件中使用，也可以在函数组件中使用；而 useRef 只能在函数组件中用。
- useRef 在每一次组件更新的时候（函数重新执行），再次执行 useRef 方法的时候，不会创建新的 ref 对象了，获取到的还是第一次创建的那个 ref 对象！ React.createRef 在每一次组件更新的时候，都会创建一个全新的 ref 对象出来，比较浪费性能。

**useImperativeHandle**

基于forwardRef实现ref转发的同时，使用 useImperativeHandle 获取函数子组件的状态和函数。

```tsx
const Child = React.forwardRef(function Child(props, ref) {
    let [text, setText] = useState('你好世界');
    const submit = () => { };

    useImperativeHandle(ref, () => {
        // 在这里返回的内容，都可以被父组件的REF对象获取到
        return {
            text,
            submit
        };
    });

    return <div className="child-box">
        <span>哈哈哈</span>
    </div>;
});

const Demo = function Demo() {
    let x = useRef(null);
    useEffect(() => {
        console.log(x.current); // 见下图
    }, []);

    return <div className="demo">
        <Child ref={x} />
    </div>;
};
```

![image-20231101151708387](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231101151708387.png)

**多次渲染之间的纽带**

`useRef` 会在所有的 render 中保持对返回值的唯一引用。因为所有对 ref 的赋值和取值拿到的都是最终的状态，并不会因为不同的 render中存在不同的隔离。简单来说，可以将`useRef`的返回值，想象成为一个全局变量。`useRef`的值改变并不会造成页面重新渲染 !

### useMemo

```tsx
let temp = useMemo(callback,[dependencies])
```

注：

- 第一次渲染组件的时候，callback会执行；
- 后期只有依赖的状态值发生改变，callback才会再执行；
- 每一次会把callback执行的返回结果赋值给 temp；
- useMemo 具备“计算缓存”，在依赖的状态值没有发生改变，callback没有触发执行的时候，temp 获取的是上一次计算出来的结果。
- 和Vue中的计算属性非常的类似！

### useCallback

![image-20231101153223039](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231101153223039.png)

```tsx
const temp = useCallback(callback,[dependencies])
```

说明：

- 组件第一次渲染，useCallback执行，创建一个函数“callback”，赋值给temp；
- 组件后续每一次更新，判断依赖的状态值是否改变，如果改变，则重新创建新的函数堆，赋值给 temp；但是如果，依赖的状态没有更新「或者没有设置依赖“[]”」则 temp 获取的一直是第一次创建的函数堆，不会创建新的函数出来！
- 或者说，基于useCallback，可以始终获取第一次创建函数的堆内存地址(或者说函数的引用)。

注：useCallback 虽然减少了堆内存的开辟，但 useCallback 本身也有自己的逻辑和缓存的机制，这也耗时间。

![image-20231120205154543](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231120205154543.png)

何时使用 useCallback？

父组件嵌套子组件，父组件要把其内部的一个函数，基于属性props传递给子组件时，此时传递的这个方法，基于 useCallback 处理一下会更好。(配合 React.memo )

React.memo 功能类似于 React.PureComponent，当传递给子组件的属性不变时，子组件不会更新。

```tsx
const Child = React.memo(function Child(props) {
    console.log('Child Render');
    return <div>
        我是子组件
    </div>;
});		
```



### 自定义Hooks

用途：提取封装一些公共的处理逻辑

用法：建一个函数，名字需要是 useXxx ，后期就可以在组件中调用这个方法！

### useReducer

![image-20231204162651035](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231204162651035.png)

![image-20231204163012152](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231204163012152.png)

## React 复合组件通信

###  父子组件通信

![image-20231120202640604](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231120202640604.png)

![image-20231120203329203](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231120203329203.png)

**单向数据流**

 <p>理解一：属性的传递方向是单向的</p>

        <ul>
            <li>
                <p>父组件可基于属性把信息传给子组件</p>
            </li>
            <li>
                <p>子组件无法基于属性给父组件传信息；但可以把父组件传递的方法执行，从而实现子改父！</p>
            </li>
        </ul>
    
        <p>理解二：关于生命周期函数的延续</p>

```
父 willMount -> 父 render -> 
子 willMount -> 子 render -> 子 didMount -> 
父 didMount
```

                <p>组件更新</p>

```
父 shouldUpdate -> 父 willUpdate -> 父 render -> 
子 willReciveProps -> 子 shouldUpdate -> 子 willUpdate -> 子 render -> 子 didUpdate -> 
父 didUpdate
```



### 上下文：祖先与后代组件通信

**示意图**

![image-20231121112201045](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231121112201045.png)

**使用**

step1：创建上下文对象

```js
import React from "react";
const ThemeContext = React.createContext();
export default ThemeContext;
```

step2：将状态和修改状态的方法放入上下文对象中

```tsx
const Vote = function Vote() {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);
    const change = type => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    };

    return <ThemeContext.Provider
        value={{
            supNum,
            oppNum,
            change
        }}>
        <div className="vote-box">
            <div className="header">
                <h2 className="title">React是很棒的前端框架</h2>
                <span className="num">{supNum + oppNum}</span>
            </div>
            <VoteMain />
            <VoteFooter />
        </div>
    </ThemeContext.Provider>;
};

```

step3：使用状态和方法

方法一

```tsx
const VoteMain = function VoteMain() {
    return <ThemeContext.Consumer>
        {context => {
            let { supNum, oppNum } = context;
            return <div className="main">
                <p>支持人数：{supNum}人</p>
                <p>反对人数：{oppNum}人</p>
            </div>;
        }}
    </ThemeContext.Consumer>;
}; 
```

方法二（常用）

```tsx
import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";

const VoteMain = function VoteMain() {
    let { supNum, oppNum } = useContext(ThemeContext);
    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
    </div>;
};
```





## React 样式私有化

### 内联式

![image-20231123161552527](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123161552527.png)



![image-20231123161716626](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123161716626.png)



### CSS样式表

![image-20231123162420693](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123162420693.png)

### CSSModules

![image-20231123193656914](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123193656914.png)

![image-20231123164704923](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123164704923.png)

![image-20231123164810526](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123164810526.png)

![image-20231123164959302](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123164959302.png)

给类名用global包裹，可将该类名变成全局的类名，即该类名不会被修改

![image-20231123192951933](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123192951933.png)

![image-20231123193505603](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123193505603.png)

### ReactJSS

![image-20231123194943180](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123194943180.png)

![image-20231123195352268](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123195352268.png)

![image-20231123195254482](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123195254482.png)

相对于CSSModule的好处：样式是写在JS中的，就可以基于一些逻辑操作，实现样式的动态管理。

![image-20231123200609294](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231123200609294.png)



### 高阶组件(HOC, Higher - Order - Components)

思想 ：利用 JS 的闭包(柯里化函数)，实现组件的代理。在代理的组件中，经过业务逻辑的处理，获取一些信息，最后基于属性等方法，传递给最重要渲染的组件。



# Redux

## 什么是 Redux

- Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理！
- Redux 除了和 React 一起用外，还支持其它框架；它体小精悍（只有2kB，包括依赖），却有很强大的插件扩展生态！
- Redux 提供的模式和工具使您更容易理解应用程序中的状态`何时、何地、为什么以及如何更新`，以及当这些更改发生时，您的应用程序逻辑将如何表现！

## 何时使用 Redux

- 在应用的大量地方，都存在大量的状态
- 应用状态会随着时间的推移而频繁更新
- 更新该状态的逻辑可能很复杂
- 中型和大型代码量的应用，很多人协同开发

## Redux 库和工具

Redux 是一个小型的独立 JS 库， 但是它通常与其他几个包一起使用：

**React-Redux**
React-Redux是我们的官方库，它让 React 组件与 Redux 有了交互，可以从 store 读取一些 state，可以通过 dispatch actions 来更新 store！

**Redux Toolkit**
Redux Toolkit 是我们推荐的编写 Redux 逻辑的方法。 它包含我们认为对于构建 Redux 应用程序必不可少的包和函数。 Redux Toolkit 构建在我们建议的最佳实践中，简化了大多数 Redux 任务，防止了常见错误，并使编写 Redux 应用程序变得更加容易。

**Redux DevTools 拓展**
Redux DevTools Extension 可以显示 Redux 存储中状态随时间变化的历史记录，更加有效地调试应用程序。

## 基础使用流程

### 流程概览

![image-20231127173101400](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231127173101400.png)

创建容器 store、reducer

```tsx
import { createStore } from 'Redux';

/* 初始状态 */
let initial = {
    supNum: 10,
    oppNum: 5
};

/* 管理员：修改STORE容器中的公共状态 */
const reducer = function reducer(state = initial, action) {
    // state:存储STORE容器中的公共状态「最开始没有的时候，赋值初始状态值initial」
    // action:每一次基于dispatch派发的时候，传递进来的行为对象「要求必须具备type属性，存储派发的行为标识」
    // 为了接下来的操作中，我们操作state，不会直接修改容器中的状态「要等到最后return的时候」，我们需要先克隆
    state = { ...state };
    // 接下来我们需要基于派发的行为标识，修改STORE容器中的公共状态信息
    switch (action.type) {
        case 'VOTE_SUP':
            state.supNum++;
            break;
        case 'VOTE_OPP':
            state.oppNum++;
            break;
        default:
    }
    // return的内容，会整体替换STORE容器中的状态信息
    return state;
};

/* 创建STORE公共容器 */
const store = createStore(reducer);
export default store;
```

![image-20231127192144357](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231127192144357.png)

### 获取状态: getState

为了在各个组件中，都可以获取到创建的容器，可以基于上下文方案：

1. 在根组件 index.js 中，基于 xxxContext.Provoder 将创建的 store 放入到上下文中；
2. 子组件通过useContext 获取 store

**创建上下文**

```tsx
import React from "react";
const ThemeContext = React.createContext();
export default ThemeContext;	
```

### 子组件获取 store 并通过  getState  获取所需状态

```tsx
const { store } = useContext(ThemeContext);
// 获取容器中的公共状态
let { supNum, oppNum } = store.getState();
```

### 事件池添加组件更新方法: subscribe

```tsx
const { store } = useContext(ThemeContext);
let { supNum, oppNum } = store.getState();

// 组件第一次渲染完毕后，把让组件更新的方法，放在STORE的事件池中
let [num, setNum] = useState(0);
const update = () => {
    setNum(num + 1);
};

// 法一：
useEffect(() => {
    // let unsubscribe = store.subscribe(让组件更新的方法)
    //   + 把让组件更新的方法放在STORE的事件池中
    //   + 返回的unsubscribe方法执行，可以把刚才放入事件池中的方法移除掉
    let unsubscribe = store.subscribe(update);
    return () => {
        unsubscribe();
    };
}, [num]); 
```

![image-20231128143905590](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231128143905590.png)

![image-20231128144101269](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231128144101269.png)

```tsx
// 法二：
useEffect(() => {
    store.subscribe(() => {
        // 设置一个与上次num不同的值
        setNum(+new Date());
    });
}, []);
```

 ![image-20231128144430734](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231128144430734.png)

### 事件派发: dispatch

![image-20231128143417398](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231128143417398.png)

### 总结

1. 创建 store，规划出 reducer (当中的业务处理逻辑可以后续完善，最开始先搭建出reducer的架子)；
2. 在入口组件，将 store 放入 context 中；用到 store 的地方，通过 useContext 获取；
3. 各组件基于 store， 完成公共状态的获取、修改
4. 使用到公共状态的组件，必须向 store 的事件池中加入让组件更新的方法，只有这样，才可以确保，公共状态的改变可以让组件更新，才可以获取最新的状态进行绑定。

## Redux 工程化开发

redux工程化其实就是“按模块划分”

![image-20231128201219079](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231128201219079.png)

### reducer 划分

```tsx
// 子reducer1
const initial1 = {
    supNum: 10,
    oppNum: 5,
    num: 0
};
export function voteReducer(state = initial1, action) {
    state = _.clone(true, state);
    switch (action.type) {
        case TYPES.VOTE_SUP:
            state.supNum++;
            break;
        case TYPES.VOTE_OPP:
            state.oppNum++;
            break;
        default:
    }
    return state;
};

// 子reducer2
const initial2 = {
    num: 100,
    info: null
};
export default function personalReducer(state = initial2, action) {
    state = _.clone(true, state);
    switch (action.type) {
        case TYPES.PERSONAL_INFO:
            state.info = action.payload;
            break;
        default:
    }
    return state;
};

// 合并reducer
const reducer = combineReducers({
    vote: voteReducer,
    personal: personalReducer
});
export default reducer;

// 将合并后的总的reducer，赋值给创建的store容器
const store = createStore(reducer);
```

![image-20231128193219506](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231128193219506.png)

![image-20231128193415522](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231128193415522.png)



### 行为标识统一管理

派发的操作不需要改动，每一次 dispatch 派发的时候，都会把每个模块的reducer依次执行，把所有和派发的行为标识匹配的逻辑执行！

可能存在的问题：团队协作开发时，行为标识可能会冲突。

所以，需要基于“ 宏管理(统一管理) ”，让所有的派发行为标识唯一。

```tsx
// action-types.js
/* 
统一管理需要派发的行为标识：
 + 为了保证不冲突，我们一般都是这样命名：模块名_派发的行为标识「大写」
 + 变量和存储的值是一致的
 + 所有需要派发的行为标识，都在这里定义
*/
export const VOTE_SUP = "VOTE_SUP";
export const VOTE_OPP = "VOTE_OPP";

export const PERSONAL_SUP = "PERSONAL_SUP";
export const PERSONAL_INFO = "PERSONAL_INFO";
```

![image-20231128194412636](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231128194412636.png)

### 派发行为对象分模块管理

```tsx
import * as TYPES from '../action-types';
const voteAction = {
    support() {
        return {
            type: TYPES.VOTE_SUP
        };
    },
    oppose() {
        return {
            type: TYPES.VOTE_OPP
        };
    }
};
export default voteAction;
```

```tsx
/* 把各个版块的action合并为一个action即可 */
import voteAction from "./voteAction";

const action = {
    vote: voteAction,
};
export default action;
```

```tsx
// 使用
store.dispatch(action.vote.support());
```

![image-20231128195314707](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231128195314707.png)

## Redux 的不足

1. 基于 getstate 获取的公共状态，与 redux 中的公共状态共用相同的堆地址，这样导致是可以直接修改公共状态信息的。
2. 组件更新的方法全都放在事件池中，当公共状态改变，会通知事件池中所有的方法执行，相关组件都要更新(放置组件更新方法时，无法设置状态的依赖，这样，后期无论哪个状态被修改，事件池中的所有方法都要执行)。(遍历事件池方法)
3. 所有 reducer 的合并，并不是代码的合并，而是创建出一个总的 reducer 出来，每一次派发，都是让总的 reducer 执行，此时，每个模块的 reducer 都会执行一遍(即使中间已经发现匹配的逻辑，也会执行其他模块的reducer)(遍历每个模块的reducer)

## Redux中间件

![image-20231130141307891](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231130141307891.png)

### reduxLogger

```tsx
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

const store = createStore(
    reducer,
    applyMiddleware(reduxLogger)
);
export default store;
```

![image-20231130142346190](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231130142346190.png)

### Redux-thunk

在不使用任何中间件的情况下，actionCreator对象中，是不支持异步操作的，只能立即返回标准的action对象

![image-20231130143816043](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231130143816043.png)

使用：

1.导入

```tsx
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

const store = createStore(
    reducer,
    applyMiddleware(reduxLogger, reduxThunk)
);
export default store;
```

2.action 改为函数写法，返回的是一个异步函数

```tsx
const voteAction = {
    // redux-thunk中间件的语法
    support() {
        return async (dispatch) => {
            await delay();
            dispatch({
                type: TYPES.VOTE_SUP
            });
        };
    }}
```

![image-20231130151108370](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231130151108370.png)

![image-20231130151347141](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231130151347141.png)

### Redux-promise

![image-20231130151712860](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231130151712860.png)

![image-20231130151813156](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231130151813156.png)

![image-20231130151824023](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231130151824023.png)







# React-Redux

让redux在react项目中可以更简单的调用！

## Provider：将 store 注册到上下文中

react-redux 内部创建了上下文对象，通过 store 属性将创建的 store 放入上下文中。

```tsx
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Vote />
        </Provider>
    </ConfigProvider>
);
```

## connect：把公共状态和派发任务当做属性传递给组件

在组建中获取公共信息时，无需再基于上下文获取 store ，也无需再基于 getstate 获取公共状态，直接基于 react-redux 提供的 connect 函数处理即可。并且，也不再需要手动将组件更新的方法放入事件池中，react-redux 内部已处理好。

connect函数接受两个参数：mapStateToProps，mapDispatchToProps。这两个参数均为函数。mapStateToProps可以获取到redux中的公共状态，把组件需要的信息作为属性，传递组件。mapDispatchToProps把需要派发的任务，当做属性传递给组件。connect函数返回值也是一个函数，将需要使用 redux 的组件作为该函数的参数。

```tsx
// mapStateToProps
import React from "react";
import { connect } from 'react-redux';

class VoteMain extends React.Component {
    render() {
        let { supNum, oppNum } = this.props;
        return <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>;
    }
}
export default connect(state => state.vote)(VoteMain);

// mapDispatchToProps
const VoteFooter = function VoteFooter(props) {
    let { support, oppose } = props;
    return <div className="footer">
        <Button type="primary" onClick={support}>支持</Button>
        <Button type="primary" danger onClick={oppose}>反对</Button>
    </div >;
};
export default connect(
    null,
    dispatch => {
        return {
            support() {
                dispatch(action.vote.support());
            },
            oppose() {
                dispatch(action.vote.oppose());
            }
        };
    }
)(VoteFooter); 

// mapDispatchToProps 简洁写法
const voteAction = {
    support() {
        return {
            type: TYPES.VOTE_SUP
        };
    },
    oppose() {
        return {
            type: TYPES.VOTE_OPP
        };
    }
};
const action = {
    vote: voteAction,
    personal: personalAction
};
connect(null, action.vote)(VoteFooter);
```

![image-20231129155448238](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231129155448238.png)

![image-20231129155915898](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231129155915898.png)

![image-20231129170803187](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231129170803187.png)



# Redux-toolkit



​	

# 路由：react-router-dom

## 单页面与多页面应用

![image-20231204173839392](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231204173839392.png)

## 路由设计模式

### 哈希(hash)路由

原理：每一次路由跳转，都是改变页面的hash值；并且监听hashchange事件，渲染不同的内容！！

```html
<nav class="nav-box">
    <a href="#/">首页</a>
    <a href="#/product">产品中心</a>
    <a href="#/personal">个人中心</a>
</nav>
<div class="view-box"></div>

<!-- IMPORT JS -->
<script>
    // 路由容器
    const viewBox = document.querySelector('.view-box');
    // 路由表
    const routes = [{
        path: '/',
        component: '首页内容'
    }, {
        path: '/product',
        component: '产品中心内容'
    }, {
        path: '/personal',
        component: '个人中心内容'
    }];

    // 页面一加载，我们设置默认的hash值
    location.hash = '/';

    // 路由匹配的方法
    const routerMatch = function routerMatch() {
        let hash = location.hash.substring(1),
            text = "";
        routes.forEach(route => {
            if (route.path === hash) {
                text = route.component;
            }
        });
        viewBox.innerHTML = text;
    };
    routerMatch();
    window.addEventListener('hashchange', routerMatch);
</script>
```



### 浏览器 ( history ) 路由

原理：利用H5的HistoryAPI完成路由的切换和组件的渲染！

```html
<nav class="nav-box">
    <a href="/">首页</a>
    <a href="/product">产品中心</a>
    <a href="/personal">个人中心</a>
</nav>
<div class="view-box"></div>

<!-- IMPORT JS -->
<script>
    const viewBox = document.querySelector('.view-box'),
        navBox = document.querySelector('.nav-box');
    const routes = [{
        path: '/',
        component: '首页内容'
    }, {
        path: '/product',
        component: '产品中心内容'
    }, {
        path: '/personal',
        component: '个人中心内容'
    }];

    // 路由匹配
    const routerMatch = function routerMatch() {
        let path = location.pathname,
            text = "";
        routes.forEach(route => {
            if (route.path === path) {
                text = route.component;
            }
        });
        viewBox.innerHTML = text;
    };

    history.pushState({}, "", "/");
    routerMatch();

    // 控制路由切换
    navBox.addEventListener('click', function (ev) {
        let target = ev.target;
        if (target.tagName === 'A') {
            // 阻止默认行为
            ev.preventDefault();
            // 实现路由的跳转
            history.pushState({}, "", target.href);
            routerMatch();
        }
    });

    /* 
     popstate事件触发时机：
     1）点击浏览器的前进、后退按钮
     2）调用history.go/forward/back等方法
     注意：history.pushState/replaceState不会触发此事件
     */
    window.addEventListener('popstate', routerMatch);
</script>
```



## react-router-dom V5版本

### 基础使用

1、<Link>实现路由切换/跳转的组件

-    最后渲染完毕的结果依然是 a 标签
-    它可以根据路由模式，自动设定点击 a 切换的方式

2、<Link>等组件，需要放在Router(BrowserRouter/HashRouter)的内部！

3、每当页面加载或者路由切换的时候，都会去和每一个<Route>进行匹配

- 和其中一个匹配成功后，还会继续向下匹配，所以需要基于<Switch>处理
- 默认是“非精准”匹配的，所以我们需要基于`exact`处理，实现精准匹配

```jsx
/* App.jsx */
import React from "react";
import { HashRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import A from './views/A';
import B from './views/B';
import C from './views/C';

const App = function App() {
    return <HashRouter>
        {/* 导航区域 */}
        <nav className="nav-box">
            <Link to="/">A</Link>
            <Link to="/b">B</Link>
            <Link to="/c">C</Link>
        </nav>
        {/* 路由容器:每一次页面加载或者路由切换完毕，都会根据当前的哈希值，到这里和每一个Route进行匹配，把匹配到的组件，
        放在容器中渲染！！ */}
        <div className="content">
            <Switch>
                <Route exact path="/" component={A} />
                <Route path="/b" component={B} />
                <Route path="/c" component={C} />
                {/* <Route component={404组件} /> */}
                <Redirect to="/" />
                {/* 
                  // 放在最后一项，path设置'*'或者不写，意思是：以上都不匹配，则执行这个规则
                  <Route path="*" component={404组件} /> 
                  // 当然也可以不设置404组件，而是重定向到默认 / 地址：
                  <Redirect from="" to="" exact/>
                    + from:从哪个地址来
                    + to:重定向的地址
                    + exact是对from地址的修饰，开启精准匹配
                */}
            </Switch>
        </div>
    </HashRouter>;
};
export default App;
/* 
路径地址匹配的规则
  路由地址:Route中path字段指定的地址
  页面地址:浏览器URL后面的哈希值

  页面地址   路由地址   非精准匹配   精准匹配
    /         /         true      true
    /         /login    false     false
    /login    /         true      false
    /a/b      /a        true      false
    /a/b/     /a/b      true      true
    /a2/b     /a        false     false
  ....
/ 和 /xxx 算是地址中的一个整体！！
非精准匹配：
  @1 页面地址和路由地址一样，返回true
  @2 页面地址中，包含一套完整的路由地址，返回true
  @3 剩下返回的都是false
精准匹配：
  @1 两个地址只有一模一样才匹配「最后一个/可以忽略」
*/
```

在路由匹配成功后，可以基于component指定需要渲染的组件，也可以基于render指定一个函数，基于函数的返回值，动态控制渲染的内容！！在此函数中，可以处理一些事情，例如：登录检验。

```tsx
<Route path="/c" render={() => {
    if (1 === 1) {
        return <C />
    }
    return <Redirect to="/" />
}} />
```

### 二级路由

```tsx
/* App.jsx */
const App = function App() {
  return <HashRouter>
      {/* 导航区域 */}
      <nav className="nav-box">
          <Link to="/a">A</Link>
          ...
      </nav>

      {/* 内容区域 */}
      <div className="content">
          <Switch>
              <Redirect exact from="/" to="/a" />
              <Route path="/a" component={A} />
              ...
          </Switch>
      </div>
  </HashRouter>;
}
```

```tsx
/* A.jsx */
import React from "react";
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import A1 from './a/A1';
import A2 from './a/A2';
import A3 from './a/A3';

// 处理样式
import styled from "styled-components";
const DemoBox = styled.div`
    display: flex;
    .menu{
        a{
          display:block;
        }
    }
`;

const A = function A() {
    // '/a/xxx' 中的 '/a' 不能省略！！
    return <DemoBox>
        <div className="menu">
            <Link to="/a/a1">A1</Link>
            <Link to="/a/a2">A2</Link>
            <Link to="/a/a3">A3</Link>
        </div>
        <div className="content">
            <Switch>
                <Redirect exact from="/a" to="/a/a1" />
                <Route path="/a/a1" component={A1} />
                <Route path="/a/a2" component={A2} />
                <Route path="/a/a3" component={A3} />
            </Switch>
        </div>
    </DemoBox>;
};
export default A;
```

### 路由表构建

![image-20231205173857952](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231205173857952.png)

router/index.jsx

```ts
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const RouterView = function RouterView(props) {
    let { routes } = props;
    return <Switch>
        {routes.map((route, index) => {
            let { redirect, from, to, exact, path, name, component: Component, meta } = route,
                props = {};
            if (redirect) {
                props = { to };
                if (from) props.from = from;
                if (exact) props.exact = true;
                return <Redirect key={index} {...props} />
            }
            props = { path };
            if (exact) props.exact = true;
            return <Route key={index} {...props} render={() => {
                // 做一些特殊的处理，例如：登录态检验、导航守卫等
                return <Component />;
            }} />;
        })}
    </Switch>;
};
```

router/index.jsx 一级路由

```tsx
import A from '../views/A';
import B from '../views/B';
import C from '../views/C';

/* 
一级路由 
  重定向选项
    + redirect:true
    + from:从哪来
    + to:定向的地址
    + exact:精准匹配
  正常选项
    + path:匹配路径
    + name:路由名称
    + component:需要渲染的组件
    + meta:路由元信息
    + exact:精准匹配
*/
const routes = [{
    redirect: true,
    from: '/',
    to: '/a',
    exact: true
}, {
    path: '/a',
    name: 'a',
    component: A,
    meta: {}
}, {
    path: '/b',
    name: 'b',
    component: B,
    meta: {}
}, {
    path: '/c',
    name: 'c',
    component: C,
    meta: {}
}, {
    redirect: true,
    to: '/a'
}];
export default routes;
```

router/aRoutes.js 二级路由

```tsx
/* A组件的二级路由 */
import A1 from '../views/a/A1';
import A2 from '../views/a/A2';
import A3 from '../views/a/A3';

const aRoutes = [{
    redirect: true,
    from: '/a',
    to: '/a/a1',
    exact: true
}, {
    path: '/a/a1',
    name: 'a-a1',
    component: A1,
    meta: {}
}, {
    path: '/a/a2',
    name: 'a-a2',
    component: A2,
    meta: {}
}, {
    path: '/a/a3',
    name: 'a-a3',
    component: A3,
    meta: {}
}];
export default aRoutes;
```

App.jsx 一级路由使用

```tsx
import { HashRouter, Link } from 'react-router-dom';
import RouterView from "./router";
import routes from "./router/routes";
const App = function App() {
    return <HashRouter>
        ...
        <div className="content">
            <RouterView routes={routes} />
        </div>
    </HashRouter>;
};
export default App;	
```

views/A.jsx 二级路由使用

```tsx
import { Link } from 'react-router-dom';
import RouterView from "../router";
import aRoutes from "../router/aRoutes";
...
const A = function A() {
    return <DemoBox>
        ...
        <div className="content">
            <RouterView routes={aRoutes} />
        </div>
    </DemoBox>;
};
export default A;
```

### 路由懒加载

**背景**

项目开发中，若事先把所有的组件全部导入，再基于Router做路由匹配，最后项目打包时，所有的组件会打包到一个js文件当中，这样这个js文件会很大，第一次加载页面时，从服务器获取该js文件耗时较长，导致屏幕白屏，这时可以考虑路由懒加载：只将最开始要展示的内容打包到主js文件中，其余的组件打包成独立的js(或几个组件组合在一起打包)。当路由切换时，路由匹配，导入该组件相应的js文件(按需异步加载)。

**实现**

借助 React.lazy 和 ES6 的 import 实现分隔打包和按需导入

路由表中

```tsx
import { lazy } from 'react';
import A from '../views/A';

const routes = [
...
{
    ...
    component: A
}, {
    ...
    component: lazy(() => import('../views/B'))
}, {
    ...
    component: lazy(() => import('../views/C'))
}
...
];
export default routes;
```

RouterView.jsx

将异步渲染的组件使用 Suspense 包裹， 否则会报错

Suspense 作用：当内容正在加载时显示后备方案，参数：

- `children`：真正的 UI 渲染内容。如果 `children` 在渲染中被挂起，Suspense 边界将会渲染 `fallback`。
- `fallback`：真正的 UI 未渲染完成时代替其渲染的备用 UI，它可以是任何有效的 React 节点。后备方案通常是一个轻量的占位符，例如表示加载中的图标或者骨架屏。当 `children` 被挂起时，Suspense 将自动切换至渲染 `fallback`；当数据准备好时，又会自动切换至渲染 `children`。如果 `fallback` 在渲染中被挂起，那么将自动激活最近的 Suspense 边界。

```tsx
const RouterView = function RouterView(props) {
    ...
    return <Switch>
        {routes.map((route, index) => {
            ...
            return <Route key={index} {...props} render={() => {
                return <Suspense fallback={<Loading />}>
                    <Component />
                </Suspense>;
            }} />;
        })}
    </Switch>;
};
export default RouterView;
```



## react-router-dom V6版本































![image-20231027154523865](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231027154523865.png)









![image-20231027154700117](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231027154700117.png)   

![image-20231027164556571](C:\Users\100489\AppData\Roaming\Typora\typora-user-images\image-20231027164556571.png)
