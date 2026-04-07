import { Regex, type SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	targetPort: number
	feedbackPort: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'LiveTrax IP Address',
			width: 8,
			default: '127.0.0.1',
			regex: Regex.IP,
		},
		{
			type: 'number',
			id: 'targetPort',
			label: 'OSC Port (LiveTrax listens here)',
			width: 4,
			min: 1,
			max: 65535,
			default: 3819,
		},
		{
			type: 'number',
			id: 'feedbackPort',
			label: 'Feedback Port (this machine listens here)',
			width: 4,
			min: 1,
			max: 65535,
			default: 8000,
		},
	]
}
