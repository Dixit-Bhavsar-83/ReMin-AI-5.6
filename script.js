/* JS */
/* Advanced AI Chat Application Script */
let prompt = document.querySelector("#prompt");
let submitbtn = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let image = document.querySelector("#image img");
let imageinput = document.querySelector("input[type='file']");

const Api_Url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=_API_KEY_ENTER";

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null,
  },
};

// Predefined questions and responses
const predefinedResponses = {
    "what is your name": "My name is ReMin Ai 5.6.",
    "who created you": "I was created by Dixit Bhavsar, an innovative coder and tech enthusiast!",
    "how are you": "I am just a program, but I'm here to help you!",
    "what is your purpose?": "My purpose is to assist you with your queries.",
    "who created you?": "I was created by Dixit Bhavsar, an innovative coder and tech enthusiast!",
    "who is Dixit?": "Dixit Bhavsar is a talented coder and tech enthusiast, skilled in creating innovative solutions using AI and web development.",
    "who is Dixit Bhavsar?": "Dixit Bhavsar is a talented coder and tech enthusiast, skilled in creating innovative solutions using AI and web development.",
    "who is dixit": "Dixit Bhavsar is a talented coder and tech enthusiast, skilled in creating innovative solutions using AI and web development.",
    "who is dixit bhavsar": "Dixit Bhavsar is a talented coder and tech enthusiast, skilled in creating innovative solutions using AI and web development.",
    "who is manish": "Manish Vyas is my Statistics and Accounts teacher, known for his clear explanations and deep understanding of the subjects.",
    "who is manish": "Manish Vyas is my Statistics and Accounts sir, known for his clear explanations and deep understanding of the subjects.",
    "who is manish vyas?": "Manish Vyas is my Statistics and Accounts sir, known for his clear explanations and deep understanding of the subjects.",
    "who is rachana?": "Rachana Vyas is a doctor and my tuition teacher for all subjects.",
    "who is rachana": "Rachana Vyas is a doctor and my tuition teacher for all subjects.",
    "who is rachana vyas": "Rachana Vyas is a doctor and my tuition teacher for all subjects.",
    "what are your skills?": "Dixit Bhavsar is proficient in coding languages like HTML, CSS, JavaScript, Python, and C++. He is passionate about web development and AI technology.",
    "what are you passionate about?": "Dixit Bhavsar is passionate about AI, web development, and solving real-world problems through technology.",
    "what projects are you working on?": "Dixit Bhavsar is currently working on creating an advanced tuition management app, an AI assistant, and a 2D game.",
    "can you tell me about your portfolio?": "Dixit Bhavsar is creating a portfolio website showcasing his work in AI, web development, and app creation.",
    "how did you start coding?": "Dixit Bhavsar started coding at a young age and quickly fell in love with building web applications and exploring AI.",
    "who taught you to code?": "Dixit Bhavsar learned coding through online resources, school projects, and guidance from teachers like Unnati and Kaushambi.",
    "what subjects do you study?": "Dixit Bhavsar studies Commerce, including subjects like Accounts, Statistics, and Business Studies.",
    "who is your favorite teacher?": "Dixit Bhavsar's favorite teacher is Rachana Vyas, who teaches all subjects with deep knowledge and dedication.",
    "what is your goal in coding?": "Dixit Bhavsar’s goal is to create intuitive and impactful solutions using AI and technology.",
    "what are your skills": "Dixit Bhavsar is proficient in coding languages like HTML, CSS, JavaScript, Python, and C++. He is passionate about web development and AI technology.",
    "what are you passionate about": "Dixit Bhavsar is passionate about AI, web development, and solving real-world problems through technology.",
    "what projects are you working on": "Dixit Bhavsar is currently working on creating an advanced tuition management app, an AI assistant, and a 2D game.",
    "can you tell me about your portfolio": "Dixit Bhavsar is creating a portfolio website showcasing his work in AI, web development, and app creation.",
    "how did you start coding": "Dixit Bhavsar started coding at a young age and quickly fell in love with building web applications and exploring AI.",
    "who taught you to code": "Dixit Bhavsar learned coding through online resources, school projects, and guidance from teachers like Unnati and Kaushambi.",
    "what subjects do you study": "Dixit Bhavsar studies Commerce, including subjects like Accounts, Statistics, and Business Studies.",
    "who is your favorite teacher": "Dixit Bhavsar's favorite teacher is Rachana Vyas, who teaches all subjects with deep knowledge and dedication.",
    "what is your goal in coding": "Dixit Bhavsar’s goal is to create intuitive and impactful solutions using AI and technology.",
    "who are you": "My name is ReMin Ai 5.6, and I'm here to Ai Chat Bot you with information and help you with your queries.",
    "who are you?": "My name is ReMin Ai, and I'm here to assist you with information and help you with your queries.",
};

