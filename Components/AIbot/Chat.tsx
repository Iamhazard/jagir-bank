import React ,{FC} from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

const Chat:FC = () => {
  return (
    <Accordion
      type='single'
      collapsible
      className='relative bg-white z-40 shadow'>
      <AccordionItem value='item-1'>
        <div className=' w-80  bg-white border border-gray-200 rounded-md overflow-hidden'>
          <div className='w-full h-full flex flex-col'>
            <AccordionTrigger className='px-6 border-b border-zinc-300'>
              <ChatHeader />
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col h-80'>
               <ChatMessages className="px-2 py-3 flex-1"/>
              <ChatInput className="px-4"  />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default Chat