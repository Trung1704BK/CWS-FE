import { RoleLabel } from "@/components/common";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "./types";

export const enum UserRole {
  USER = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3,
}

const getRolePresentation = (role: UserRole) => {
  let roleText;
  let roleBg;
  let roleTextColor;

  switch (role) {
    case UserRole.USER:
      roleText = "User";
      roleBg = "bg-gray-200";
      roleTextColor = "text-gray-700";
      break;
    case UserRole.ADMIN:
      roleText = "Admin";
      roleBg = "bg-yellow-200";
      roleTextColor = "text-yellow-700";
      break;
    case UserRole.SUPER_ADMIN:
      roleText = "Super Admin";
      roleBg = "bg-red-200";
      roleTextColor = "text-red-700";
      break;
    default:
      roleText = "Unknown";
      roleBg = "bg-gray-200";
      roleTextColor = "text-gray-700";
  }

  return {
    text: roleText,
    bg: roleBg,
    textColor: roleTextColor,
  };
};

export const userColumnDef: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: () => "Email",
    footer: (props) => props.column.id,
  },
  {
    accessorKey: "name",
    header: () => <span>Name</span>,
    footer: (props) => props.column.id,
    cell: (props) => (
      <div className="flex items-center space-x-2">
        <img
          src={props.row.original.avatar_path}
          className="h-8 w-8 rounded-full"
          alt="avatar"
        />
        <span className="font-semibold">{props.row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: () => <span>Role</span>,
    footer: (props) => props.column.id,
    cell: (props) => {
      const role = props.row.original.role;
      const rolePresentation = getRolePresentation(role);

      return (
        <RoleLabel
          label={rolePresentation.text}
          bg={rolePresentation.bg}
          color={rolePresentation.textColor}
        />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <span>Created At</span>,
    footer: (props) => props.column.id,
    cell: (props) => {
      return (
        <span>
          {new Date(props.row.original.created_at).toLocaleTimeString()} -{" "}
          {new Date(props.row.original.created_at).toLocaleDateString()}
        </span>
      );
    },
  },
];
