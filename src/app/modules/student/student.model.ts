// TStudent.model.ts
import { Schema, model } from 'mongoose';
import {
    StudentModel,
    TGuardian,
    TLocalGuardian,
    TStudent,
    TUserName,
} from './student.interface';
import bcrypt from 'bcrypt'
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        maxLength: [10, 'First name cannot be more than 10 characters'],
        trim: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, required: true, unique: true },
    name: {
        type: userNameSchema,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxLength: [20, 'Password can not be more than 20 characters'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not valid'
        },
        required: true
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        type: guardianSchema,
        required: true
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'blocked']
    },
});

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingUser = await Student.findOne({ id });

//     return existingUser;
// };


//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
};

// pre save middleware/ hook : will work on create()  save()

studentSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook : we will save  data');
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});



export const Student = model<TStudent, StudentModel>('Student', studentSchema);

