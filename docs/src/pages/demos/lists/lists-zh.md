---
title: React List（列表）组件
components: Collapse, Divider, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader
---
# Lists（列表）

<p class="description">列表是对文本或图像的连续、垂直的索引。</p>

[列表](https://material.io/design/components/lists.html) 是一组连续的文本或图像。 它们由包含主要和补充操作的项子集组成，而这些操作由图标和文本表示。

## Simple List（简易列表）

{{"demo": "pages/demos/lists/SimpleList.js"}}

上一个样例的最后一个子集展示了如何渲染一个链接：

```jsx
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

//...

<ListItemLink href="#simple-list">
  <ListItemText primary="Spam" />
</ListItemLink>
```

你可以从这里查看[React Router与文档此部分结合使用的相关样例](/guides/composition/#react-router)

## Nested List（嵌套列表）

{{"demo": "pages/demos/lists/NestedList.js"}}

## Folder List（文件夹列表）

{{"demo": "pages/demos/lists/FolderList.js"}}

## 交互

您在以下的一个交互式演示可以探索不同设置的视觉效果：

{{"demo": "pages/demos/lists/InteractiveList.js"}}

## 可选的 ListItem

{{"demo": "pages/demos/lists/SelectedListItem.js"}}

## 对齐列表项

在显示3行或更多行时，您应该更改列表项的对齐，设置 `alignItems="flex-start"` 这样的属性。

{{"demo": "pages/demos/lists/AlignItemsList.js"}}

## 列表控件

### Checkbox（选择框）

一个选择框既可以是主操作，又可以是辅助操作。

该复选框是列表项的主要操作和状态指示器。 注释按钮是辅助操作和单独的目标。

{{"demo": "pages/demos/lists/CheckboxList.js"}}

该复选框是列表项的辅助操作和单独的目标。

{{"demo": "pages/demos/lists/CheckboxListSecondary.js"}}

### Switch （开关）

该开关是辅助操作和单独的目标。

{{"demo": "pages/demos/lists/SwitchListSecondary.js"}}

## 固定的 Subheader List（副标题列表）

在滚动列表时，子标题保持固定在屏幕的顶端，直到被下一个子标题推离屏幕。

此功能依赖于 CSS sticky 定位。 可惜, 这一功能并未在我们支持的所有浏览器中 [实现](https://caniuse.com/#search=sticky) 。 如果不支持, 则默认为 `disableSticky`。

{{"demo": "pages/demos/lists/PinnedSubheaderList.js"}}

## Inset List（嵌入列表）

{{"demo": "pages/demos/lists/InsetList.js"}}