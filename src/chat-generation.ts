import type { MessageHandle } from "./chats.js";
import type { ChatPromptBuilder, LLM } from "./models.js";

export interface ChatGeneration {
	/** The LLM used for this chat generation */
	llm: LLM;

	/** The assistant message for this chat generation */
	assistantMessage: MessageHandle;

	/** The prompt used for this chat generation */
	prompt: ChatPromptBuilder;

	/** The chat ID of this generation */
	chatId: string;

	/** The current iteration number, starting from 0 */
	iteration: number;

	/** Whether this is the final iteration of the chat generation */
	isFinalIteration: boolean;
}
