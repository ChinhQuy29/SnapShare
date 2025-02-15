import React, {useEffect, useState} from 'react'
import SingleCard from './SingleCard.jsx'
import LoadingCard from './LoadingCard.jsx'

const PostsCard = ({ posts }) => {

  return (
    <div className='cards-container' style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1rem',
      padding: '1rem'
    }}>
      { posts.map((item) => (
        <SingleCard key={item._id} post={item}/>
      ))}
    </div>
  )
}

export default PostsCard