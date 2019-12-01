---
title: Componente React de Visualização em Árvore
components: TreeView, TreeItem
---

# Visualização em árvore

<p class="description">Um modo de exibição de árvore widget apresenta uma lista hierárquica.</p>

As visualizações em árvore podem ser usadas para representar um navegador do sistema de arquivos que exibe pastas e arquivos, um item que representa uma pasta pode ser expandido para revelar o conteúdo da pasta, que pode ser arquivos, pastas ou ambos.

{{"demo": "pages/components/tree-view/FileSystemNavigator.js"}}

## Controlled

The tree view also offers a controlled API.

{{"demo": "pages/components/tree-view/ControlledTreeView.js"}}

## Customized tree view

### Ícones customizados, borda e animação

{{"demo": "pages/components/tree-view/CustomizedTreeView.js"}}

### Gmail clone

{{"demo": "pages/components/tree-view/GmailTreeView.js"}}

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#TreeView)

The component follows the WAI-ARIA authoring practices.