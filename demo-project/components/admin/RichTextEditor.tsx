'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Undo,
    Redo,
    ImageIcon,
    Link2,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false, // Fix SSR hydration error
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Start writing your blog content...',
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL:');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const addLink = useCallback(() => {
        const url = window.prompt('Enter URL:');
        if (url && editor) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-gray-200' : ''}
                >
                    <Bold className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-gray-200' : ''}
                >
                    <Italic className="w-4 h-4" />
                </Button>
                <div className="w-px h-8 bg-gray-300 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
                >
                    <Heading1 className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
                >
                    <Heading2 className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
                >
                    <Heading3 className="w-4 h-4" />
                </Button>
                <div className="w-px h-8 bg-gray-300 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
                >
                    <List className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
                >
                    <ListOrdered className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
                >
                    <Quote className="w-4 h-4" />
                </Button>
                <div className="w-px h-8 bg-gray-300 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addImage}
                >
                    <ImageIcon className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addLink}
                >
                    <Link2 className="w-4 h-4" />
                </Button>
                <div className="w-px h-8 bg-gray-300 mx-1" />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo className="w-4 h-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo className="w-4 h-4" />
                </Button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
}
