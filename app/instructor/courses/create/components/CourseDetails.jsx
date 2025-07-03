"use client"
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Toggle } from '@/components/ui/toggle'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'

function CourseDetails() {
  const [mounted, setMounted] = useState(false)
  const [editorInitialized, setEditorInitialized] = useState(false)

  // Initialize editor with error handling
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Enter your course description here...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      // Handle content updates
    },
    onCreate: () => {
      setEditorInitialized(true)
    },
    onDestroy: () => {
      setEditorInitialized(false)
    },
  })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted || !editorInitialized) {
    return (
      <div className="p-6">
        <div className="text-xl font-bold">Course Details</div>
        <hr className="h-[1.5px] border w-full my-6" />
        <div className="space-y-6">
          {/* Show loading state or skeleton */}
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='p-6'>
      <div className="text-xl font-bold">
        Course Details
      </div>
      <hr className='h-[1.5px] border w-full my-6' />
      <div className='space-y-6'>
        <div className='flex flex-col gap-2'>
          <label htmlFor="title" className='text-sm text-gray-600'>Course title</label>
          <Input name='title' className='py-5' placeholder='Enter course title' />
        </div>
        
        <div className='flex flex-col gap-2'>
          <label htmlFor="description" className='text-sm text-gray-600'>Description</label>
          
          {/* Rich Text Editor Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 border rounded-t-lg bg-gray-50">
            <Toggle
              size="sm"
              pressed={editor.isActive('bold')}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor}
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            
            <Toggle
              size="sm"
              pressed={editor.isActive('italic')}
              onPressedChange={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor}
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            
            <Toggle
              size="sm"
              pressed={editor.isActive('underline')}
              onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor}
            >
              <Underline className="h-4 w-4" />
            </Toggle>
            
            <Toggle
              size="sm"
              pressed={editor.isActive('bulletList')}
              onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
              disabled={!editor}
            >
              <List className="h-4 w-4" />
            </Toggle>
            
            <Toggle
              size="sm"
              pressed={editor.isActive('orderedList')}
              onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
              disabled={!editor}
            >
              <ListOrdered className="h-4 w-4" />
            </Toggle>
            
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: 'left' })}
              onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
              disabled={!editor}
            >
              <AlignLeft className="h-4 w-4" />
            </Toggle>
            
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: 'center' })}
              onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
              disabled={!editor}
            >
              <AlignCenter className="h-4 w-4" />
            </Toggle>
            
            <Toggle
              size="sm"
              pressed={editor.isActive({ textAlign: 'right' })}
              onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
              disabled={!editor}
            >
              <AlignRight className="h-4 w-4" />
            </Toggle>
            
            <input
              type="color"
              onInput={event => editor.chain().focus().setColor(event.target.value).run()}
              value={editor?.getAttributes('textStyle').color || '#000000'}
              className="w-8 h-8"
              disabled={!editor}
            />
          </div>
          
          {/* Editor Content */}
          <div className="border border-red-400 rounded-b-lg p-4">
            {editor && <EditorContent editor={editor} />}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className='flex flex-col gap-2'>
            <label htmlFor="categories" className='text-sm text-gray-600'>Course Categories</label>
            <Select>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="music">Music</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className='flex flex-col gap-2'>
            <label htmlFor="level" className='text-sm text-gray-600'>Course Level</label>
            <Select>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails