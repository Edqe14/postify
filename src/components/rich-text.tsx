import { withProps } from '@udecode/cn';
import {
  createPlateEditor,
  Plate,
  ParagraphPlugin,
  PlateLeaf,
} from '@udecode/plate-common/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from '@udecode/plate-code-block/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import { ColumnPlugin, ColumnItemPlugin } from '@udecode/plate-layout/react';
import { CaptionPlugin } from '@udecode/plate-caption/react';
import {
  MentionPlugin,
  MentionInputPlugin,
} from '@udecode/plate-mention/react';
import {
  TablePlugin,
  TableRowPlugin,
  TableCellPlugin,
  TableCellHeaderPlugin,
} from '@udecode/plate-table/react';
import { TodoListPlugin } from '@udecode/plate-list/react';
import { DatePlugin } from '@udecode/plate-date/react';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
} from '@udecode/plate-basic-marks/react';
import {
  FontColorPlugin,
  FontBackgroundColorPlugin,
  FontSizePlugin,
} from '@udecode/plate-font';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { AlignPlugin } from '@udecode/plate-alignment';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { LineHeightPlugin } from '@udecode/plate-line-height';
import { AutoformatPlugin } from '@udecode/plate-autoformat/react';
import { BlockSelectionPlugin } from '@udecode/plate-selection/react';
import { DndPlugin } from '@udecode/plate-dnd';
import { EmojiPlugin } from '@udecode/plate-emoji/react';
import { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break/react';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import { ResetNodePlugin } from '@udecode/plate-reset-node/react';
import { DeletePlugin } from '@udecode/plate-select';
import { TabbablePlugin } from '@udecode/plate-tabbable/react';
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { CommentsPlugin } from '@udecode/plate-comments/react';
import { DocxPlugin } from '@udecode/plate-docx';
import { CsvPlugin } from '@udecode/plate-csv';
import { MarkdownPlugin } from '@udecode/plate-markdown';
import { JuicePlugin } from '@udecode/plate-juice';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BlockquoteElement } from '@/components/ui/blockquote-element';
import { CodeBlockElement } from '@/components/ui/code-block-element';
import { CodeLineElement } from '@/components/ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/ui/code-syntax-leaf';
import { ExcalidrawElement } from '@/components/ui/excalidraw-element';
import { HrElement } from '@/components/ui/hr-element';
import { ImageElement } from '@/components/ui/image-element';
import { LinkElement } from '@/components/ui/link-element';
import { LinkFloatingToolbar } from '@/components/ui/link-floating-toolbar';
import { ToggleElement } from '@/components/ui/toggle-element';
import { ColumnGroupElement } from '@/components/ui/column-group-element';
import { ColumnElement } from '@/components/ui/column-element';
import { HeadingElement } from '@/components/ui/heading-element';
import { MediaEmbedElement } from '@/components/ui/media-embed-element';
import { MentionElement } from '@/components/ui/mention-element';
import { MentionInputElement } from '@/components/ui/mention-input-element';
import { ParagraphElement } from '@/components/ui/paragraph-element';
import { TableElement } from '@/components/ui/table-element';
import { TableRowElement } from '@/components/ui/table-row-element';
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/components/ui/table-cell-element';
import { TodoListElement } from '@/components/ui/todo-list-element';
import { DateElement } from '@/components/ui/date-element';
import { CodeLeaf } from '@/components/ui/code-leaf';
import { CommentLeaf } from '@/components/ui/comment-leaf';
import { CommentsPopover } from '@/components/ui/comments-popover';
import { HighlightLeaf } from '@/components/ui/highlight-leaf';
import { KbdLeaf } from '@/components/ui/kbd-leaf';
import { Editor } from '@/components/ui/editor';
import { FixedToolbar } from '@/components/ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/ui/floating-toolbar-buttons';
import { withPlaceholders } from '@/components/ui/placeholder';
import { withDraggables } from '@/components/ui/with-draggables';
import { EmojiInputElement } from '@/components/ui/emoji-input-element';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Value } from '@udecode/plate-common';
import { useMemo } from 'react';

