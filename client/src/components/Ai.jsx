import { useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import open from "../assets/open.wav";

const Ai = () => {
  const [showSearch, setShowSearch] = useState(false);
  let naigate = useNavigate();
  let openingSound  = new Audio(open);
  let [activeAi, setActiveAi] = useState(false);


  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  const speechRecognition =
    // @ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!speechRecognition) {
    console.warn("Speech Recognition API not supported in this browser");
    return null;
  }

  const recognition = new speechRecognition();

  // Greeting keywords for 4 languages
  const greetingKeywords = {
    english: ["hello", "hi", "hey", "greetings", "hey there"],
    hindi: ["नमस्ते", "हेलो", "हाय", "सलाम", "क्या हाल है"],
    punjabi: ["sat sri akal", "hello", "oye", "ਸਤਿ ਸਿਰਿ ਅਕਾਲ", "ਹੈਲੋ"],
    bhojpuri: ["नमस्कार", "राम राम", "हेलो", "कैसा बा", "क्या बा"],
  };

  // Time-based greetings for 4 languages
  const greetingsByTime = {
    morning: {
      english: "Good morning! Welcome to Maa Vindhyavasini Sweets!",
      hindi: "सुप्रभात! मां विंध्यवासिनी स्वीट्स में आपका स्वागत है!",
      punjabi: "ਸੁਪ੍ਰਭਾਤ! ਮਾ ਵਿੰਧ੍ਯਵਾਸਿਨੀ ਸਵੀਟਸ ਵਿਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ!",
      bhojpuri: "सुप्रभात! मां विंध्यवासिनी स्वीट्स में आपका स्वागत है!",
    },
    afternoon: {
      english: "Good afternoon! Enjoy our delicious sweets!",
      hindi: "नमस्ते! हमारी स्वादिष्ट मिठाइयों का आनंद लें!",
      punjabi: "ਨਮਸਤੇ! ਸਾਡੀਆਂ ਸਵਾਦਲੀ ਮਿਠਾਈਆਂ ਦਾ ਆਨੰਦ ਲਓ!",
      bhojpuri: "नमस्ते! हमारी स्वादिष्ट मिठाइयों का आनंद लें!",
    },
    evening: {
      english: "Good evening! Order fresh sweets now!",
      hindi: "शुभ संध्या! अभी ताज़ी मिठाई ऑर्डर करें!",
      punjabi: "ਸ਼ੁਭ ਸੰਧਿਆ! ਹੁਣ ਤਾਜ਼ੀ ਮਿਠਾਈ ਆਰਡਰ ਕਰੋ!",
      bhojpuri: "शुभ संध्या! अभी ताज़ी मिठाई ऑर्डर करें!",
    },
    night: {
      english: "Good night! Sweet dreams with our sweets!",
      hindi: "शुभ रात्रि! हमारी मिठाई के साथ मीठे सपने देखें!",
      punjabi: "ਸ਼ੁਭ ਰਾਤਰੀ! ਸਾਡੀਆਂ ਮਿਠਾਈਆਂ ਨਾਲ ਮਿੱਠੇ ਸਪਨੇ ਵੇਖੋ!",
      bhojpuri: "शुभ रात्रि! हमारी मिठाई के साथ मीठे सपने देखें!",
    },
  };

  // Function to get time of day
  const getTimeOfDay = (hour) => {
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  };

  // Function to detect greeting language
  const detectGreeting = (transcript) => {
    for (const [language, keywords] of Object.entries(greetingKeywords)) {
      if (keywords.some((k) => transcript.includes(k.toLowerCase()))) {
        return language;
      }
    }
    return null;
  };

  // Keyword sets for navigation
  const keywords = {
    sweetsOpen: [
      "sweets",
      "mithai",
      "dessert",
      "khoya",
      "burfi",
      "halwa",
      "laddu",
      "sweet",
      "मिठाई",
      "खीर",
      "बर्फी",
      "लड्डू",
      "हलवा",
      "gulab jamun",
      "rasgulla",
      "गुलाब जमून",
      "रस्गुला",
      "peda",
      "khoa peda",
      "पेड़ा",
      "laal mohan",
      "लाल मोहन",
    ],
    snacksOpen: [
      "snacks",
      "namkeen",
      "snack",
      "chips",
      "samosa",
      "pakora",
      "appetizer",
      "savoury",
      "नमकीन",
      "समोसा",
      "पकोड़ा",
      "चिप्स",
      "pakaudi",
      "पकौड़ी",
      "payaz ka pakaudi",
      "पायज का पकौड़ी",
      "chai",
      
    ],
    cartOpen: [
      "cart",
      "shopping",
      "kaat",
      "basket",
      "checkout",
      "bag",
      "order now",
      "add to cart",
      "कार्ट",
      "शॉपिंग",
      "चेकआउट",
      "ऑर्डर",
    ],
    orderOpen: [
      "order",
      "delivery",
      "arder",
      "track",
      "status",
      "my orders",
      "purchase",
      "buy",
      "ऑर्डर",
      "डिलीवरी",
      "ट्रैक",
      "स्टेटस",
    ],
    aboutOpen: [
      "about",
      "bare me",
      "about us",
      "info",
      "company",
      "who",
      "history",
      "team",
      "बारे में",
      "जानकारी",
      "कंपनी",
      "टीम",
    ],
    contactOpen: [
      "contact",
      "phone number",
      "contact us",
      "call",
      "support",
      "help",
      "email",
      "संपर्क",
      "फोन",
      "सपोर्ट",
      "मदद",
    ],
    homeOpen: [
      "home",
      "main",
      "homepage",
      "back",
      "start",
      "dashboard",
      "होम",
      "मुख्य",
      "शुरुआत",
      "वापस",
    ],
  };

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();

    // ===== GREETING DETECTION (check first) =====
    const greetingLanguage = detectGreeting(transcript);
    if (greetingLanguage) {
      const hour = new Date().getHours();
      const timeOfDay = getTimeOfDay(hour);
      const response = greetingsByTime[timeOfDay][greetingLanguage];
      speak(response);
      return; // Don't proceed to navigation
    }

    // ===== NAVIGATION COMMANDS =====
    // Search open/close
    if (
      transcript.includes("search") &&
      transcript.includes("open") &&
      !showSearch
    ) {
      speak("Opening search");
      setShowSearch(true);
      naigate("/search");
    } else if (
      transcript.includes("search") &&
      transcript.includes("close") &&
      showSearch
    ) {
      speak("Closing search");
      setShowSearch(false);
      naigate("/");
    }
    // Sweets
    else if (keywords.sweetsOpen.some((k) => transcript.includes(k))) {
      speak("Opening sweets page");
      naigate("/sweets");
    }
    // Snacks
    else if (keywords.snacksOpen.some((k) => transcript.includes(k))) {
      speak("Opening snacks page");
      naigate("/snacks");
    }
    // Cart
    else if (keywords.cartOpen.some((k) => transcript.includes(k))) {
      speak("Opening cart page");
      naigate("/cart");
    }
    // Order
    else if (keywords.orderOpen.some((k) => transcript.includes(k))) {
      speak("Opening order page");
      naigate("/order");
    }
    // About
    else if (keywords.aboutOpen.some((k) => transcript.includes(k))) {
      speak("Opening about page");
      naigate("/about");
    }
    // Contact
    else if (keywords.contactOpen.some((k) => transcript.includes(k))) {
      speak("Opening contact page");
      naigate("/contact");
    }
    // Home
    else if (keywords.homeOpen.some((k) => transcript.includes(k))) {
      speak("Opening home page");
      naigate("/");
    } else {
      toast.error("Sorry, I didn't understand");
      speak("Sorry, I didn't understand");
    }
  };

  recognition.onend = () => {
    setActiveAi(false);
  };

  const handleMicClick = () => {
    recognition.start();
    openingSound.play();
    setActiveAi(true);
  };

  return (
    <>
    <style>{`
      @keyframes aiGlow {
        0% {
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.4);
        }
        50% {
          box-shadow: 0 0 25px rgba(220, 38, 38, 0.7), 0 0 40px rgba(220, 38, 38, 0.5);
        }
        100% {
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.4);
        }
      }

      @keyframes aiPulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.15);
        }
        100% {
          transform: scale(1);
        }
      }

      .ai-mic-button {
        position: fixed;
        bottom: 8rem;
        right: 2rem;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 50;
      }

      .ai-mic-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(220, 38, 38, 0.3);
      }

      .ai-mic-button.active {
        animation: aiGlow 1.5s ease-in-out infinite, aiPulse 1s ease-in-out infinite;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      }

      .ai-mic-button svg {
        width: 24px;
        height: 24px;
        color: white;
        transition: all 0.3s ease;
      }

      .ai-mic-button.active svg {
        filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.6));
      }

      @media (max-width: 768px) {
        .ai-mic-button {
          bottom: 6rem;
          right: 1rem;
          width: 48px;
          height: 48px;
        }

        .ai-mic-button svg {
          width: 20px;
          height: 20px;
        }
      }

      @media (max-width: 480px) {
        .ai-mic-button {
          bottom: 8rem;
          right: 0.75rem;
          width: 44px;
          height: 44px;
        }

        .ai-mic-button svg {
          width: 18px;
          height: 18px;
        }
      }
    `}</style>
    <div
      className={`ai-mic-button ${activeAi ? "active" : ""}`}
      onClick={handleMicClick}
      title="Click to speak"
    >
      <FaMicrophoneAlt />
    </div>
    </>
  );
};

export default Ai;
