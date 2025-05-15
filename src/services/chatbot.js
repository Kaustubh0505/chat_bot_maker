export const getChatbots = async ({ token }) => {
  const response = await fetch("/api/chatbot/getByCreator", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const { err } = await response.json();
    console.log(err);
    throw new Error(err || "Error Crating Chatbot");
  }
  return response.json();
};
export const createChatbot = async ({ name, context, token }) => {
  const response = await fetch("/api/chatbot/create", {
    method: "POST",
    body: JSON.stringify({ name, context, token }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const { err } = await response.json();
    console.log(err);
    throw new Error(err || "Error Crating Chatbot");
  }
  return response;
};

export const getAll = async () => {
  const response = await fetch("api/chatbot/getAll");
  if (!response.ok) {
    const { error } = await response.json();
    console.log(error);
    throw new Error(error || "Failed to Load Chat Boat");
  }
  return response;
};

export const getChatbotByName = async ({ name, token }) => {
  const response = await fetch(`/api/chatbot/getByChatbotName?name=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    const { err } = await response.json();
    console.log(err);
    throw new Error(err || "Error getting chatbot");
  }
  return response.json();
}