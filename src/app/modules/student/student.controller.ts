// student.controller.ts

import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
    try {
        // const { student: studentData } = req.body;
        // console.log(studentData);
        const zodParsedData = studentValidationSchema.parse(req.body);
        const result = await StudentServices.createStudentIntoDB(zodParsedData);

        res.status(200).json({
            success: true,
            message: 'Student is created succesfully',
            data: result,
        });
    } catch (err: any) {
        // console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err?.message,
        });
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: 'Students are retrieved succesfully',
            data: result,
        });
    } catch (err) {
        console.log(err);
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        const result = await StudentServices.getSingleStudentFromDB(studentId);


        res.status(200).json({
            success: true,
            message: 'Student is retrieved succesfully',
            data: result,
        });
    } catch (err) {
        console.log(err);
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};