import { redisdb } from '@/lib/redisdb'
import React from 'react'

const Message = async () => {
    await redisdb.set('hello', 'hello')
    return (
        <div><h1>hello</h1></div>
    )
}

export default Message