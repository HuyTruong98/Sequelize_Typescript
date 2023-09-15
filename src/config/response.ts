import { Response } from 'express';

// 200
export const successCode = (res: Response, data: any, message: string) => {
  res.status(200).json({
    message,
    content: data,
  });
};

// 201
const createCode = (res: Response, data: any, message: string) => {
  res.status(201).json({
    message,
    content: data,
  });
};

// 400
const failCode = (res: Response, data: any, message: string) => {
  res.status(400).json({
    message,
    content: data,
  });
};

//404
const notFoundCode = (res: Response, message: string) => {
  res.status(404).json({
    message,
  });
};

// 500
export const errorCode = (res: Response, message: string) => {
  res.status(500).json({
    message,
  });
};

module.exports = {
  successCode,
  failCode,
  errorCode,
  createCode,
  notFoundCode,
};
