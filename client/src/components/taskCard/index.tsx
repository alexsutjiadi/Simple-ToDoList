import React, {useState} from "react";
import classNames from "classnames";
import { useMutation, useQueryCache } from "react-query";

import { updateTodo } from "api/updateTodo";
import { deleteTodo } from "api/deleteTodo";

import DeleteModal from 'components/deleteModal';

import CheckListIcon from "assets/svg/checklist";
import TrashIcon from "assets/svg/trash";
import ClockIcon from "assets/svg/clock";

type Props = {
    taskId: string,
    title: string,
    status: 'completed' | 'uncompleted'
}
const TaskCard: React.FC<Props> = ({ title, taskId, status }) => {

    const cache =useQueryCache()
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // mutation function
    const [checkTodo, { isLoading }] = useMutation(updateTodo, {
        onSuccess: () => {
            cache.invalidateQueries('todos')
        }
    })

    const [removeTodo] = useMutation(deleteTodo, {
        onSuccess: () => {
            cache.invalidateQueries('todos')
        }
    })

    const handleRemoveTodo = (type: 'delete' | 'cancel') => {
        if (type === 'delete') {
            removeTodo(taskId)
        }
        setShowDeleteModal(false)
    }
    ////
    const containerClass = classNames("flex justify-center items-center relative rounded shadow-lg p-4 mb-2", {
        'bg-white text-blue-900': status === 'uncompleted',
        'bg-gray-300 bg-opacity-50': status === 'completed'
    })

    const titleClass = classNames("flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate", {
        'line-through': status === 'completed'
    })

    const checklistClass = classNames("w-5 h-5 ml-4", {
        'text-green-600': status === 'uncompleted',
        'text-green-400': status === 'completed'
    })

    return (
        <div className={containerClass}>
            <p className={titleClass}>
                {title}
            </p>

            <div className="flex text-blue-900">
                <span>
                    {isLoading ? (
                        <ClockIcon/>
                    ): (
                        <CheckListIcon className={checklistClass} onClick={() => checkTodo(taskId)}/>
                    )}
                </span>
                <span className="w-5 h-5 ml-4 text-red-600">
                    <TrashIcon onClick={() => setShowDeleteModal(true)}/>
                </span>
            </div>

            <DeleteModal
                inProp={showDeleteModal}
                taskStatus={status}
                onDelete={() => handleRemoveTodo('delete')}
                onCancel={() => handleRemoveTodo('cancel')}
            />
        </div>
        
    )
}

export default TaskCard