// Advanced formatting for AI responses
function advancedFormatting(responseText) {
  responseText = responseText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  responseText = responseText.replace(/\*(.*?)\*/g, "<em>$1</em>");
  responseText = responseText.replace(/__(.*?)__/g, "<u>$1</u>");
  responseText = responseText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
  return responseText;
}

// Generate AI response
async function generateResponse(aiChatBox, userMessage) {
  let text = aiChatBox.querySelector(".ai-chat-area");

  // Check for predefined responses
  if (predefinedResponses[userMessage.toLowerCase()]) {
    text.innerHTML = predefinedResponses[userMessage.toLowerCase()];
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    return;
  }

  // If not predefined, fetch from Gemini API
  let RequestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: userMessage },
            ...(user.file.data ? [{ inline_data: user.file }] : []),
          ],
        },
      ],
    }),
  };

  try {
    let response = await fetch(Api_Url, RequestOption);
    let data = await response.json();
    let apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No response received.";

    apiResponse = advancedFormatting(apiResponse);
    text.innerHTML = apiResponse;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    text.innerHTML = "An error occurred while connecting to the AI. Please try again later.";
  } finally {
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    image.src = `img.svg`;
    image.classList.remove("choose");
    user.file = {};
  }
}

// Create chat box
function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

// Handle user chat and AI response
function handlechatResponse(userMessage) {
  if (!userMessage.trim() && !user.file.data) return;

  user.message = userMessage;

  let html = `
    <img src="user.png" alt="User" id="userimage" width="10%" />
    <div class="user-chat-area">
      ${user.message}
      ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
    </div>`;
  prompt.value = "";

  let userChatBox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatBox);
  chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

  setTimeout(() => {
    let aiHtml = `
      <img src="ai.png" alt="AI" id="aiimage" width="13%" />
      <div class="ai-chat-area">
        <img src="loading.gif" alt="Loading..." class="load" width="50px" />
      </div>`;
    let aiChatBox = createChatBox(aiHtml, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    generateResponse(aiChatBox, userMessage);
  }, 600);
}

// Handle text input
prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handlechatResponse(prompt.value);
  }
});

// Submit button
submitbtn.addEventListener("click", () => {
  handlechatResponse(prompt.value);
});

// Handle image upload
imageinput.addEventListener("change", () => {
  const file = imageinput.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("File size exceeds 2MB limit. Please upload a smaller file.");
    return;
  }

  let reader = new FileReader();
  reader.onload = (e) => {
    let base64string = e.target.result.split(",")[1];
    user.file = {
      mime_type: file.type,
      data: base64string,
    };

    image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
    image.classList.add("choose");

    let notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = "Image uploaded successfully!";
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  };
  reader.readAsDataURL(file);
});

// Open Privacy Policy
function openPrivacyPolicy() {
  window.open("index1.html", "_blank");
}

// Trigger image input
imagebtn.addEventListener("click", () => {
  imageinput.click();
});

// Disable Zooming and Prevent Page Refresh for Mobile Devices and Desktop
window.addEventListener("wheel", (e) => {
  if (e.ctrlKey) {
    e.preventDefault(); // Disable zooming
  }
}, { passive: false });

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && (e.key === "=" || e.key === "-" || e.key === "0")) {
    e.preventDefault(); // Disable zooming with keyboard shortcuts
  }
});

// Prevent Page Refresh
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = "";  // This prompts the user before the page refreshes
});

// Disable pinch zoom on mobile devices
document.addEventListener("touchstart", function (e) {
  if (e.touches.length > 1) {
    e.preventDefault(); // Prevent pinch zooming
  }
});

// Disable double-tap to zoom on mobile devices
let lastTouchEnd = 0;
document.addEventListener("touchend", function (e) {
  let now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();  // Disable double-tap zoom
  }
  lastTouchEnd = now;
}, false);
