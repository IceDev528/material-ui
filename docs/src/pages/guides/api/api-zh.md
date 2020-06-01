# API设计方法

<p class="description">开发团队在之前的版本了解了 Material-UI 如何被使用。在v1重写时，重新考虑了组件API的设计方法论。</p>

> API设计的难点在于你可以让一些复杂的东西看起来简单，也可能把简单的东西搞得复杂。

[@sebmarkbage](https://twitter.com/sebmarkbage/status/728433349337841665)

正如Sebastian Markbage [指出](https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html)，没有抽象优于错误的抽象。 我们提供低级的组件以最大化保留可用性。

## 构成

您可能已经注意到API中有关组合组件的一些不一致之处。 为了提供一些透明度，我们在设计API时一直使用以下规则：

1. 使用` children `属性是使用React进行合成的惯用方法。
2. 有时我们只需要有限的子组成，例如当我们不需要允许子顺序排列时。 在这种情况下，提供显式属性可以使实现更简单，更高效; 例如，`Tab`采用`icon`和`label`属性。
3. API一致性很重要。

## 规则

除了上述构成权衡之外，我们还执行以下规则：

### 传播

Props supplied to a component which are not explictly documented, are spread to the root element; for instance, the `className` property is applied to the root.

现在，假设您要禁用` MenuItem `上的涟漪。 您可以利用传播行为：

```jsx
<MenuItem disableRipple />
```

` disableRipple `属性将以这种方式流动：[` MenuItem `](/api/menu-item/)> [` ListItem `](/api/list-item/)> [` ButtonBase `](/api/button-base/)。

### 原生属性

我们避免记录DOM支持的本机属性，如[` className `](/customization/components/#overriding-styles-with-class-names)。

### CSS classes

All components accept a [`classes`](/customization/components/#overriding-styles-with-classes) prop to customize the styles. 类设计回答了两个约束： 使类结构尽可能简单，同时足以实现Material Design规范。

- 应用于根元素的类始终称为` root `。
- 所有默认样式都分组在一个类中。
- 应用于非根元素的类以元素的名称为前缀，例如， Dialog组件中的` paperWidthXs `。
- 由布尔属性应用的variants **不是** 前缀，例如 `rounded` 类由 `rounded` 属性应用
- 由 enum 属性应用的variants ** 是 ** 前缀, 例如 ` colorPrimary ` 类 应用的 ` color = "primary" ` 属性。
- Variant具有 ** 一个特定级别 **。 `color`和`variant`属性被视为variant。 样式特异性越低, 它就越容易覆盖。
- 我们增加了variant修饰符的特异性。 我们已经 ** 必须这样做 ** 为伪类 (`:hover `, `:focus ` 等)。 它允许更多的控制，但代价是更多的样板。 希望它也更直观。

```js
const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};
```

### 嵌套的组件

组件内的嵌套组件具有:

- their own flattened properties when these are key to the top level component abstraction, for instance an `id` prop for the `Input` component.
- 当用户可能需要调整内部render方法的子组件时，他们自己的` xxxProps `属性，例如，在内部使用`input`的组件上公开` inputProps `和` InputProps `属性。
- 他们自己的` xxxComponent `属性，用于执行组件注入。
- their own `xxxRef` prop when you might need to perform imperative actions, for instance, exposing an `inputRef` prop to access the native `input` on the `Input` component. 这有助于回答问题[“我如何访问DOM元素？”](/getting-started/faq/#how-can-i-access-the-dom-element)

### 属性名称

应根据 ** 默认值 ** 选择布尔属性的名称。 例如, 输入元素上的 ` disabled ` 特性 (如果提供) 默认为 ` true `。 此选项允许速记符号:

```diff
-<Input enabled={false} />
+<Input disabled />
```

### 受控组件

大多数受控组件通过 ` value ` 和 ` onChange ` 属性进行控制, 但是, ` onChange `/` onClose `/` onOpen ` 组合用于显示相关状态。

### 布尔值 vs 枚举

为组件的变体设计API有两种选择：使用* boolean*; 或者使用* enum *。 例如, 让我们取一个具有不同类型的按钮。 每个选项都有其优点和缺点:

- 选项 1 * 布尔值(boolean) *:
    
    ```tsx
    type Props = {
    contained: boolean;
    fab: boolean;
    };
    ```
    
    This API enables the shorthand notation: `<Button>`, `<Button contained />`, `<Button fab />`.

- 选项2 *枚举(enum)*
    
    ```tsx
    type Props = {
      variant: 'text' | 'contained' | 'fab';
    }
    ```
    
    这个API更详细： `<Button>`,`<Button variant="contained">`,`<Button variant="fab">`。
    
    However it prevents an invalid combination from being used, bounds the number of properties exposed, and can easily support new values in the future.

Material-UI组件根据以下规则使用两种方法的组合：

- A *boolean* is used when **2** possible values are required.
- An *enum* is used when **> 2** possible values are required, or if there is the possibility that additional possible values may be required in the future.

Going back to the previous button example; since it requires 3 possible values, we use an *enum*.

### Ref

The `ref` is forwarded to the root element. This means that, without changing the rendered root element via the `component` prop, it is forwarded to the outermost DOM element which the component renders. If you pass a different component via the `component` prop, the ref will be attached to that component instead.

## Glossary

- **host component**: a DOM node type in the context of `react-dom`, e.g. a `'div'`. See also [React Implementation Notes](https://reactjs.org/docs/implementation-notes.html#mounting-host-elements).
- **host element**: a DOM node in the context of `react-dom`, e.g. an instance of `window.HTMLDivElement`.
- **outermost**: The first component when reading the component tree from top to bottom i.e. breadth-first search.
- **root component**: the outermost component that renders a host component.
- **root element**: the outermost element that renders a host component.