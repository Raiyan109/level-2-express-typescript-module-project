// student.service.ts

import { Student, TStudentModel } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
    const student = new Student(studentData)
    if (await student.isUserExists(studentData.id)) {
        throw new Error('User already exists!');
    }
    const result = await TStudentModel.create(studentData);
    return result;
};

const getAllStudentsFromDB = async () => {
    const result = await TStudentModel.find();
    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await TStudentModel.findOne({ _id: id });
    return result;
};

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
};