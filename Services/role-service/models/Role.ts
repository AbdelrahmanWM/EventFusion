import mongoose, { Schema, Document, Model } from "mongoose";
import { Role } from "role-service/enums/role";
import { IRole } from "role-service/interfaces/IRole";

interface IRoleDocument extends IRole, Document {}

const RoleSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    roles: [{ type: String, enum: Object.values(Role) }],
  },
  { timestamps: true }
);
RoleSchema.index({ user: 1, event: 1 });

const Roles: Model<IRoleDocument> = mongoose.model<IRoleDocument>(
  "Role",
  RoleSchema
);
export default Roles;
