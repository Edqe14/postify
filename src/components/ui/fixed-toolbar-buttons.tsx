import React, { useState } from 'react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { useEditorReadOnly, useEditorRef } from '@udecode/plate-common/react';

import { Icons } from '@/components/icons';
import { AlignDropdownMenu } from '@/components/ui/align-dropdown-menu';
import { EmojiDropdownMenu } from '@/components/ui/emoji-dropdown-menu';
import { LineHeightDropdownMenu } from '@/components/ui/line-height-dropdown-menu';
import { LinkToolbarButton } from '@/components/ui/link-toolbar-button';
import { TableDropdownMenu } from '@/components/ui/table-dropdown-menu';

import { InsertDropdownMenu } from './insert-dropdown-menu';
import { MarkToolbarButton } from './mark-toolbar-button';
import { ModeDropdownMenu } from './mode-dropdown-menu';
import { ToolbarButton, ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { ImagePlugin } from '@udecode/plate-media';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import ImageUpload from './image-upload';
import { Transforms } from 'slate';

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();
  const editor = useEditorRef();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: 'translateX(calc(-1px))',
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={ItalicPlugin.key}
                tooltip="Italic (⌘+I)"
              >
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={UnderlinePlugin.key}
                tooltip="Underline (⌘+U)"
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                nodeType={StrikethroughPlugin.key}
                tooltip="Strikethrough (⌘+⇧+M)"
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
                <Icons.code />
              </MarkToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />

              <TableDropdownMenu />

              <EmojiDropdownMenu />

              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger>
                  <ToolbarButton>
                    <Icons.image />
                  </ToolbarButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload image</DialogTitle>
                  </DialogHeader>

                  <ImageUpload
                    onUploadComplete={(url) => {
                      editor.insertNode({
                        type: ImagePlugin.key,
                        url,
                        children: [{ text: '' }],
                      });

                      setModalOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}
