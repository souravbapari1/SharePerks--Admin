"use client";
import TitleCard from "@/components/cards/TitleCard";
import Checkbox from "@/components/Inputs/CheckBox";
import { UserProfileInfo } from "@/interface/user";
import { AdminAuthToken, client } from "@/lib/request/actions";
import { toast } from "material-react-toastify";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

function SelectUsersList({
  users,
  setUsers,
}: {
  users: UserProfileInfo[];
  setUsers: (e: UserProfileInfo[]) => void;
}) {
  const [search, setSearch] = useState("");

  const searchMutate = useMutation({
    mutationFn: async (search: string) => {
      return await client
        .get("api/v1/user/search/" + search)
        .send<UserProfileInfo[]>(AdminAuthToken());
    },
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error("Error: " + error);
      console.log(error);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (search.length > 0) {
        searchMutate.mutate(search);
      }
    }, 500);
  }, [search]);

  return (
    <div className="">
      <TitleCard
        title="Select Users"
        action={
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Users"
            className="px-5 py-2 rounded-md  bg-gray"
          />
        }
      >
        <div className="p-4 flex flex-col gap-3">
          {users.length === 0 && search.length == 0 && (
            <p className="text-xl text-center py-20 capitalize">
              Send Notification to All Users
            </p>
          )}
          {search.length == 0
            ? users?.map((user, index) => (
                <UserItem
                  key={index}
                  user={user}
                  isChecked={users?.find((e) => e._id == user._id) != undefined}
                  onChecked={(e) => {
                    if (users?.find((e) => e._id == user._id) != undefined) {
                      users.splice(
                        users.findIndex((e) => e._id == user._id),
                        1
                      );
                    } else {
                      users.push(e);
                    }
                    setUsers([...users]);
                  }}
                />
              ))
            : searchMutate?.data?.map((user, index) => (
                <UserItem
                  key={index}
                  user={user}
                  isChecked={users?.find((e) => e._id == user._id) != undefined}
                  onChecked={(e) => {
                    if (users?.find((e) => e._id == user._id) != undefined) {
                      users.splice(
                        users.findIndex((e) => e._id == user._id),
                        1
                      );
                    } else {
                      users.push(e);
                    }
                    setUsers([...users]);
                  }}
                />
              ))}
        </div>
      </TitleCard>
    </div>
  );
}

export default SelectUsersList;

const UserItem = ({
  user,
  isChecked,
  onChecked,
}: {
  user: UserProfileInfo;
  isChecked: boolean;
  onChecked: (e: UserProfileInfo) => void;
}) => {
  return (
    <div className="flex justify-between items-center ">
      <div className="flex flex-row gap-2  items-center">
        <Image
          alt=""
          width={800}
          height={800}
          src={client.baseUrl + "/" + user.image}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-sm">{user.name}</p>
          <p className="text-xs">{user.email}</p>
        </div>
      </div>
      <div className="w-10 flex justify-center  items-center">
        <Checkbox
          isChecked={isChecked}
          onClick={() => {
            onChecked(user);
          }}
        />
      </div>
    </div>
  );
};
