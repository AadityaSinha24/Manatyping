import { studentRepository } from "./student.repository";
import bcrypt from "bcryptjs";
import { ExpressError } from "../../utils/ExpressError";
import { StudentLoginInput, StudentSignupInput } from "./student.validation";
import { IStudent } from "./student.model";

export const studentService = {
  createUser: async (studentData: StudentSignupInput): Promise<IStudent> => {
    const hashedPassword: string = await bcrypt.hash(studentData.password, 10);
    const user: IStudent = await studentRepository.create({
      ...studentData,
      password: hashedPassword,
    });
    return user;
  },

  loginCheck: async (studentData: StudentLoginInput): Promise<IStudent> => {
    const findStudent: IStudent | null = await studentRepository.findByEmail(
      studentData.email
    );
    if (!findStudent) throw new ExpressError(404, "User Not Found");

    const compare: boolean = await bcrypt.compare(
      studentData.password,
      findStudent.password
    );
    if (!compare) throw new ExpressError(500, "Wrong Password");
    return findStudent;
  },
};
