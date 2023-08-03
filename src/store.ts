import { Session } from '@supabase/supabase-js';
import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware';

export interface Reward {
	id: string;
	title: string;
	description: string;
	cost: number;
	project: string;
}

interface RewardState {
	rewards: Reward[];
	createReward: (reward: Reward) => void;
}

interface ConfigsState {
	username: string;
	token: string;
	project: string;
	setConfigs: (configs: Omit<ConfigsState, "setConfigs">) => void
}

interface PointsState {
	points: number;
	setPoints: (points: number) => void;
}


export const useRewardStore = create<RewardState>()(
	subscribeWithSelector((set) => ({
		rewards: [],
		createReward: (reward: Reward) => set((state) => ({ rewards: [...state.rewards, reward] })),
	})
	))

export const useConfigsStore = create<ConfigsState>()(devtools((set) => ({
	username: "",
	token: "",
	project: "",
	setConfigs: (configs: Omit<ConfigsState, "setConfigs">) => {
		set(() => ({ username: configs.username, project: configs.project, token: configs.token }))
	},
})))

export const usePointsStore = create<PointsState>()(
	subscribeWithSelector((set) => ({
		points: 0,
		setPoints: (points: number) => set(() => ({ points: points })),
	})
	))


interface SessionState {
	session: Session | null;
	setSession: (session: Session | null) => void
}

export const useSessionStore = create<SessionState>()((set) => ({
	session: null,
	setSession: (session: Session | null) => set(() => ({ session: session }))
}))

export interface Project {
	id: string;
	name: string;
}
interface ProjectState {
	projects: Project[];
}

export const useProjectStore = create<ProjectState>()((set) => ({
	projects: []
}))
