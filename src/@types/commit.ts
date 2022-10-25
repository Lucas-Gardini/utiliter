import { prefixKeys } from "../utils/git";

export interface Commit {
	message: Array<CommitMessage>;
}

interface CommitMessage {
	text: string;
	prefix: prefixKeys;
	isBreaking: boolean;
}
