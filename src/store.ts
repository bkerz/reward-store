import { create } from 'zustand'
import { devtools } from 'zustand/middleware';

interface Reward {
	id: string;
	title: string;
	description: string;
	cost: number;
}

interface RewardState {
	rewards: Reward[]
}

interface ConfigsState {
	username: string;
	token: string;
	project: string;
	setConfigs: (configs: Omit<ConfigsState, "setConfigs">) => void
}

export const useRewardStore = create<RewardState>()(
	(_: any) => ({
		rewards: [],
	})
)

export const useConfigsStore = create<ConfigsState>()(devtools((set) => ({
	username: "",
	token: "",
	project: "",
	setConfigs: (configs: Omit<ConfigsState, "setConfigs">) => {
		set(() => ({ username: configs.username, project: configs.project, token: configs.token }))
	},
})))
