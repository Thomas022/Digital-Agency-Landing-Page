# Template de proposta comercial — EsseDe Digital

Este diretório contém uma proposta comercial reutilizável em HTML, CSS e JavaScript puro. Não exige instalação, framework ou etapa de compilação.

## Como criar uma proposta

1. Duplique a pasta `template-proposta`.
2. Renomeie a cópia com um identificador simples do cliente, por exemplo `empresa-exemplo`.
3. Abra `index.html` e substitua todos os campos no formato `{{CAMPO}}`.
4. Remova oportunidades, entregáveis ou indicadores que não se apliquem ao projeto.
5. Confira o link de agendamento, investimento, validade e contato comercial.
6. Abra o arquivo em um navegador para revisão.
7. Use o botão **Salvar em PDF** para gerar uma versão anexável.

Para localizar todos os campos pendentes:

```sh
rg -o '\{\{[A-Z0-9_]+\}\}' index.html | sort -u
```

## Grupos de placeholders

- `{{NOME_CLIENTE}}`, `{{TITULO_PROPOSTA}}` e `{{RESUMO_META}}`: identificação e metadados.
- `{{TITULO_PRINCIPAL}}`, `{{DESTAQUE_TITULO}}` e `{{RESUMO_PROPOSTA}}`: capa.
- `{{INTRODUCAO_*}}`: contexto personalizado do cliente.
- `{{OPORTUNIDADE_*}}`: quatro necessidades ou oportunidades diagnosticadas.
- `{{NOME_PROJETO}}`, `{{DESCRICAO_PROJETO}}` e `{{ENTREGA_*}}`: solução e escopo.
- `{{FASE_*}}`: cronograma em três etapas.
- `{{INDICADOR_*}}`: critérios de sucesso.
- `{{DURACAO_PROJETO}}`, `{{FORMATO_PROJETO}}`, `{{INVESTIMENTO}}` e `{{PREMISSA_COMERCIAL}}`: condições comerciais.
- `{{TITULO_CTA}}`, `{{DESCRICAO_CTA}}`, `{{LINK_AGENDAMENTO}}` e `{{CONTATO_COMERCIAL}}`: encerramento.

## Boas práticas

- Baseie a introdução em evidências públicas e informações confirmadas pelo cliente.
- Trate hipóteses como hipóteses; não apresente problemas internos como fatos sem validação.
- Evite prometer percentuais de resultado antes de conhecer a linha de base.
- Use de três a seis entregáveis claros, vinculados às oportunidades apresentadas.
- Mantenha uma única ação principal no encerramento.
- Antes de enviar, confirme que nenhum placeholder permanece no arquivo.

## Arquivos

- `index.html`: conteúdo e estrutura da proposta.
- `proposal.css`: identidade visual, responsividade e estilos de impressão.
- `proposal.js`: impressão em PDF, ano automático e animações de entrada.
