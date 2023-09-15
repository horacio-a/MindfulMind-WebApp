import axios from "axios"
import { useEffect, useState } from "react"
import { GrAddCircle } from 'react-icons/gr';
import { RxCheck, RxCross2, RxCheckbox, RxBox, RxTrash } from "react-icons/rx";
import ReactDragList from 'react-drag-list'
import { Lato } from 'next/font/google'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Skeleton from '@mui/material/Skeleton';


const latoRegular = Lato({
    weight: '400',
    subsets: ['latin'],
})
const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})


export default function Text({ sidebar, TextData, setTextData, loading, setloading }) {


    return (
        <div className={`TextConteiner ${sidebar ? 'Active' : 'Desactive'}`}>
            text
        </div>
    )
}