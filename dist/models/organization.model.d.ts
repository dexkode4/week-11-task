import mongoose from "mongoose";
export declare const organizationSchema: mongoose.Schema<any>;
declare const Organization: mongoose.Model<auth, {}>;
interface auth extends mongoose.Document {
    organization: string;
    id: number;
}
export default Organization;
