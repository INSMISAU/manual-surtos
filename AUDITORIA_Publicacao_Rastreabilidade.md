# Auditoria do mecanismo de publicação — Matriz de rastreabilidade (BD → manual publicado)

*Auditoria FINAL, após implementação da regra única. Encerra a reclamação 4.*

## Regra única do pipeline
> **Tudo o que é editável no CMS é reflectido no manual publicado. Tudo o que não é editável no CMS mantém-se preservado do manual-base.**

Aplicada de forma genérica: ao publicar, o manual-base é sobreposto com **todos** os dados editáveis da base de dados (doenças, síndromes, secções — nome, título, conteúdo, imagens, ordem e pertença). O que não existe na base de dados nem é editável no CMS (prefácio, figuras do manual, glossário, texto integral) é preservado do base.

## Legenda
✅ Publicado (editável no CMS → reflecte no manual)  ·  🔒 Preservado do base (não editável no CMS)  ·  ⚪ Interno (não é conteúdo)

## Tabela `doencas`
| Campo | Onde no manual | Estado |
|---|---|---|
| `nome` | content `diseases[].name` + ddata `.name` | ✅ |
| `letra` | `.letter` (ambos) | ✅ |
| `slug` | chave de correspondência | ✅ identidade |
| `imagens` | content `diseases[].images` | ✅ (corrigido) |
| `sindrome_id` (pertença) | `groups[].diseases` + `diseases[].group` | ✅ (corrigido — reconstruído da BD) |
| `pontos_chave` | ddata `.keys` + `fields` | ✅ |
| `definicao_caso` | ddata `cases` (sincCasos) + `fields` | ✅ |
| `limiares_notificacao` | ddata `secfull` + `fields` | ✅ |
| `agente_infeccioso` | ddata `secfull` + `fields` | ✅ |
| `fonte_periodo_infeccao` | ddata `secfull` + `fields` | ✅ |
| `grupos_risco` | ddata `risks` (sincRiscos) + `fields` | ✅ |
| `protocolo_investigacao` | ddata `secfull` + `fields` | ✅ |
| `colheita_manuseio_amostras` | ddata `secfull` + `fields` | ✅ |
| (síndrome na ficha) ddata `.grp` | cabeçalho da ficha | ✅ (corrigido) |
| (texto integral) ddata `.full` | "Ver texto integral" | 🔒 **não editável no CMS** → preservado do base |
| `estado` | filtro (só publicado) | ⚪ workflow |
| `versao`, `atualizado_por` | — | ⚪ interno |

## Tabela `sindromes`
| Campo | Onde no manual | Estado |
|---|---|---|
| `nome` | content `groups[].name` + ddata `.grp` das doenças | ✅ |
| `ordem` | ordem das síndromes na navegação | ✅ (corrigido) |

## Tabela `seccoes`
| Campo | Onde no manual | Estado |
|---|---|---|
| `titulo` | content `sections[].title` | ✅ |
| `conteudo` | content `sections[].blocks` (figuras preservadas) | ✅ |
| `ordem` | ordem das secções | ✅ (corrigido) |
| `estado` | filtro | ⚪ workflow |

## Tabela `glossario_abreviaturas`
| Campo | Onde no manual | Estado |
|---|---|---|
| `sigla` / `significado` | content `glossary` | 🔒 **não há editor de glossário no CMS** → preservado do base |

## Conteúdo preservado do base (não editável no CMS — correcto)
🔒 Prefácio / mensagem do Director · figuras do manual (Fig. 1–7) · tabelas do manual · texto integral das fichas (`full`) · glossário · links internos · ícones/imagens institucionais · layout/CSS/JS.

---

## Auditoria final — resultado
**Não existe nenhum campo editável no CMS que fique de fora da publicação.** Todos os campos das tabelas `doencas`, `sindromes` e `seccoes` que o utilizador consegue editar são reflectidos no manual. Os campos 🔒 são exactamente os que **não** têm edição no CMS — cumprindo a regra.

## Critério de encerramento (teste a passar no UAT)
1. Alterar qualquer conteúdo editável no CMS (nome, título, secção, síndrome, imagem, ordem…).
2. Guardar → Publicar.
3. O manual publicado fica **exactamente igual** ao que está no CMS.

## Nota de validação (UAT)
A reconstrução da navegação (ordem/pertença de síndromes e doenças) é feita a partir da base de dados. Para uma doença aparecer na navegação, tem de existir no manual-base **e** estar publicada na BD. Confirmar no teste que todas as doenças/síndromes/secções aparecem na ordem e no grupo esperados — é a garantia de que a BD e o base estão alinhados.