export const createEditor = (content: Value) =>
  createPlateEditor({
    plugins: [
      BlockquotePlugin,
      CodeBlockPlugin,
      ParagraphPlugin,
      HeadingPlugin,
      HorizontalRulePlugin,
      LinkPlugin.configure({
        render: { afterEditable: () => <LinkFloatingToolbar /> },
      }),
      ImagePlugin,
      ExcalidrawPlugin,
      TogglePlugin,
      ColumnPlugin,
      MediaEmbedPlugin,
      CaptionPlugin.configure({
        options: { plugins: [ImagePlugin, MediaEmbedPlugin] },
      }),
      MentionPlugin,
      TablePlugin,
      TodoListPlugin,
      DatePlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      StrikethroughPlugin,
      CodePlugin,
      SubscriptPlugin,
      SuperscriptPlugin,
      FontColorPlugin,
      FontBackgroundColorPlugin,
      FontSizePlugin,
      HighlightPlugin,
      KbdPlugin,
      AlignPlugin.configure({
        inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },
      }),
      IndentPlugin.configure({
        inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },
      }),
      IndentListPlugin.configure({
        inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },
      }),
      LineHeightPlugin.configure({
        inject: {
          nodeProps: {
            defaultNodeValue: 1.5,
            validNodeValues: [1, 1.2, 1.5, 2, 3],
          },
          targetPlugins: ['p', 'h1', 'h2', 'h3'],
        },
      }),
      AutoformatPlugin.configure({
        options: {
          enableUndoOnDelete: true,
          rules: [
            // Usage: https://platejs.org/docs/autoformat
          ],
        },
      }),
      BlockSelectionPlugin,
      DndPlugin.configure({
        options: { enableScroller: true },
      }),
      EmojiPlugin,
      ExitBreakPlugin.configure({
        options: {
          rules: [
            {
              hotkey: 'mod+enter',
            },
            {
              before: true,
              hotkey: 'mod+shift+enter',
            },
            {
              hotkey: 'enter',
              level: 1,
              query: {
                allow: ['h1', 'h2', 'h3'],
                end: true,
                start: true,
              },
              relative: true,
            },
          ],
        },
      }),
      NodeIdPlugin,
      ResetNodePlugin.configure({
        options: {
          rules: [
            // Usage: https://platejs.org/docs/reset-node
          ],
        },
      }),
      DeletePlugin,
      SoftBreakPlugin.configure({
        options: {
          rules: [
            { hotkey: 'shift+enter' },
            {
              hotkey: 'enter',
              query: {
                allow: ['code_block', 'blockquote', 'td', 'th'],
              },
            },
          ],
        },
      }),
      TabbablePlugin,
      TrailingBlockPlugin.configure({
        options: { type: 'p' },
      }),
      CommentsPlugin,
      DocxPlugin,
      CsvPlugin,
      MarkdownPlugin,
      JuicePlugin,
    ],
    override: {
      components: withDraggables(
        withPlaceholders({
          [BlockquotePlugin.key]: BlockquoteElement,
          [CodeBlockPlugin.key]: CodeBlockElement,
          [CodeLinePlugin.key]: CodeLineElement,
          [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
          [ExcalidrawPlugin.key]: ExcalidrawElement,
          [HorizontalRulePlugin.key]: HrElement,
          [ImagePlugin.key]: ImageElement,
          [LinkPlugin.key]: LinkElement,
          [TogglePlugin.key]: ToggleElement,
          [ColumnPlugin.key]: ColumnGroupElement,
          [ColumnItemPlugin.key]: ColumnElement,
          [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
          [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
          [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
          [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
          [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
          [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
          [MediaEmbedPlugin.key]: MediaEmbedElement,
          [MentionPlugin.key]: MentionElement,
          [MentionInputPlugin.key]: MentionInputElement,
          [ParagraphPlugin.key]: ParagraphElement,
          [TablePlugin.key]: TableElement,
          [TableRowPlugin.key]: TableRowElement,
          [TableCellPlugin.key]: TableCellElement,
          [TableCellHeaderPlugin.key]: TableCellHeaderElement,
          [TodoListPlugin.key]: TodoListElement,
          [DatePlugin.key]: DateElement,
          [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
          [CodePlugin.key]: CodeLeaf,
          [CommentsPlugin.key]: CommentLeaf,
          [HighlightPlugin.key]: HighlightLeaf,
          [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
          [KbdPlugin.key]: KbdLeaf,
          [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
          [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
          [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
          [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
        })
      ),
    },
    value: content,
  });

export function PlateEditor({ content = [] }: { content?: Value }) {
  const editor = useMemo(() => createEditor(content), [content]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <Editor className="focus:outline-none border-none" />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
        <CommentsPopover />
      </Plate>
    </DndProvider>
  );
}
