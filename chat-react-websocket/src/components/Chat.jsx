import { useChatLogic } from "./ChatLogic";
import ChatUI from "./ChatUI";

export default function Chat() {
  const chatProps = useChatLogic();
  
  return <ChatUI {...chatProps} />;
}
