# Spacing（间距）

<p class="description">各种简写响应边距和填充实用程序类，用于修改元素的外观。</p>

## 符号

空间实用程序将速记边距和填充道具转换为边距和填充CSS声明。 道具使用格式`{property}{sides}` 命名。

其中*属性*是其中之一：

- `m` - 对于设置*margin*
- `p` - 对于设置*padding*

哪边*边*是其中之一：

- `t` - 对于设置* margin-top*或*padding-top*的类
- `b` - 对于设置*margin-bottom的类*或*padding-bottom*的类
- `l` - 对于设置*margin-left*或*padding-left*的类
- `r` - 对于设置*margin-right*或*padding-right*的类
- `x` - 对于设置** -left*和** -right*的类
- `y` - 对于设置** -top*和** -bottom*的类
- 空白 - 用于在元素的所有4个边上设置边距或填充的类

## 转型

根据输入和主题配置，应用以下转换：

- 输入：`数字` & 主题：`数字` ：该属性乘以主题值。

```jsx
const theme = {
  spacing: 8,
}

<Box m={-2} /> // margin: -16px;
<Box m={0} /> // margin: 0px;
<Box m={0.5} /> // margin: 4px;
<Box m={2} /> // margin: 16px;
```

- 输入：`数字` & 主题：`数组` ：属性值用作数组索引。

```jsx
const theme = {
  spacing: [0, 2, 3, 5, 8],
}

<Box m={-2} /> // margin: -3px;
<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 3px;
```

- 输入：`数字` & 主题：`功能` ：使用属性值调用该函数。

```jsx
const theme = {
  spacing: value => value ** 2,
}

<Box m={0} /> // margin: 0px;
<Box m={2} /> // margin: 4px;
```

- input: `string`: 该属性作为原始CSS值传递。

```jsx
<Box m="2rem" /> // margin: 2rem;
<Box mx="auto" /> // margin-left: auto; margin-right: auto;
```

## 示例

{{"demo": "pages/system/spacing/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box p={1}>…
<Box m={1}>…
<Box p={2}>…
```

## 水平居中

{{"demo": "pages/system/spacing/HorizontalCentering.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box mx="auto">…
```

## API

```js
import { spacing } from '@material-ui/system';
```

| 导入名称      | Prop | CSS 属性                          | Theme key                                                        |
|:--------- |:---- |:------------------------------- |:---------------------------------------------------------------- |
| `spacing` | `m`  | `margin`                        | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `mt` | `margin-top`                    | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `mr` | `margin-right`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `mb` | `margin-bottom`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `ml` | `margin-left`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `mx` | `margin-left`, `margin-right`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `my` | `margin-top`, `margin-bottom`   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `p`  | `padding`                       | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `pt` | `padding-top`                   | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `pr` | `padding-right`                 | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `pb` | `padding-bottom`                | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `pl` | `padding-left`                  | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `px` | `padding-left`, `padding-right` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |
| `spacing` | `py` | `padding-top`, `padding-bottom` | [`spacing`](/customization/default-theme/?expand-path=$.spacing) |


*Some people find the prop shorthand confusing, you can use the full version if you prefer:*

```diff
-<Box pt={2} />
+<Box paddingTop={2} />
```

```diff
-<Box px={2} />
+<Box paddingX={2} />
```