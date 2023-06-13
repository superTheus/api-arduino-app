import { Request, Response, json } from 'express';
const UsersModel: ModelsUser = require('../models/usersModel');
interface ModelsUser {
  getAllUsers: () => {},
  insertUser: (user: User) => Result,
  getUserById: (id: number) => {},
  getUserByToken: (token: string) => {},
  updateUserById: (user: User) => {},
  deleteUserById: (id: number) => {},
}

interface User {
  user: string;
  name: string;
  password: string;
  token: string;
}

export interface Result {
  status: string;
  error: boolean;
  message: string;
  data: any,
}

const getAllUsersController = async (_req: Request, res: Response) => {
  const result = await UsersModel.getAllUsers();
  res.status(200).json(result);
}

const getUsersByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UsersModel.getUserById(parseInt(id));
  res.status(200).json(result);
}

const getUsersByTokenController = async (req: Request, res: Response) => {
  const { token } = req.params;
  const result = await UsersModel.getUserByToken(token);
  res.status(200).json(result);
}

const insertUsersController = async (req: Request, res: Response) => {
  const user: User = req.body
  const result: Result = await UsersModel.insertUser(user);
  if (result.error) {
    res.status(500).json(result.message);
  } else {
    res.status(200).json(result.message);
  }
}

const updateUserByIdController = async (req: Request, res: Response) => {
  const user: User = req.body
  const result = await UsersModel.updateUserById(user);
  res.status(200).json(result);
}

const deleteUserByController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UsersModel.deleteUserById(parseInt(id));
  res.status(200).json(result);
}

module.exports = {
  getAllUsersController,
  insertUsersController,
  getUsersByIdController,
  getUsersByTokenController,
  updateUserByIdController,
  deleteUserByController
}