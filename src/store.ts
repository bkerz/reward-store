import { create } from 'zustand'

interface Reward {
	id: string;
	title: string;
	description: string;
	cost: number;
}

interface RewardState {
	rewards: Reward[]
}

export const useRewardStore = create<RewardState>()((_) => ({
	rewards: [],
}))
