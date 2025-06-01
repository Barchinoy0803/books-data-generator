import { memo, useEffect, useMemo, useState } from 'react'
import RegionSelect from '../../components/Select'
import NumberInput from '../../components/NumberInput';
import LikeSlider from '../../components/Slider';
import { Book } from '../../types';
import { generateFakeBook, getLocale } from '../../helpers';
import { regionOptions } from '../../constants';
import { Faker } from '@faker-js/faker';
import { IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVLink } from 'react-csv';
import { useVisibleBooks } from '../../hooks';
import BookTabs from '../../components/Tabs';

const Home = () => {
    const [regionName, setRegionName] = useState<string>(regionOptions[0]);
    const [seed, setSeed] = useState<number>(0)
    const [likes, setLikes] = useState<number>(0)
    const [reviewCount, setReviewCount] = useState<number>(0)
    const [books, setBooks] = useState<Book[]>([])
    const [booksCount, setBooksCount] = useState<number>(20)
    const [maxScroll, setMaxScroll] = useState<number>(0)

    const visibleIds = useVisibleBooks(books.map((book) => book.id!))

    const csvData = useMemo(() => {
        const visibleBooks = books.filter((book) => visibleIds.has(book.id!))

        return visibleBooks.map((book) => ({
            id: book.id,
            ISBN: book.isbn,
            Title: book.title,
            Author: Array.isArray(book.authors) ? book.authors.join(", ") : book.authors,
            Publisher: book.publisher,
            Likes: book.likes,
            Reviews: book.reviews?.map(r => `${r.owner}: "${r.content}" (${r.rating}★)`).join(" | ")
        }));

    }, [maxScroll, books, visibleIds])


    const faker = useMemo(() => {
        return new Faker({ locale: getLocale(regionName), seed })
    }, [regionName, seed])

    const handleAddData = () => {
        setBooks([...books, ...Array.from({ length: 20 }, () => generateFakeBook(faker, likes, reviewCount))])
    }

    useEffect(() => {
        handleAddData()
    }, [booksCount])


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setMaxScroll(window.scrollY)
                setBooksCount((p) => p + 20)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [maxScroll])


    useEffect(() => {
        setBooks(Array.from({ length: 20 }, () => generateFakeBook(faker, likes, reviewCount)))
    }, [regionName, seed, likes, reviewCount])

    return (
        <>
            <div className='bg-gray-100 mb-[30px]'>
                <div className='container mx-auto flex justify-between items-center py-6'>
                    <RegionSelect regionName={regionName} setRegionName={setRegionName} />
                    <NumberInput value={seed} setValue={setSeed} label='Seed' />
                    <NumberInput value={reviewCount} setValue={setReviewCount} label='Review' />
                    <LikeSlider value={likes} setValue={setLikes} />
                </div>
            </div>
            <div className='container mx-auto'>
                <div className='flex justify-end my-[20px]  fixed bottom-[60px] right-[50px]'>
                    <Tooltip placement='top' title={'Download CSV data'}>
                        <span><CSVLink className='bg-blue-500 rounded-[100px] w-[50px] h-[50px] flex items-center justify-center text-[25px]' data={csvData} filename='books.csv'><IconButton><DownloadIcon className='text-white' /></IconButton></CSVLink></span>
                    </Tooltip>
                </div>
                <div className='container mx-auto'>
                    <BookTabs books={books}/>
                </div>
            </div>
        </>
    )
}

export default memo(Home)