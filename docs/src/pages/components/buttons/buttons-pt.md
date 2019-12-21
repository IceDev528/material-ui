---
title: Componente React para Botão
components: Button, ButtonGroup, Fab, IconButton, ButtonBase, Zoom
---

# Button (botão)

<p class="description">Botões permitem que os usuários tomem ações e decisões com um simples toque.</p>

[Botões](https://material.io/design/components/buttons.html) comunicam ações que os usuários podem realizar. Eles são normalmente colocados em toda a interface do usuário, em lugares como:

- Caixa de diálogo
- Janelas modais
- Formulários
- Cartões
- Barras de ferramentas

## Botões Contidos

[Botões Contidos](https://material.io/design/components/buttons.html#contained-button) tem alta ênfase, distinguem-se pelo uso de elevação e preenchimento. Eles contém as principais ações da sua aplicação.

O último exemplo desta demonstração mostra como usar um botão de upload.

{{"demo": "pages/components/buttons/ContainedButtons.js"}}

You can remove the elevation with the `disableElevation` prop.

{{"demo": "pages/components/buttons/DisableElevation.js"}}

## Botões de Texto

[Botões de texto](https://material.io/design/components/buttons.html#text-button) são utilizados tipicamente para ações menos-pronunciadas, incluindo aquelas localizadas em:

- Caixas de diálogo
- Cartões

Em cartões, os botões de texto ajudam a manter a ênfase no conteúdo do cartão.

{{"demo": "pages/components/buttons/TextButtons.js"}}

## Botões Delineados

[Botões delineados](https://material.io/design/components/buttons.html#outlined-button) são botões com ênfase média. Eles contém ações que são importantes, mas não são as ações primárias de um aplicativo.

Botões delineados são uma alternativa de menor ênfase comparado com botões contidos, ou uma uma alternativa de maior ênfase comparado com botões de texto.

{{"demo": "pages/components/buttons/OutlinedButtons.js"}}

## Botões Agrupados

The `ButtonGroup` component can be used to group buttons.

{{"demo": "pages/components/buttons/GroupedButtons.js"}}

### Group sizes and colors

{{"demo": "pages/components/buttons/GroupSizesColors.js"}}

### Group orientation

{{"demo": "pages/components/buttons/GroupOrientation.js"}}

### Botão Dividido

O ButtonGroup também pode ser usado para criar um botão dividido. A lista suspensa pode alterar a ação do botão (como neste exemplo), ou ser usada para acionar imediatamente uma ação relacionada.

{{"demo": "pages/components/buttons/SplitButton.js"}}

## Botões de Ação Flutuante

Um [Botão de Ação Flutuante](https://material.io/design/components/buttons-floating-action-button.html) (BAF) executa a ação principal, ou mais comum, em uma tela. Ele aparece na frente de todos os conteúdos da tela, normalmente como uma forma circular com um ícone em seu centro. BAFs vêm em dois tipos: regular e estendido.

Use apenas um BAF se é a maneira mais adequada para apresentar a ação principal de uma tela.

É recomendado utilizar apenas um botão de ação flutuante por tela, esse botão deve representar a ação mais comum.

{{"demo": "pages/components/buttons/FloatingActionButtons.js"}}

O botão de ação flutuante anima na tela como uma parte expansiva do material, por padrão.

Um botão de ação flutuante que abranja várias telas laterais (como telas com guias) deve desaparecer brevemente, então reapareça se sua ação mudar.

A transição de zoom pode ser usada para conseguir isso. Observe que, como as animações de entrada e saída são acionadas ao mesmo tempo, usamos `enterDelay` para permitir que a animação do botão de ação flutuante de saída termine antes que a nova seja inserida.

{{"demo": "pages/components/buttons/FloatingActionButtonZoom.js", "bg": true}}

## Upload button

{{"demo": "pages/components/buttons/UploadButtons.js"}}

## Tamanhos

Gosta de botões maiores ou menores? Use a propriedade `size`.

{{"demo": "pages/components/buttons/ButtonSizes.js"}}

## Botões com ícones e "Label"

Às vezes você pode querer ter ícones para determinados botão para melhorar o UX do aplicativo como reconhecemos logotipos mais facilmente do que o texto sem formatação. Por exemplo, se você tem um botão com a açõo de "deletar" você pode rotulá-lo com um ícone do caixote de lixo.

{{"demo": "pages/components/buttons/IconLabelButtons.js"}}

## Botões de Icone

Botões de ícones são comumente encontrados em barras de aplicativos e barras de ferramentas.

Ícones são também adequadas para botões de alternância que permitem uma escolha única para ser selecionado ou desmarcada, como adicionar ou remover uma estrela para um item.

{{"demo": "pages/components/buttons/IconButtons.js"}}

## Botões Customizados

Aqui estão alguns exemplos de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/components/).

{{"demo": "pages/components/buttons/CustomizedButtons.js", "defaultCodeOpen": false}}

👑 Se você está procurando inspiração, você pode verificar [os exemplos de customização de MUI Treasury](https://mui-treasury.com/components/button).

## Botões complexos

O botões de texto, botões contidos, botões de ação flutuante e ícone botões são construídos em cima do mesmo componente: O componente `ButtonBase `. Você pode tirar vantagem deste componente de nível mais abastrato para construir interações personalizadas.

{{"demo": "pages/components/buttons/ButtonBases.js"}}

## Biblioteca de roteamento de terceiros

Um caso de uso comum é usar o botão para acionar uma navegação para uma nova página. O componente `ButtonBase` fornece uma propriedade para lidar com este caso de uso: `componente`. No entanto, para alguns polyfills de foco `ButtonBase` requer o nó DOM do componente fornecido. Isso é obtido anexando-se uma referência ao componente e esperando que o componente envie essa referência para o nó DOM subjacente. Dado que muitos dos componentes interativos dependem do `ButtonBase`, você deve ser capaz de tirar proveito em todos os lugares.

Aqui está um [exemplo de integração com react-router](/guides/composition/#button).

## Limitações

### Cursor não permitido

O componente ButtonBase define `pointer-events: none;` ao desabilitar os botões, o que previne que o cursor desabilitado seja exibido.

Se você deseja usar `not-allowed`, você tem duas opções:

1. ** apenas CSS**. Você pode remover o estilo dos eventos do ponteiro no estado "desabilitado" do elemento `<button>` :

  ```css
  .MuiButtonBase-root:disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
  ```

Então:

- Você deve adicionar `eventos-ponteiro: nenhum;` novamente quando você precisa exibir dicas [ ferramentas em elementos desabilitados](/components/tooltips/#disabled-elements)</li> 
    
    - O cursor não muda se você renderizar algum outro elemento de botão, por exemplo, um elemento link `<a>`.</ul> 
    
    2. ** Alteração no DOM** Você pode encapsular o botão:
    
      ```jsx
      <span style={{ cursor: 'not-allowed' }}>
        <Button component={Link} disabled>
          disabled
        </Button>
      </span>
      ```
    
    Isso tem a vantagem de suportar qualquer elemento, por exemplo, um elemento de link `<a>`.