import { TUser } from "@/app/(withCommonLayout)/users/page";
import Link from "next/link";
import ToggleButton from "../ToggleButton";

export default function UserTable({ users }: { users: TUser[] }) {
  return (
    <div className="my-10 mx-45 w-full">
      <div className=" mb-4">
        <Link href="/register">
          <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg">
            + Add new user
          </button>
        </Link>
      </div>

      {/* ✅ Desktop & Tablet View: Full Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-left">USER</th>
              <th className="p-3 text-left">EMAIL</th>
              <th className="p-3 text-left">USER ROLE</th>
              {/* <th className="p-3 text-left">STATUS</th> */}
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className=" even:bg-blue-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-lg ${
                      user.role === "super-admin"
                        ? "bg-blue-500 text-white"
                        : user.role === "operator"
                        ? "bg-purple-500 text-white"
                        : "bg-orange-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                {/* <td
                  className={`p-3 ${
                    user?.isActive === true ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user?.isActive === true ? <>Active</> : <>Disabled</>}
                </td> */}
                <td className="p-3">
                  <ToggleButton status={user?.isActive} id={{ id: user?.id }} />
                </td>
                <td className="p-3 flex space-x-2">
                  <Link href={`/users/edit/${user?.id}`}>
                    <button className="cursor-pointer hover:text-blue-500">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
