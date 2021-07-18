// api function
import { Request, Response } from 'express';

import TodoModel from '../../models/todo';
import { Todo } from '../../types/todo';

// get all todos from db
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  const todos: Todo[] = await TodoModel.find();

  res.status(200).json({
    todos
  });
};

// get a todo by id
export const getTodo = async (req: Request, res: Response): Promise<void> => {
  await TodoModel.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    } else {
      res.status(200).json({
        result
      });
    }
  });
};

// add a todo to db
export const addTodo = async (req: Request, res: Response): Promise<void> => {
  const body: Pick<Todo, 'title' | 'status'> = req.body;

  // request body check, continue to post data if its a complete data
  if (!body.title || !body.status) {
    res.status(401).json({
      status: 401,
      errorMessage: `ValidationError: Todo validation failed: title: ${body.title}, status ${body.status}`
    });

    return;
  }

  const newTodoModel = new TodoModel({
    title: body.title,
    status: body.status
  });

  const newTodo = await newTodoModel.save();
  const updatedAllTodosAfterSave = await TodoModel.find();

  // if post data complete, return message, new added data, and all data after post
  res.status(201).json({
    message: 'Todo successfully added!',
    addedTodo: newTodo,
    allTodosAfterAddition: updatedAllTodosAfterSave
  });
};

// updete a todo by id
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id },
    body
  } = req;

  // request body check
  if (!body.title || !body.status || !id) {
    res.status(401).json({
      status: 401,
      errorMessage:
        'ValidationError: _id or required body properties is not defined.'
    });

    return;
  }

  const updatedTodo = await TodoModel.findByIdAndUpdate(
    {
      _id: id
    },
    body
  );
  const updatedAlltodosAfterUpdate = await TodoModel.find();

  if (!updatedTodo) {
    res.status(501).json({
      status: 501,
      errorMessage: 'Edit todo failed. Not implemented'
    });

    return;
  }

  res.status(200).json({
    message: 'Todo successfully edited',
    updatedTodo,
    todos: updatedAlltodosAfterUpdate
  });
};

// remove a todo by id
export const removeTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id }
  } = req;

  if (!id) {
    res.status(401).json({
      status: 41,
      errorMessage: `ValidationError: Params _id is not defined.`
    });

    return;
  }

  const removedTodo = await TodoModel.findByIdAndRemove(id);
  const updatedAllTodosAfterRemove = await TodoModel.find();

  if (!removedTodo) {
    res.status(501).json({
      status: 501,
      errorMessage: 'Remove todo failed. Not implemented'
    });

    return;
  }

  res.status(200).json({
    message: 'Todo successfully removed',
    removedTodo,
    todos: updatedAllTodosAfterRemove
  });
};
