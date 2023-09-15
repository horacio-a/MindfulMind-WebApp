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


export default function Routine({ sidebar, routineData, setroutineData, loading, setloading }) {
    const [inputAdd, setinputAdd] = useState(false)
    const [OrderArray, setOrderArray] = useState([])
    const [Input, setInput] = useState('');
    const [errorMsg, seterrorMsg] = useState('');

    const handleChange = (event) => {
        setInput(event.target.value);
    };






    async function handleOnDragEnd(result) {
        if (!result.destination) return
        const item = Array.from(routineData.data)
        const [reorderedItem] = item.splice(result.source.index, 1);
        item.splice(result.destination.index, 0, reorderedItem);
        setroutineData({ data: item, porcentaje: routineData.porcentaje })
        const obj = { info: { user: 'Horacio' }, data: [] }
        for (let i = 0; i < item.length; i++) {
            const element = item[i];
            obj.data.push({ id: element.id, NewOrden: i + 1 })
        }
        const response = await axios.post(`https://api.mindfulmind.com.ar/Routine/ReOrder`, { obj }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })


    }

    const Completed = async (task) => {
        const obj = task
        const response = await axios.post(`https://api.mindfulmind.com.ar/Routine/completeTask`, { obj }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setroutineData(response.data)
    }

    const deleteTasks = async (DataForDelete) => {
        const response = await axios.delete(`https://api.mindfulmind.com.ar/Routine/DeleteTasks`, { data: DataForDelete })
        setroutineData(response.data)
    }

    async function CreateTasksRoutine() {
        if (Input === '') {
            seterrorMsg('Completa el campo para crear una tarea')
            setTimeout(() => {
                seterrorMsg('')
            }, 2500);
        } else {
            setInput('')
            setinputAdd(false)
            const response = await axios.post(`https://api.mindfulmind.com.ar/Routine/newtask`, {
                "user": 'Horacio',
                "title": Input
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const ordenCopy = OrderArray
            ordenCopy.push(response.data)
            setOrderArray(ordenCopy)

            const copy = routineData
            copy.data.push(response.data)
            setroutineData(copy)
        }
    }

    return (
        <div className={`RoutineConteiner ${sidebar ? 'Active' : 'Desactive'}`}>
            <div className="conteinerData">
                <div className="conteinerAddTask">
                    {
                        !loading
                            ? <>
                                {inputAdd
                                    ? <div className="conteinerInputadd">
                                        <input className={`inputAdd  ${latoRegular.className}`} placeholder="Nueva tarea" onChange={handleChange} />
                                        <div className="conteinericonInputAdd">
                                            <RxCheck onClick={() => { CreateTasksRoutine() }} color='#fff' size={24} className="iconInputadd" />
                                        </div>
                                        <div className="conteinericonInputAdd">
                                            <RxCross2 onClick={() => { setinputAdd(false) }} color='#fff' size={24} className="iconInputadd" />
                                        </div>
                                        {errorMsg}
                                    </div>
                                    : <div onClick={() => { setinputAdd(true) }} className={`btnAddTasks ${lato.className}`}>
                                        <GrAddCircle color='#1e1e1e' size={18} className="iconAdd" />
                                        Agregar tarea
                                    </div>}
                            </>
                            : <Skeleton
                                style={{
                                    background: '#5f6368', width: '85%', height: '40%',
                                }}
                                variant="rounded" />
                    }
                </div>
                {
                    !loading
                        ?
                        <div className="conteinerDragble">
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId="routineTasks">
                                    {(provided) => (
                                        <ul className="simple-drag" {...provided.droppableProps} ref={provided.innerRef}>
                                            {routineData.data.map(({ id, user, tasksName, completed, updateDate, Orden }, index) => {
                                                return (
                                                    <Draggable key={id} draggableId={id.toString()} index={index}>
                                                        {(provided) => (
                                                            <il {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className=" simple-drag-row"  >
                                                                {
                                                                    completed === 0
                                                                        ? <>
                                                                            <RxBox onClick={() => { Completed({ id, user, tasksName, completed }) }} color="#fff" size={22} className="iconDraglist" />

                                                                        </>
                                                                        : <>
                                                                            <RxCheckbox onClick={() => { Completed({ id, user, tasksName, completed }) }} color="#fff" size={22} className="iconDraglist" />
                                                                        </>
                                                                }
                                                                <div className="Dragbletitle">{tasksName}</div>
                                                                <RxTrash onClick={() => { deleteTasks({ user, id }) }} color="#fff" size={22} className="iconDraglist" />

                                                            </il>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </ul>)}

                                </Droppable>

                            </DragDropContext>

                        </div>
                        :
                        <div className="conteinerDragble" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                            <Skeleton
                                style={{ background: '#5f6368', width: '85%', marginTop: '10px' }}
                                variant="rounded" height={50} />
                        </div>
                }
            </div>
            <div className="RoutineRightSide">
                <div className="conteinerPorcentaje">
                    {
                        !loading
                            ? <>
                                <div className="TitlePorcentaje">
                                    El porcentaje de tu rutina
                                </div>
                                <div className="ConteinerNumber" style={{
                                    backgroundColor: `${parseInt(routineData.porcentaje) < 35 ? '#fff' : (parseInt(routineData.porcentaje) < 85 ? '#FFA500' : '#01A601')}`,
                                    color: `${parseInt(routineData.porcentaje) < 35 ? '#1E1E1E' : '#fff'}`
                                }}>
                                    {routineData.porcentaje}
                                </div>
                            </>
                            : <>
                                <div className="TitlePorcentaje">
                                    <Skeleton
                                        sx={{ fontSize: '3rem' }}
                                        style={{ background: '#5f6368', width: '85%' }}
                                        variant="text"
                                    />
                                </div>
                                <Skeleton
                                    style={{ background: '#5f6368', width: '65%', height: '50%', marginTop: '7.5%' }}
                                    variant="rounded" />
                            </>
                    }
                </div>
                <div className="conteinerPorcentaje">
                </div>
            </div>
        </div>
    )
}