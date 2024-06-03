// student.service.ts

import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {

    if (await Student.isUserExists(studentData.id)) {
        throw new Error('User already exists!');
    }
    const result = await Student.create(studentData);
    return result;
};

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({ _id: id });
    return result;
};

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
};