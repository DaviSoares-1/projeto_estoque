import React from "react";

function FeedbackAlert({ message, type }) {
  if (!message) return null;

  let bgColor = "";
  let textColor = "";
  let emoji = "";

  switch (type) {
    case "success":
      bgColor = "bg-green-200";
      textColor = "text-green-800";
      emoji = "✔️";
      break;
    case "update":
      bgColor = "bg-blue-500";
      textColor = "text-white";
      emoji = "✏️";
      break;
    case "delete":
      bgColor = "bg-red-500";
      textColor = "text-white";
      emoji = "🗑️";
      break;
    case "trashClear":
      bgColor = "bg-red-700";
      textColor = "text-white";
      emoji = "❌";
      break;
    case "restore":
      bgColor = "bg-yellow-300";
      textColor = "text-black";
      emoji = "♻️";
      break;
    case "notFound":
      bgColor = "bg-purple-600";
      textColor = "text-white";
      emoji = "🔍";
      break;
    default:
      bgColor = "bg-gray-300";
      textColor = "text-black";
      emoji = "ℹ️";
  }

  return (
    <div className={`${bgColor} ${textColor} p-3 mb-4 rounded shadow font-semibold flex items-center space-x-2`}>
      <span>{emoji}</span>
      <span>{message}</span>
    </div>
  );
}

export default FeedbackAlert;
