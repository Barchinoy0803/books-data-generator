import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Book } from '../../types';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface RowProps {
  row: Book;
  index: number;
}

function Row({ row, index }: RowProps) {
  const { title, authors, isbn, publisher, likes, image, reviews } = row;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} data-id={row.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width={60} component="th" scope="row">
          {index}
        </TableCell>
        <TableCell width={400}>{title}</TableCell>
        <TableCell >{authors}</TableCell>
        <TableCell>{publisher}</TableCell>
        <TableCell>{isbn}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className='flex gap-6 my-4'>
              <div className='flex flex-col gap-3'>
                <img className='w-[250px] h-[250px] object-cover rounded-[6px]' src={image} alt="" />
                <div className='flex items-center text-[18px] p-1.5 gap-1 rounded-[10px] bg-blue-600 text-white w-[max-content]'>
                  <span>{likes} </span>
                  <ThumbUpIcon />
                </div>
              </div>
              <div className='flex flex-col gap-3 h-[300px] overflow-y-auto overflow-x-hidden content px-1'>
                <h1 className='text-[18px] font-sans font-bold'>Reviews</h1>
                {
                  reviews.map(({ owner, content, date, rating }, inx) => (
                    <div key={inx} className='w-[1070px] flex flex-col gap-1 p-1'>
                      <div className='flex flex-col gap-2'>
                        <p className='text-[20px] font-bold font-sans'>{owner}</p>
                        <Typography>{content}</Typography>
                      </div>
                      <div className='flex justify-between'>
                        <div className='flex items-center gap-1.5'>
                          <StarIcon className='text-yellow-400 text-4xl' />
                          <p className='text-2xl'>{rating}</p>
                        </div>
                        <strong className='text-[18px]'>{date}</strong>
                      </div>
                    </div>
                  ))
                }
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface TableProps {
  data: Book[]
}

export const BooksTable = ({ data }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Index</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author(s)</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>ISBN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <Row key={index} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
