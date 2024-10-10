import Image from "next/image";

interface CardProps {
  userImage?: string;
  userName?: string;
  userRole?: string;
  cardImage?: string;
  cardTitle?: string;
  cardDescription?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onUpdate?: () => void;
}

const InfoCard: React.FC<CardProps> = ({
  userImage,
  userName,
  userRole,
  cardImage,
  cardTitle,
  cardDescription,
  onEdit,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {(userImage || userName || userRole) && (
        <div className="flex items-center gap-3 px-6 py-5 pb-0">
          {userImage && (
            <div className="h-10 w-10 rounded-full">
              <Image
                alt={userName || "User"}
                loading="lazy"
                width={40}
                height={40}
                decoding="async"
                src={userImage}
                style={{ color: "transparent" }}
                className="rounded-full h-full w-full object-cover"
              />
            </div>
          )}
          <div>
            {userName && (
              <h4 className="font-medium text-black dark:text-white">
                {userName}
              </h4>
            )}
            {userRole && <p className="text-sm">{userRole}</p>}
          </div>
        </div>
      )}

      {cardImage && (
        <Image
          alt="Card"
          loading="lazy"
          width={432}
          height={238}
          decoding="async"
          src={cardImage}
          className="px-4 pt-5"
          style={{ color: "transparent" }}
        />
      )}

      {(cardTitle || cardDescription) && (
        <div className="p-6">
          {cardTitle && (
            <h4 className="mb-3 text-xl font-semibold text-black hover:text-primary dark:text-white dark:hover:text-primary">
              {cardTitle}
            </h4>
          )}
          {cardDescription && <p>{cardDescription}</p>}
        </div>
      )}

      {(onEdit || onDelete || onUpdate) && (
        <div className="flex justify-end gap-4 p-4 border-t border-stroke dark:border-strokedark">
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Edit
            </button>
          )}
          {onUpdate && (
            <button
              onClick={onUpdate}
              className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              Update
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoCard;
