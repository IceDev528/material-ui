---
title: Portal React component
components: Portal
---

# Portal

<p class="description">The portal component renders its children into a new "subtree" outside of current component hierarchy.</p>

- 📦 [1.3 kB gzipped](/size-snapshot)

ポータルコンポーネントの子は、指定された `コンテナ` 追加されます。

コンポーネントは、 [`Modal`](/components/modal/) および [`Popper`](/components/popper/) コンポーネントによって内部的に使用されます。 サーバーでは、コンテンツはレンダリングされません。 子要素を見るために、クライアントのハイドレーションを待つ必要があります。

## Simple Portal

{{"demo": "pages/components/portal/SimplePortal.js"}}