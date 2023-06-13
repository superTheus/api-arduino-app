import { Request, Response, json } from 'express';

interface User {
  user: string;
  name: string;
  password: string;
  token: string;
}

const validDataUser = async (req: Request, res: Response, next: any) => {
  var values: User = req.body;
  var error = false;
  var msg = [];

  if (!values.user || values.user === "") {
    error = true;
    msg.push("User can't be empty");
  }

  if (!values.password || values.password === "") {
    error = true;
    msg.push("Password can't be empty");
  }

  if (!values.name || values.name === "") {
    error = true;
    msg.push("Name can't be empty");
  }

  if (!values.token || values.token === "") {
    error = true;
    msg.push("Token can't be empty");
  }

  if (error) {
    return res.status(400).json({
      errors: msg
    });
  }

  next();
}

module.exports = {
  validDataUser,
}