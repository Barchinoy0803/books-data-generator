import { memo } from 'react'
import { Book } from '../../types'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

interface GalleryProps {
    books: Book[]
}
const Gallery = ({ books }: GalleryProps) => {
    return (
        <div className='grid grid-cols-4 gap-4 mt-[20px]'>
            {
                books.map(({ title, image, publisher, likes, isbn, id }) => (
                    <div data-id={id} className='w-[350px] h-[450px] rounded-[5px]  overflow-hidden shadow-md shadow-gray-300'>
                        <p className='p-3 bg-gray-100 text-[18px] font-sans text-nowrap'>{title}</p>
                        <img className='w-full h-[300px]' src={image} alt="" />
                        <div className='flex flex-col  gap-1 p-2'>
                            <div className='flex items-center gap-2 text-[18px]'>
                                <AutoStoriesIcon className='text-[18px] text-green-600' />
                                <p>{publisher}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <ThumbUpIcon className='text-blue-600' />
                                <strong>{likes}</strong>
                            </div>
                            <span>ISBN: {isbn}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default memo(Gallery)